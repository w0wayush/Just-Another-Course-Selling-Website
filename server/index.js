const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const connectDB = require("./db/database");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

connectDB();

app.listen(3000, () => console.log("Server running on port 3000"));
