const express = require("express");
const app = express();
const { authenticateJwt } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db/index");
require("dotenv").config();
const SECRET = process.env.SECRET;

const router = express.Router();

// Admin routes
router.get("/me", authenticateJwt, (req, res) => {
  res.json({
    username: req.user.username,
  });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const obj = { username: username, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  console.log("Admin login");
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

// router.post("/courses", authenticateJwt, async (req, res) => {
//   const course = new Course(req.body);
//   await course.save();

//   // const { title, description, price, imageLink, published } = req.body;
//   // const newCourse = new Course(title, description, price, imageLink, published);
//   // await newCourse.save();
//   // fs.writeFileSync("courses.json", JSON.stringify(COURSES));
//   res.json({ message: "Course created successfully", data: course });
// });

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated successfully", data: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses: courses });
});

module.exports = router;
