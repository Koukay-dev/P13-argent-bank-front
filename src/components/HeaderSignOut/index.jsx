import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../store/Slices/AuthSlice";

export default function HeaderSignOut({ username }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutThunk(navigate));
  };
  return (
    <div>
      <Link className="main-nav-item" to="/user">
        <FontAwesomeIcon icon={faUserCircle} />
        {username}
      </Link>
      <div onClick={logout} className="main-nav-item sign-out-button" to="/">
        <FontAwesomeIcon icon={faRightToBracket} />
        Sign Out
      </div >
    </div>
  );
}
