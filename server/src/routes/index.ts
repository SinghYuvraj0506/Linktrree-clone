import express from "express";
import authRouter from "./auth.routes";
import linksRouter from "./links.routes";
import publicProfileRouter from "./publicProfile.routes";
import analyticsRouter from "./analytics.routes";

const router = express.Router();

export default () => {
  authRouter(router);
  linksRouter(router)
  publicProfileRouter(router)
  analyticsRouter(router)
  return router;
};
