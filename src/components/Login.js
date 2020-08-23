import React from "react";
import useInput from "../hooks/useInput";
import "./signup.css";

const Login = ({ signup }) => {
  const email = useInput("");
  const password = useInput("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({
      email: email.value,
      password: password.value,
    });
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
