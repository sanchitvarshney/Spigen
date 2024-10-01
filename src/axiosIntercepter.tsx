import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const socketLink: string = import.meta.env.VITE_REACT_APP_SOCKET_BASE_URL;
const imsLink: string = import.meta.env.VITE_REACT_APP_API_BASE_URL;

interface LoggedInUser {
  token: string;
}

interface ErrorResponse {
  success?: boolean;
  message?: string;
  data?: {
    logout?: boolean;
  };
}

interface OtherData {
  company_branch?: string;
  session?: string;
}

const loggedInUser: LoggedInUser | null = JSON.parse(localStorage.getItem("loggedInUser") as string);
const otherData: OtherData | null = JSON.parse(localStorage.getItem("otherData") as string);

const spigenAxios = axios.create({
  baseURL: imsLink,
  headers: {
    "x-csrf-token": loggedInUser?.token,
  },
});

spigenAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.success !== undefined) {
      return response;
    }
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (error.response && typeof error.response.data === "object") {
      const errorData = error.response.data;

      if (errorData?.data?.logout) {
        toast.error(errorData.message || "Logout error.");
        localStorage.clear();
        window.location.reload();
        return Promise.reject(error);
      }

      if (errorData.success !== undefined) {
      
        toast.error(errorData.message || "Error occurred.");
        return Promise.reject(errorData);
      }

      if (errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Error while connecting to backend.");
      }

      return Promise.reject(errorData);
    }

    toast.error("An unexpected error occurred.");
    return Promise.reject(error);
  }
);


const branch: string = otherData?.company_branch ?? "BRMSC012";
const session: string = otherData?.session ?? "24-25";

spigenAxios.defaults.headers["Company-Branch"] = branch;
spigenAxios.defaults.headers["Session"] = session;

export { spigenAxios, socketLink };
