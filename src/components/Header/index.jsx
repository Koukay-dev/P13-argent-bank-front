import argentBankLogo from "../../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import HeaderSignIn from "../HeaderSignIn";
import HeaderSignOut from "../HeaderSignOut";

const userLogged = false;

export default function Header() {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {userLogged ? <HeaderSignOut /> : <HeaderSignIn />}
    </nav>
  );
}
