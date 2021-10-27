import InfoIcon from "@material-ui/icons/Info";
import WarningOutlinedIcon from "@material-ui/icons/WarningOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import toast from "react-hot-toast";

export const isPresent = (list, id) => {
  if (list) {
    return list.find(item => {
      return item?._id === id;
    });
  }
  return false;
};

export const getToast = (type, msg) => {
  return toast(msg, {
    icon:
      type === "ERROR" ? (
        <InfoIcon />
      ) : type === "SUCCESS" ? (
        <CheckCircleIcon />
      ) : type === "INFO" ? (
        <WarningOutlinedIcon />
      ) : (
        <WarningOutlinedIcon />
      ),
    style: {
      borderRadius: "10px",
      background:
        type === "ERROR"
          ? "#D32F2F"
          : type === "SUCCESS"
          ? "#388e3c"
          : type === "INFO"
          ? "#0288d1"
          : "#0288d1", // "#FDEDED"  //,
      color: "#fff",
    },
  });
};
