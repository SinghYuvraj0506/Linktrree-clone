import express from "express";
import authRouter from "./auth.routes";
import linksRouter from "./links.routes";

const router = express.Router();

export default () => {
  authRouter(router);
  linksRouter(router)
  return router;
};
