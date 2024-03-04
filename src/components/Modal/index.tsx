import React from "react";
import { Dialog } from "@mui/material";
import Icon from "../../icons";

const ModalComponent = ({ open, onClose, onConfirm, title, body }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: 0,
        "& .MuiPaper-root ": {
          borderRadius: "10px",
          boxShadow: "none",
        },
        borderRadius: "10px",
      }}
    >
      <div className="bg-white p-6 rounded-[10px] flex flex-col items-center space-y-4 min-w-[334px] h-fit">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-primary">{title}</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center w-[316px]">
            <p className="">
              {body}
            </p>
          </div>
        <div className="flex space-x-4">
          <div
            className="buttonOutlined w-[118px] h-10 space-x-1 "
            onClick={onClose}
          >
            <Icon name="cancel" />
            <p className="font-semibold ">Cancel</p>
          </div>
          <div
            className="buttonPrimary w-[118px] h-10 space-x-1 "
            onClick={onConfirm}
          >
            <Icon name="success" width={24} height={24} />
            <p className="font-semibold text-white">Confirm</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalComponent;
