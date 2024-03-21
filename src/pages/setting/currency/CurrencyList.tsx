import React, { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../../icons";
import Datatable from "../../../components/table/datatable";
import { useDispatch } from "react-redux";
import { currency } from "../../../store/actions";
import ModalComponent from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";

const CurrencyList = () => {
  const [data, setData] = React.useState<any>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>();
  const [isDelete, setIsDelete] = React.useState<boolean>();
  const [deleteId, setDeleteId] = React.useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();
  const apiRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCurrency = async () => {
    try {
      const res = await dispatch(currency.getAllCurrency() as any);
      setData(res?.data);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const skip = searchParams.get("skip") || "0";
  const take = searchParams.get("take") || "10";


  React.useEffect(() => {
      fetchCurrency();
  }, [dispatch]);

  const goBack = () => {
    navigate(-1);
  };

  const deleteHandler = async (id) => {
    const res = await dispatch(currency.deleteCurrency(id) as any);
    if (res?.statusCode === 200) {
      setIsDelete(false);
      setIsSuccess(true);
      fetchCurrency();
    }
  };


  const handleEdit = (id) => {
    navigate("/setting/currency/" + id + "/edit");
  };

  const amountColumns: GridColDef[] = [
    { field: "no", headerName: "No.", width: 148 },
    { field: "name", headerName: "Currency", width: 660 },
  ];

  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"" + params.row.id}
              className="buttonPrimary space-x-2 h-10"
            >
              <Icon name="details" />
              <span>Detail</span>
            </Link>
            <div
              className="editButton"
              onClick={() => handleEdit(params.row.id)}
            >
              <Icon name="edit" color="#444240" fillColor="#444240" />
            </div>
            <div
              className="editButton"
              onClick={() => {
                setIsDelete(true);
                setDeleteId(params.row.id);
              }}
            >
              <Icon name="delete" color="#444240" fillColor="#444240" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="title">Currency</p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Settings
            </p>
            <p className="py-2 px-2">Currency</p>
          </div>
        </div>
        <div className="w-full flex justify-end items-center">
          <Link to="create" className="self-end">
            <div className="buttonPrimary space-x-2 h-12">
              <Icon name="add" width={24} height={24} />
              <span className="text-sm md:text-base xl:text-xl">
                Create Currency
              </span>
            </div>
          </Link>
        </div>
        {data && (
          <Datatable
            rows={data}
            columns={amountColumns.concat(actionColumn)}
            apiRef={apiRef}
          />
        )}
      </div>
      {isDelete && (
        <ModalComponent
          title="Confirm"
          body={"Are you sure to delete this define currency? Please confirm it."}
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={() => deleteHandler(deleteId)}
        />
      )}
      {isSuccess && (
        <AlertModal
          title="Success"
          body={
            "The currency is successfully deleted. Please check into list."
          }
          open={isSuccess}
          onClose={() => setIsSuccess(false)}
        />
      )}
    </>
  );
};

export default CurrencyList;
