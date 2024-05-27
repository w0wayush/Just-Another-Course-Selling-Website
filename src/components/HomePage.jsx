import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        Coursera Home Page
        <Button
          size={"normal"}
          margin={"normal"}
          variant="contained"
          onClick={() => {
            navigate("/courses");
          }}
        >
          Show All Course
        </Button>
      </h1>
    </div>
  );
};

export default HomePage;
