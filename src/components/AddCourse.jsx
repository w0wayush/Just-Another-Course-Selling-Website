import { Button, Card, TextField } from "@mui/material";
import React, { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        {/* <Typography variant={"h6"}>Add Course</Typography> */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            margin="normal"
            fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            fullWidth={true}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <br />
          <Button
            size={"large"}
            margin={"normal"}
            variant="contained"
            onClick={() => {
              function callback2(data) {
                alert("Course added");
              }
              function callback1(res) {
                res.json().then(callback2);
              }
              fetch("http://localhost:3000/admin/courses", {
                method: "POST",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: "",
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }).then(callback1);
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
