import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle} from "@fortawesome/free-solid-svg-icons";

export default function SignInHeader() {
  return (
    <div>
          <Link className="main-nav-item" to="/sign-in">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
  )
}
