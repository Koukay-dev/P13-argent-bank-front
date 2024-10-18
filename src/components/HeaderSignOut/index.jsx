import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRightToBracket } from "@fortawesome/free-solid-svg-icons";


const userName = "Tony";

export default function HeaderSignOut() {
  return (
    <div>
          <Link className="main-nav-item" to="/user">
            <FontAwesomeIcon icon={faUserCircle} />
            {userName}
          </Link>
          <Link className="main-nav-item" to="/">
            <FontAwesomeIcon icon={faRightToBracket} />
            Sign Out
          </Link>
    </div>
  )
}
