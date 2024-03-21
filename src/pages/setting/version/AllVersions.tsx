import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import InputSelect from "../../../components/form/InputSelect";
import Icon from "../../../icons";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { versionApp } from "../../../utils/enum";
import { version } from "../../../store/actions";
import { useDispatch } from "react-redux";

const RiderReportDetail = () => {
  const [data, setData] = React.useState<any[]>();
  const [isCopied, setIsCopied] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      app_name: "user",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app_name = watch("app_name");
  const skip = searchParams.get("skip") || 0;
  const take = searchParams.get("take") || 10;

  React.useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await dispatch(version.getAppVersionHistory({skip,take,filter:app_name}) as any);
        setData(res?.data?.data);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
    fetchVersions();
    setSearchParams({"filter[app_name]":app_name})
  }, [dispatch,app_name]);

  const handleCopyClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };
  const goBack = () => {
    navigate("/setting/app-version");
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div
            onClick={goBack}
            className="rounded-[10px] border border-primary py-2 px-4 flex items-center space-x-3 cursor-pointer"
          >
            <Icon name="leftArrow" />
            <p className="">Back</p>
          </div>
          <div className="text-center">
            <p className="title">
              Application Version History
            </p>
          </div>
          <div className="side-title  h-10">
            <p className="py-2 px-2 border-r border-r-gray text-gray">
              Application Version
            </p>
            <p className="py-2 px-2">Version History</p>
          </div>
        </div>

        <div className="flex flex-col space-y-1 w-[344px]">
          <p className="text-base">Filter By Application</p>
          <div className="w-[344px]">
            <InputSelect
              fullWidth
              name="app_name"
              control={control}
              label={""}
              defaultValue="user"
              options={versionApp}
            />
          </div>
        </div>
        <Table
          sx={{
            ".MuiTableCell-head ": {
              backgroundColor: "#ECEDEF",
              fontSize: "20px",
            },
            "& .MuiTableCell-root": {
              borderLeft: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiTableCell-body": {
              fontSize: "16px",
            },

            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Application</TableCell>
              <TableCell align="center">Version</TableCell>
              <TableCell align="center">Version Link</TableCell>
              <TableCell align="center">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((version, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{version.created_at}</TableCell>
                  <TableCell align="center">{version.app_name}</TableCell>
                  <TableCell align="center">{version.version}</TableCell>
                  <TableCell align="center">
                    <div
                      className="flex items-center justify-center space-x-2"
                      onClick={() => handleCopyClick(version.link)}
                    >
                      <Icon name="copylink" />
                      <p className="text-primary">Copy Link</p>
                    </div>
                  </TableCell>
                  <TableCell align="center">{version?.created_user?.username}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {isCopied && (
        <Alert
          onClose={() => {
            setIsCopied(false);
          }}
        >
          Successfully copied to clipboard — check it out!
        </Alert>
      )}
    </>
  );
};

export default RiderReportDetail;
