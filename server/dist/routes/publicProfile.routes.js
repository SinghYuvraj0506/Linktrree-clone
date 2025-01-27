"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const public_profile_controller_1 = require("../controllers/public_profile.controller");
const track_middleware_1 = require("../middlewares/track.middleware");
const publicProfileRouter = (router) => {
    router.get('/public/getProfile/:slug', track_middleware_1.trackUser, public_profile_controller_1.getProfileData);
    router.get('/public/redirect', track_middleware_1.trackUser, public_profile_controller_1.redirectToLink);
    router.get('/public/unlock/:id', public_profile_controller_1.unlockLink);
};
exports.default = publicProfileRouter;
