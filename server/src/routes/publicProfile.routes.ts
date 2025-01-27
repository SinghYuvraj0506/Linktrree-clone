import { Router } from "express";
import { getProfileData, redirectToLink, unlockLink } from "../controllers/public_profile.controller";
import { trackUser } from "../middlewares/track.middleware";

const publicProfileRouter = (router:Router) => {
    router.get('/public/getProfile/:slug',trackUser,  getProfileData);
    router.get('/public/redirect',trackUser, redirectToLink);
    router.get('/public/unlock/:id',unlockLink);
}

export default publicProfileRouter;