"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLink = exports.updateLink = exports.createLinks = exports.getUserLinks = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const db_config_1 = __importDefault(require("../config/db.config"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
exports.getUserLinks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const links = yield db_config_1.default.link.findMany({
        where: { userId },
        orderBy: { order: 'asc' }
    });
    res.json(new ApiResponse_1.default(200, links, "Link Fetched Successfully"));
}));
exports.createLinks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { body: { order, title, type, url }, } = req;
    let link = yield db_config_1.default.link.create({
        data: {
            order,
            title,
            type,
            url,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    res.json(new ApiResponse_1.default(200, link, "Link Created Successfully"));
}));
exports.updateLink = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const linkId = req.params.id;
    const { body: { order, title, type, url, active }, } = req;
    let link = yield db_config_1.default.link.update({
        where: { id: linkId },
        data: {
            order,
            title,
            type,
            url,
            active,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    res.json(new ApiResponse_1.default(200, link, "Link Updated Successfully"));
}));
exports.deleteLink = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const linkId = req.params.id;
    let link = yield db_config_1.default.link.delete({
        where: { id: linkId },
    });
    res.json(new ApiResponse_1.default(200, link, "Link Deleted Successfully"));
}));
