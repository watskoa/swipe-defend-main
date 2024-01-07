import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";

const useForgetPass = () => {
    const forgetPassword = useContext(AuthContext);
    return forgetPassword;
};

export default useForgetPass;