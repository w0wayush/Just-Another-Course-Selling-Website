import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const Course = () => {
  let { courseId } = useParams();
  //   const [courses, setCourses] = useState([]);
  const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    function callback2(data) {
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

  /* let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
      console.log(course);
    }
  }

  if (!course) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No Course with course ID - {courseId}
      </div>
    );
  } */

  return (
    <div
      style={{
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "25px",
      }}
    >
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
      {/* setCourses={setCourses} course={course} */}
    </div>
  );
};

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  //   const course = props.course;

  const [courses, setCourses] = useRecoilState(coursesState);

  return (
    <div>
      {/* <div
        style={{
          marginTop: 15,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Typography variant={"h6"}>Update Course</Typography></div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Typography variant={"h6"}>Update Course</Typography>
          <br />
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
          <TextField
            margin="normal"
            fullWidth={true}
            id="outlined-basic"
            label="Image Link"
            variant="outlined"
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <br />
          <Button
            size={"large"}
            margin={"normal"}
            variant="contained"
            onClick={() => {
              function callback2(data) {
                // alert("Course updated successfully");
                // window.location = "/courses/" + course.id;
                let updatedCourses = [];
                for (let i = 0; i < courses.length; i++) {
                  if (courses[i].id == props.courseId) {
                    updatedCourses.push({
                      id: props.courseId,
                      title: title,
                      description: description,
                      imageLink: image,
                    });
                  } else {
                    updatedCourses.push(courses[i]);
                  }
                }
                setCourses(updatedCourses);
              }
              function callback1(res) {
                res.json().then(callback2);
              }
              fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                method: "PUT",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }).then(callback1);
            }}
          >
            Update Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

function CourseCard(props) {
  const courses = useRecoilValue(coursesState);
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == props.courseId) {
      course = courses[i];
      console.log(course);
    }
  }
  if (!course) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        No Course with course ID - {props.courseId}
      </Typography>
    );
  }

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img
        src={course.imageLink}
        style={{ width: 275, padding: 15 }}
        alt="image"
      ></img>
    </Card>
  );
}

const coursesState = atom({
  key: "coursesState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export default Course;
