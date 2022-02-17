import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Cookies from "js-cookie";
import "./Header.css";
function Header({ dark, setDark, user }) {
  const addDarkMode = () => {
    document.body.classList.toggle("dark");
    setDark(!dark);
  };

  const responseGoogle = (response) => {
    // console.log(response);
    const { accessToken } = response;

    Cookies.set("token", accessToken);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <header>
      <div className="header-wrapper">
        <div className="header-left">
          <div className="header-left-left">
            <button className="menu-btn">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.6364 3H1.36364C0.61 3 0 2.328 0 1.5C0 0.672 0.61 0 1.36364 0H18.6364C19.3891 0 20 0.672 20 1.5C20 2.328 19.3891 3 18.6364 3ZM1.36364 7H18.6364C19.3891 7 20 7.672 20 8.5C20 9.328 19.3891 10 18.6364 10H1.36364C0.61 10 0 9.328 0 8.5C0 7.672 0.61 7 1.36364 7ZM18.6364 14H1.36364C0.61 14 0 14.672 0 15.5C0 16.328 0.61 17 1.36364 17H18.6364C19.3891 17 20 16.328 20 15.5C20 14.672 19.3891 14 18.6364 14Z"
                  fill="#1F2022"
                />
              </svg>
            </button>
            <Link to="/" className="logo">
              <span></span>
            </Link>
          </div>
          {/* <div className="header-search">
            <input type="text" name="key" id="Search" placeholder="Search" />
            <span>
              <img src="/lens.svg" alt="" />
            </span>
          </div> */}
        </div>
        <div className="header-right">
          <div className="header-right-left">
            <button>
              <img src="/camera.svg" alt="control1" />
            </button>
            <button onClick={addDarkMode}>
              <img src="/moon.svg" alt="control2" />
            </button>
            <button>
              <img src="/alert.png" alt="control3" />
              <span className="alert-count">3</span>
            </button>
          </div>
          <>
            {user ? (
              <div className="header-right-right">
                <img
                  src={user && user.picture}
                  alt=""
                  className="user-avatar"
                />
              </div>
            ) : (
              <GoogleLogin
                clientId="599863671061-u89v3bid4polorl12it3mot2l3fc4g4p.apps.googleusercontent.com"
                clientSecret="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"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="login-btn"
                  >
                    Login
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                scope="https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.force-ssl"
              />
            )}
          </>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});
export default connect(mapStateToProps, null)(Header);
