import React, { useEffect, useState } from "react";

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
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {courses.map((course, index) => (
        <div key={index}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Courses;
