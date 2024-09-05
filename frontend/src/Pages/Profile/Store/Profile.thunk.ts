import { ApiURL } from "@/Constants/ApiURL";
import { request } from "@/Core/Request";
import { UserPayloadType } from "../Types/ProfileTypes";
import { UserType } from "@/Core/Store/AppConfigTypes";
import { AppConfigActions } from "@/Core/Store/AppConfig.slice";

const ProfileThunks = {
   saveUserInfo: ({ payload, id, files }: { payload: UserPayloadType, id: string, files: File | null }) => request({
      method: 'PUT',
      url: `${ApiURL.AUTH}/${id}`,
      payload,
      files,
      key: 'saveUserInfo',
      success: ({ data, thunkAPI }) => {
         const payload = data as UserType;
         thunkAPI.dispatch(AppConfigActions.setAuthorizedUser(payload));
      }
   })
};

export default ProfileThunks;
