import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { loginThunk } from "../../store/Slices/AuthSlice";
import { getToken } from "../../store/Selectors";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const store = useStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    dispatch(loginThunk({ email: username, password: password }));
    if (getToken(store.getState())) {
      navigate("/user");
    } else {
      alert('Utilisateur ou mot de passe erroné') // à revoir 
    }
  };

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
      <h1>Sign In</h1>
      <form onSubmit={loginSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
        {/* <Link to="/user" className="sign-in-button">
          Sign In
        </Link> */}
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
}
