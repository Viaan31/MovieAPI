import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const loginHandler = () => {
    axios
      .post(`http://localhost:8080/user/login`, {
        userName: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setToken(res.data.id.timestamp);
        localStorage.setItem("userToken", res.data.id.timestamp);
        token ? navigate(`/`) : null;
      })
      .catch((err) => {
        console.log(err.response?.data);
        setError(err.response?.data?.message);
      });
  };

  return (
    <div className="lContainer">
      <div className="login-buttons">
        <h1>Login</h1>
        <TextField
          variant="filled"
          className="form-buttons"
          label="Enter Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          variant="filled"
          className="form-buttons"
          type="password"
          label="Enter Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="outline-info"
          className="me-2"
          onClick={() => loginHandler()}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
