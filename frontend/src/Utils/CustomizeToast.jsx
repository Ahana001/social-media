import "./style.css";

import { toast } from "react-toastify";

export function CustomizeToast(type, message) {
  const style = {
    position: "top-right",
    autoClose: 1000,
    bodyClassName: "custom-toast-body",
  };
  /* eslint-disable default-case */
  switch (type) {
    case "error": {
      return toast.error(message, style);
    }
    case "warning": {
      return toast.warn(message, style);
    }
    case "success": {
      return toast.success(message, style);
    }
    case "info": {
      return toast.info(message, style);
    }
  }
}
