import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import ErrorMiddleware from "./middlewares/error.middleware";
import ApiError from "./utils/ApiError"
import router from "./routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from "./utils/constants";

const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL as string],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
  res.send("Hello guys welcome to wave server");
});

// routes -------------------
app.use("/api/v1", router());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));


// 404 route handler
app.all("*", (req: Request, res: Response) => {
  throw new ApiError(404, `Route ${req.originalUrl} Not Found!!!`);
});

// handle Error Responses ---
app.use(ErrorMiddleware as any)


export default app;
