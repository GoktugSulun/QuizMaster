import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { RegisterType, type LoginType } from "../Types/AuthTypes";
import { type UserType } from "@/Core/Store/AppConfigTypes";
import { AppConfigActions } from "@/Core/Store/AppConfig.slice";
import { snackbar } from "@/Core/Utils";

const AuthThunks = {
   login: (payload: LoginType) => request({
      method: 'POST',
      url: `${ApiURL.AUTH_LOGIN}`,
      key: 'login',
      payload,
      success: ({ data, thunkAPI }) => {
         const { user, token } = data as { user: UserType; token: string; };
         thunkAPI.dispatch(AppConfigActions.setAuthorizedUser(user));
         localStorage.setItem("token", token);
         snackbar("You have been logged in successfully");
      }
   }),
   register: (payload: RegisterType) => request({
      method: 'POST',
      url: `${ApiURL.AUTH_REGISTER}`,
      key: 'register',
      payload,
      success: () => {
         snackbar("You have been registered successfully");
      }
   })
};

export default AuthThunks;
