import { AppDispatch } from "@/main";
import { useDispatch } from "react-redux";

const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;