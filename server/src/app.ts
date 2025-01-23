import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import ErrorMiddleware from "./middlewares/error.middleware";
import ApiError from "./utils/ApiError"
import router from "./routes";
import requestIp from "request-ip"


const app = express();

const corsOptions = {
  origin: [process.env.CLIENT_URL as string],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(requestIp.mw({ attributeName : 'ipAddress' }))

// ::1 {
//   range: '',
//   country: 'IN',
//   region: 'DL',
//   city: 'Delhi',
//   ll: [ 28.6542, 77.2373 ],
//   metro: 0,
//   area: 5,
//   eu: '0',
//   timezone: 'Asia/Kolkata'
// }


app.get("/healthcheck", (req, res) => {
  res.send("Hello guys welcome to wave server");
});

// routes -------------------
app.use("/api/v1", router());

// 404 route handler
// app.all("*", (req: Request, res: Response) => {
//   throw new ApiError(404, `Route ${req.originalUrl} Not Found!!!`);
// });

// handle Error Responses ---
app.use(ErrorMiddleware as any)

export default app;
