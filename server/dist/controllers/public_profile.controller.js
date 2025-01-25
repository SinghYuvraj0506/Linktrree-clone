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
exports.redirectToLink = exports.getProfileData = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const db_config_1 = __importDefault(require("../config/db.config"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
// getProfileData ----------
exports.getProfileData = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        const data = yield db_config_1.default.user.findFirst({
            where: { slug, status: 1 },
            select: {
                name: true,
                image: true,
                slug: true,
                templateData: true,
                links: {
                    where: {
                        active: true
                    },
                    select: {
                        url: true,
                        title: true,
                        id: true,
                        order: true,
                        type: true,
                    },
                    orderBy: { order: "asc" },
                },
            },
        });
        if (!data) {
            throw new ApiError_1.default(400, "Page not found");
        }
        res
            .status(200)
            .json(new ApiResponse_1.default(200, data, "Fetched profile successfully"));
    }
    catch (error) {
        throw new ApiError_1.default(401, (error === null || error === void 0 ? void 0 : error.message) || "Error in fetching profile");
    }
}));
// redirect to url
exports.redirectToLink = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, id } = req.query;
        if (!link || !id || typeof (link) !== "string") {
            throw new ApiError_1.default(400, "Bad Request");
        }
        res
            .status(200)
            .redirect(link);
    }
    catch (error) {
        throw new ApiError_1.default(401, (error === null || error === void 0 ? void 0 : error.message) || "Error in redirection");
    }
}));
