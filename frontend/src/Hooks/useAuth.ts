import { useAppSelector } from "@/Core/Hooks";

const useAuth = () => {
   const token = localStorage.getItem("token");
   const authorizedUser = useAppSelector((state) => state.AppConfig.authorizedUser);
   return { isAuthorized: !!authorizedUser.id && !!token, authorizedUser };
};

export default useAuth;