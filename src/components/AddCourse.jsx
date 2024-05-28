import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        alignItems: "center",
      }}
    >
      {/* <div
        style={{
          marginTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>Add Course</Typography>
      </div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            margin="normal"
            fullWidth={true}
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            fullWidth={true}
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            fullWidth={true}
            label="Image Link"
            variant="outlined"
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            fullWidth={true}
            label="Price"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <Button
            size={"large"}
            margin={"normal"}
            variant="contained"
            onClick={async () => {
              await axios.post(
                "http://localhost:3000/admin/courses",
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              navigate("/");

              // function callback2(data) {
              //   alert("Course added");
              // }
              // function callback1(res) {
              //   res.json().then(callback2);
              // }
              // fetch("http://localhost:3000/admin/courses", {
              //   method: "POST",
              //   body: JSON.stringify({
              //     title: title,
              //     description: description,
              //     imageLink: image,
              //     published: true,
              //   }),
              //   headers: {
              //     "Content-type": "application/json",
              //     Authorization: "Bearer " + localStorage.getItem("token"),
              //   },
              // }).then(callback1);
            }}
          >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AddCourse;
