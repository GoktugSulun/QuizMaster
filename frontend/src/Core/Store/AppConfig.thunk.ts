import { ApiURL } from "@/Constants/ApiURL";
import { request } from "../Request";
import { type UserType } from "./AppConfigTypes";
import { AppConfigActions } from "./AppConfig.slice";


const AppConfigThunks = {
   getUser: () => request({
      method: 'GET',
      url: `${ApiURL.AUTH}`,
      key: 'getUser',
      success: ({ data, thunkAPI }) => {
         const user = data as UserType;
         thunkAPI.dispatch(AppConfigActions.setAuthorizedUser(user));
      }
   })
};

export default AppConfigThunks;
