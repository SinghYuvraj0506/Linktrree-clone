"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
const analytics_controller_1 = require("../controllers/analytics.controller");
const linksRouter = (router) => {
    router.get('/analytics', auth_middleware_1.verifyJWT, analytics_controller_1.getAnalytics);
};
exports.default = linksRouter;
