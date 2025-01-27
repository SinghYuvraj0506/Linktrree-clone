"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const link_schema_1 = require("../schemas/link.schema");
const links_controller_1 = require("../controllers/links.controller");
const linksRouter = (router) => {
    router.get('/links/user', auth_middleware_1.verifyJWT, links_controller_1.getUserLinks);
    router.post('/links', auth_middleware_1.verifyJWT, (0, validate_middleware_1.default)(link_schema_1.createLinkSchema), links_controller_1.createLinks);
    router.put('/links/:id', auth_middleware_1.verifyJWT, (0, validate_middleware_1.default)(link_schema_1.updateLinkSchema), links_controller_1.updateLink);
    router.delete('/links/:id', auth_middleware_1.verifyJWT, links_controller_1.deleteLink);
};
exports.default = linksRouter;
