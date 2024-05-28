import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const fetchEmail = async () => {
    //   const response = await axios.get("http://localhost:3000/admin/me", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   });
    //   console.log(response);
    //   setUserEmail(response.data.username);
    // };

    // fetchEmail();

    function callback2(data) {
      console.log(data);
      if (data.username) {
        setUserEmail(data.username);
        setIsLoading(false);
      }
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <div>
        <Typography
          variant="h6"
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Coursera
        </Typography>
      </div>
      {userEmail ? (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button variant="contained" onClick={() => navigate("/addcourse")}>
              Add Course
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                setUserEmail(null);
                // setIsLoading(false);
                navigate("/");
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={() => navigate("/signin")}>
              Sign in
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
