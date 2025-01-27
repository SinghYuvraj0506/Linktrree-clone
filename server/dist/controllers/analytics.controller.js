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
exports.getAnalytics = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const db_config_1 = __importDefault(require("../config/db.config"));
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
exports.getAnalytics = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const data = yield db_config_1.default.$transaction([
        db_config_1.default.linkClicks.findMany({
            where: {
                userId: userId,
            },
            select: {
                city: true,
                country: true,
                ip: true,
                ll: true,
                region: true,
                timezone: true,
            },
        }),
        db_config_1.default.linkClicks.groupBy({
            by: ["linkId"],
            where: {
                link: {
                    userId: userId,
                },
            },
            orderBy: {
                linkId: "asc",
            },
            _count: {
                id: true
            }
        }),
    ]);
    res.json(new ApiResponse_1.default(200, { slugStats: data[0], linksStats: data[1] }, "Analytics fetched Successfully"));
}));
