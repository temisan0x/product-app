require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/usersRouter");
const productRouter = require("./routes/productRoute");
const globalErrorHandler = require('./controllers/errorContoller');


const app = express();
const PORT = process.env.PORT || "4000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to real buy",
    success: true,
  });
});

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);


app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.path);
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.use(globalErrorHandler);

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app
  .listen(PORT, () => {
    console.log("Server listening from port", PORT);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
