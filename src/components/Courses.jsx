import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      //       console.log(data);
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses", {
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
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {courses.map((course, index) => (
        <Course course={course} key={index} />
      ))}
    </div>
  );
};

function Course(props) {
  const navigate = useNavigate();
  // console.log(props);
  let course = props.course;

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {props.course.description}
      </Typography>
      <img
        src={props.course.imageLink}
        style={{ width: 275, padding: 15 }}
        alt="image"
      ></img>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          size={"normal"}
          margin={"normal"}
          variant="contained"
          onClick={() => {
            navigate("/courses/" + course.id);
          }}
        >
          Update Course
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
