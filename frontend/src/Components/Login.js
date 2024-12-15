import React, { useState } from "react";
import logo from "../Images/live-chat_512px.png";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

function Login() {
  const [showlogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [logInStatus, setLogInStatus] = React.useState("");
  const [signInStatus, setSignInStatus] = React.useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/login/",
        data,
        config
      );
      console.log("Login : ", response);
      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  const signUpHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/register/",
        data,
        config
      );
      console.log(response);
      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.status === 405) {
        setLogInStatus({
          msg: "User with this email ID already Exists",
          key: Math.random(),
        });
      }
      if (error.response.status === 406) {
        setLogInStatus({
          msg: "User Name already Taken, Please take another one",
          key: Math.random(),
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-container">
        <div className="image-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
        {showlogin && (
          <div className="login-box">
            <p className="login-text">Login to your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={loginHandler}
              isLoading
            >
              Login
            </Button>
            <p>
              Don't have an Account ?{" "}
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        )}
        {!showlogin && (
          <div className="login-box">
            <p className="login-text">Create your Account</p>
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter User Name"
              variant="outlined"
              color="secondary"
              name="name"
              helperText=""
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="standard-basic"
              label="Enter Email Address"
              variant="outlined"
              color="secondary"
              name="email"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="secondary"
              name="password"
              onKeyDown={(event) => {
                if (event.code == "Enter") {
                  // console.log(event);
                  signUpHandler();
                }
              }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={signUpHandler}
            >
              Sign Up
            </Button>
            <p>
              Already have an Account ?
              <span
                className="hyper"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Log in
              </span>
            </p>
            {signInStatus ? (
              <Toaster key={signInStatus.key} message={signInStatus.msg} />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Login;




// import React, { useState } from "react";
// import logo from "../Images/live-chat_512px.png";
// import {
//   Backdrop,
//   Button,
//   CircularProgress,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Toaster from "./Toaster";

// function Login() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [data, setData] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");

//   const navigate = useNavigate();

//   const changeHandler = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const loginHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const config = {
//         headers: { "Content-type": "application/json" },
//       };
//       const response = await axios.post(
//         "http://localhost:8080/user/login/",
//         data,
//         config
//       );
//       console.log("Login: ", response);
//       setStatus({ msg: "Login Successful!", key: Math.random() });
//       localStorage.setItem("userData", JSON.stringify(response.data));
//       navigate("/app/welcome");
//     } catch (error) {
//       console.error(error);
//       setStatus({ msg: "Invalid Username or Password", key: Math.random() });
//     }
//     setLoading(false);
//   };

//   const signUpHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const config = {
//         headers: { "Content-type": "application/json" },
//       };
//       const response = await axios.post(
//         "http://localhost:8080/user/register/",
//         data,
//         config
//       );
//       console.log("Sign Up: ", response);
//       setStatus({ msg: "Sign-Up Successful! Please Login.", key: Math.random() });
//       setShowLogin(true);
//     } catch (error) {
//       console.error(error);
//       if (error.response.status === 405) {
//         setStatus({
//           msg: "User with this email ID already exists.",
//           key: Math.random(),
//         });
//       } else if (error.response.status === 406) {
//         setStatus({
//           msg: "Username already taken. Please choose another.",
//           key: Math.random(),
//         });
//       } else {
//         setStatus({ msg: "Sign-Up Failed. Try again.", key: Math.random() });
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={loading}
//       >
//         <CircularProgress color="secondary" />
//       </Backdrop>
//       <div className="container" id="container">
//         <div className="image-container">
//           <img src={logo} alt="Logo" className="welcome-logo" />
//         </div>
//         {showLogin ? (
//           <div className="form-container sign-in">
//             <form onSubmit={loginHandler}>
//               <h1>Sign In</h1>
//               <TextField
//                 onChange={changeHandler}
//                 label="Email"
//                 variant="outlined"
//                 color="secondary"
//                 name="email"
//                 required
//               />
//               <TextField
//                 onChange={changeHandler}
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 color="secondary"
//                 name="password"
//                 required
//               />
//               <Button variant="outlined" color="secondary" type="submit">
//                 Login
//               </Button>
//               <p>
//                 Don't have an account? {" "}
//                 <span
//                   className="hyper"
//                   onClick={() => setShowLogin(false)}
//                 >
//                   Sign Up
//                 </span>
//               </p>
//               {status && <Toaster key={status.key} message={status.msg} />}
//             </form>
//           </div>
//         ) : (
//           <div className="form-container sign-up">
//             <form onSubmit={signUpHandler}>
//               <h1>Create Account</h1>
//               <TextField
//                 onChange={changeHandler}
//                 label="Username"
//                 variant="outlined"
//                 color="secondary"
//                 name="name"
//                 required
//               />
//               <TextField
//                 onChange={changeHandler}
//                 label="Email"
//                 variant="outlined"
//                 color="secondary"
//                 name="email"
//                 required
//               />
//               <TextField
//                 onChange={changeHandler}
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 color="secondary"
//                 name="password"
//                 required
//               />
//               <Button variant="outlined" color="secondary" type="submit">
//                 Sign Up
//               </Button>
//               <p>
//                 Already have an account? {" "}
//                 <span
//                   className="hyper"
//                   onClick={() => setShowLogin(true)}
//                 >
//                   Log in
//                 </span>
//               </p>
//               {status && <Toaster key={status.key} message={status.msg} />}
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Login;
