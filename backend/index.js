const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // to allow cross-origin requests
const userRouter = require("./routes/user");

const app = express();
const corsOrigin =
  process.env.REACT_APP_NODE_ENV === "production"
    ? "Your Production Link of Frontend"
    : "http://localhost:3000";

app.use(
  cors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE",
    credentials: true,
  })
);

// Connect to database
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define Routes
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
