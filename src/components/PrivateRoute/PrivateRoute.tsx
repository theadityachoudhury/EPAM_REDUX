import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUser } from "../../store/user/thunk";
import { AppDispatch, RootState } from "../../store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/courses");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    } else {
      dispatch(fetchUser(token));
    }
  }, [dispatch, navigate,user]);

  return <>{children}</>;
};

export default PrivateRoute;
