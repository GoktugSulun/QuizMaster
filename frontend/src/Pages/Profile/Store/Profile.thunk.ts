import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { UserPayloadType } from "../Types/ProfileTypes";
import { UserType } from "@/Core/Store/AppConfigTypes";
import { AppConfigActions } from "@/Core/Store/AppConfig.slice";

const ProfileThunks = {
   saveUserInfo: ({ payload, id }: { payload: UserPayloadType, id: string }) => request({
      method: 'PUT',
      url: `${ApiURL.USER}/${id}`,
      payload,
      key: 'saveUserInfo',
      success: ({ data, thunkAPI }) => {
         const payload = data as UserType;
         thunkAPI.dispatch(AppConfigActions.setAuthorizedUser(payload));
      }
   })
};

export default ProfileThunks;
