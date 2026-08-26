import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../../api/appwrite";
import { logout } from "../../store/slices/authSlice";
import Button from "../common/Button";

const Logout = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then((result) => {
      if (result === true) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  return (
    <Button variant="outline" onClick={logoutHandler} className={className} title="Logout">
      <i className="ri-logout-box-r-line"></i>
      Logout
    </Button>
  );
};

export default Logout;
