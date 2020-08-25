import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { loginUser } from "../reducers/user";
import db, { firebase } from "../firebase";
import "./signup.css";

const Signup = ({ login }) => {
  const dispatch = useDispatch();

  // form values
  const email = useInput("");
  const username = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password1.value.trim() === password2.value.trim()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password1.value)
        .then(async (data) => {
          const user = {
            id: data.user.uid,
            email: data.user.email,
            name: username.value,
          };

          await db.collection("users").doc(data.user.uid).set(user);

          localStorage.setItem("user", JSON.stringify(user));

          dispatch(loginUser(user));
        });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <h2>Create your account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="username"
            placeholder="johnwick"
            value={username.value}
            onChange={username.onChange}
          />

          <input
            type="email"
            name="email"
            placeholder="johnwick@gmail.com"
            value={email.value}
            onChange={email.onChange}
          />

          <input
            type="password"
            name="password1"
            placeholder="password"
            value={password1.value}
            onChange={password1.onChange}
          />

          <input
            type="password"
            name="password2"
            placeholder="password again"
            value={password2.value}
            onChange={password2.onChange}
          />

          <div className="login-signup">
            <p onClick={login}>Sign in instead</p>
            <button>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
