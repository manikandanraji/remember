import React from "react";
import { useDispatch } from "react-redux";
import db, { firebase } from "../firebase";
import useInput from "../hooks/useInput";
import { loginUser } from "../reducers/user";
import "./signup.css";

const Login = ({ signup }) => {
  const dispatch = useDispatch();
  const email = useInput("");
  const password = useInput("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.value.trim() && password.value.trim()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(async (data) => {
          const userRef = await db.collection("users").doc(data.user.uid).get();

          const user = userRef.data();
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(loginUser(user));
        });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="johnwick@gmail.com"
            value={email.value}
            onChange={email.onChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            value={password.value}
            onChange={password.onChange}
          />

          <div className="login-signup">
            <p onClick={signup}>Sign up instead</p>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
