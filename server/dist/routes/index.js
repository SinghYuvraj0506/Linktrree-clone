"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const links_routes_1 = __importDefault(require("./links.routes"));
const publicProfile_routes_1 = __importDefault(require("./publicProfile.routes"));
const analytics_routes_1 = __importDefault(require("./analytics.routes"));
const router = express_1.default.Router();
exports.default = () => {
    (0, auth_routes_1.default)(router);
    (0, links_routes_1.default)(router);
    (0, publicProfile_routes_1.default)(router);
    (0, analytics_routes_1.default)(router);
    return router;
};
