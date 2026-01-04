import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "src/baseApi/serverbase";
import { DrawerClose } from "src/components/ui/drawer";
import { changeLoading } from "src/stateSlices/loadingSlice";

const Links = ({ href, passingState, icon, description }) => {
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(changeLoading(true))
    auth.signOut()
  }
  return (
    <h1 className="flex text-2xl	px-5">
      <Link
        to={href}
        state={passingState}
        onClick={href === '/' ? logOut : undefined}
      >
        <DrawerClose className="flex px-3">
          {icon}
          <div className="px-3">{description}</div>
        </DrawerClose>
      </Link>
    </h1>
  )
}

export default Links;
