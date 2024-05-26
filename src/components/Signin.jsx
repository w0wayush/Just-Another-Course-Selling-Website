import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div>
      <div
        style={{
          marginTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            margin="normal"
            fullWidth={true}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUser(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            fullWidth={true}
            id="outlined-basic"
            label="Password"
            type={"password"}
            variant="outlined"
            onChange={(e) => setPass(e.target.value)}
          />
          <br />
          <br />
          <Button
            size={"large"}
            margin={"normal"}
            variant="contained"
            onClick={() => {
              function callback2(data) {
                localStorage.setItem("token", data.token);
                window.location = "/";
                // console.log("Signed In successfully");
              }
              function callback1(res) {
                res.json().then(callback2);
              }
              fetch("http://localhost:3000/admin/login", {
                method: "POST",
                body: JSON.stringify({
                  username: user,
                  password: pass,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(callback1);
            }}
          >
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
