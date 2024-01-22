import instance from "./setting";


const registerServices = (data) => {
    return instance.post("users/register", data,{
        header:{
            "Content-Type": "multipart/form-data"
        }
    });
};

const loginServices = (data) => {
    return instance.post("users/login", data);
};
const getMe = () =>{
    return instance.get("users/me");
};

export const authServices = {
    registerServices,
    loginServices,
    getMe
};