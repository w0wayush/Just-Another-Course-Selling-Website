import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";

const Course = () => {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);
  // const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get("http://localhost:3000/admin/courses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // console.log(response.data.courses);
      const selectedCourse = response.data.courses.find(
        (c) => c._id === courseId
      );
      setCourse(selectedCourse);
    };

    fetchCourses();

    // function callback2(data) {
    //   console.log(data.courses);
    //   setCourse(data.courses);
    // }
    // function callback1(res) {
    //   res.json().then(callback2);
    // }
    // fetch("http://localhost:3000/admin/courses", {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // }).then(callback1);
  }, [courseId]);

  if (!course) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }

  // console.log(course.title);
  // console.log(course.description);
  // console.log(course.price);
  // console.log(course.imageLink);

  return (
    // <div>
    //   <CourseCard courseId={courseId} />
    //   <UpdateCard courseId={courseId} />
    //   {/* setCourses={setCourses} course={course} */}
    // </div>
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
};

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: 250,
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 200 }}>
      <Card variant="outlined" style={{ width: 500, padding: 10 }}>
        <div style={{ padding: 10 }}>
          <Typography variant={"h6"}>Update Course Details</Typography>
          <br />
          <TextField
            margin="normal"
            value={title}
            fullWidth={true}
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            value={description}
            fullWidth={true}
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            value={image}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <TextField
            margin="normal"
            value={price}
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
              await axios.put(
                "http://localhost:3000/admin/courses/" + course._id,
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

              let updatedCourse = {
                _id: course._id,
                title: title,
                description: description,
                imageLink: image,
                price,
              };
              setCourse(updatedCourse);
              // function callback2(data) {
              // alert("Course updated successfully");
              // window.location = "/courses/" + course.id;
              //   let updatedCourses = [];
              //   for (let i = 0; i < courses.length; i++) {
              //     if (courses[i].id == props.courseId) {
              //       updatedCourses.push({
              //         id: props.courseId,
              //         title: title,
              //         description: description,
              //         imageLink: image,
              //       });
              //     } else {
              //       updatedCourses.push(courses[i]);
              //     }
              //   }
              //   setCourses(updatedCourses);
              // }
              // function callback1(res) {
              //   res.json().then(callback2);
              // }
              // fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              //   method: "PUT",
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
            Update Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  // const courses = useRecoilValue(coursesState);
  const course = props.course;

  if (!course) {
    return (
      <Typography variant="h6" style={{ textAlign: "center" }}>
        No Course Uploaded
      </Typography>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50,
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 350 }} alt="image"></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">
            <b>{course.title}</b>
          </Typography>
          <Typography variant="subtitle1">{course.description}</Typography>
          <Typography variant="subtitle2">Price</Typography>
          <Typography variant="subtitle1">
            <b>Rs. {course.price}</b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

// const coursesState = atom({
//   key: "coursesState", // unique ID (with respect to other atoms/selectors)
//   default: "", // default value (aka initial value)
// });

export default Course;
