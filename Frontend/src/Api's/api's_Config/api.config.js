import { authapi } from "../auth-config"

const AuthAPi = {
    Login: "/login",
    Signup : "/signup",
    Otp_Verification : "/otp-verification",
    Logout : "/logout"
}

export const AuthLogin = async ({ email, Password }) => { 
    const response = await authapi.post(AuthAPi.Login, { email, Password });
    console.log("the auth login is successfull ",response)
    return response.data;
}

export const AuthSingup = async (data) => { 
    const response = await authapi.post(AuthAPi.Signup, data);
    alert("data is coming ")
    console.log("the auth sinup data would be ",response)
    return response.data;
}
export const Otp_Verification = async ({email}) => { 
    const response = await authapi.post(AuthAPi.Otp_Verification,{email});
    console.log("the auth login is successfull ",response)
    return response.data;
}
export const Logout = async () => { 
    const response = await authapi.post(AuthAPi.Logout);
    console.log("the auth login is successfull ",response)
    return response.data;
}