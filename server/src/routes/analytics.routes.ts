import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getAnalytics } from "../controllers/analytics.controller";

const linksRouter = (router:Router) => {
    router.get('/analytics',verifyJWT, getAnalytics);
}

export default linksRouter;