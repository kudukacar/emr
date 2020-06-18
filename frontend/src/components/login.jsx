import React, { useState } from "react";
import axiosInstance from "../util/axiosAPI";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post('api/token/', {
      email: email,
      password: password
    });
    const { data } = response;
    axiosInstance.defaults.headers['Authorization'] = "JWT " + data.token.access
    localStorage.setItem('access_token', data.token.access);
    localStorage.setItem('refresh_token', data.token.refresh);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;