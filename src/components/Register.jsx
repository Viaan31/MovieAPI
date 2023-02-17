import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import { Button } from "react-bootstrap";

const Register = () => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerHandler = (data, e) => {
    console.log(data);
    axios
      .post(`http://localhost:8080/user/add`, {
        email: data?.email,
        userName: data?.username,
        password: data?.password,
      })
      .catch((res) => {
        console.log(res.response.data.message);
        setError(res.response.data.message);
      });
    error ? (
      <h1>error</h1>
    ) : (
      emailjs
        .sendForm(
          "service_muq7qcg",
          "template_cm9ygew",
          e?.target,
          "pqxfs4_JGDXhF7S3d"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        )
    );
  };

  const form = document.querySelector(".form");
  form?.addEventListener("submit", registerHandler);
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "100%", height: "100%" },
      }}
      className="lContainer"
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit(registerHandler)} className="form-container">
        <h1 className="form-title">Register</h1>
        <TextField
          required
          className="form-buttons"
          id="outlined-basic"
          label="Username"
          variant="filled"
          type="text"
          name="username"
          placeholder="User Name"
          {...register("username", { required: true })}
        />

        {errors?.username?.type === "required" && (
          <Alert variant="filled" severity="error" sx={{ width: "50%" }}>
            This field is required
          </Alert>
        )}

        <TextField
          required
          id="standard-basic"
          className="form-buttons"
          label="Email"
          variant="filled"
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />

        {errors?.email?.type === "required" && (
          <Alert variant="filled" severity="error" sx={{ width: "50%" }}>
            This field is required
          </Alert>
        )}
        {errors?.email?.type === "pattern" && (
          <Alert variant="filled" severity="error" sx={{ width: "50%" }}>
            Please enter correct email
          </Alert>
        )}

        <TextField
          required
          id="standard-basic"
          className="form-buttons"
          label="Password"
          variant="filled"
          type="password"
          name="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,15}$/,
          })}
        />

        {errors?.password?.type === "required" && (
          <Alert variant="filled" severity="error" sx={{ width: "50%" }}>
            This field is required
          </Alert>
        )}
        {errors?.password?.type === "pattern" && (
          <Alert variant="filled" severity="error" sx={{ width: "50%" }}>
            Password has to be between 7 to 15 characters, must contain atleast
            one Uppercase,one Lowercase letter, one digit and one special
            character
          </Alert>
        )}
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <Button type="submit" variant="outline-info" className="me-2">
          Register
        </Button>
      </form>
    </Box>
  );
};
export default Register;
