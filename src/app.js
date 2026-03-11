import express from "express";
import cors from "cors";

const app = express();

//Basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import the routes

import healthcheckRouter from "./routes/healthcheck.routes.js";

import authRouter from "./routes/auth.routes.js";


import orderRoutes from "./routes/order.routes.js";
import guardRoutes from "./routes/guard.routes.js";
import tokenRoutes from "./routes/token.routes.js";


app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/guard", guardRoutes);
app.use("/api/v1/token", tokenRoutes);




app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);


app.get("/", (req, res) => {
  res.send("Welcome to basecampy!!");
});

export default app;
