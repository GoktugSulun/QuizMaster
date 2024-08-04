import { BaseModal } from "@/Core/Components"
import { useAppDispatch, useAppSelector } from "@/Core/Hooks"
import { CreatorActions } from "../../Store/Creator.slice";
import { useNavigate } from "react-router-dom";
import { RouteEnums } from "@/Constants/Enums";
import Body from "./Components/Body";

const ErrorModal = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const open = useAppSelector((state) => state.Creator.isOpenWarningModal);

   const handleClose = () => {
      dispatch(CreatorActions.setIsOpenWarningModal("CLOSE"))
   }

   const goToHomePage = () => {
      navigate(RouteEnums.FEED)
   }

   return (
      <BaseModal
         title="Warning"
         open={open}
         handleClose={handleClose}
         secondButtonName="Continue"
         secondButtonOnClick={handleClose}
         firstButtonName="Go to Home Page"
         firstButtonOnClick={goToHomePage}
      >
         <Body />
      </BaseModal>
   )
}

export default ErrorModal