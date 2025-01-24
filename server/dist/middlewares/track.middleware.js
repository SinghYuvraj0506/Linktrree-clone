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
exports.trackUser = void 0;
const asyncHandler_js_1 = __importDefault(require("../utils/asyncHandler.js"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const db_config_js_1 = __importDefault(require("../config/db.config.js"));
exports.trackUser = (0, asyncHandler_js_1.default)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const slug = (_a = req.params) === null || _a === void 0 ? void 0 : _a.slug;
        const id = (_b = req.query) === null || _b === void 0 ? void 0 : _b.id;
        const ip = req.ipAddress;
        let data;
        if (ip) {
            data = geoip_lite_1.default.lookup(ip);
            // {
            //   range: '',
            //   country: 'IN',
            //   region: 'DL',
            //   city: 'Delhi',
            //   ll: [ 28.6542, 77.2373 ],
            //   metro: 0,
            //   area: 5,
            //   eu: '0',
            //   timezone: 'Asia/Kolkata'
            // }
        }
        yield db_config_js_1.default.linkClicks.create({
            data: {
                ip: ip,
                slug: slug,
                linkId: id,
                city: data === null || data === void 0 ? void 0 : data.city,
                country: data === null || data === void 0 ? void 0 : data.country,
                region: data === null || data === void 0 ? void 0 : data.region,
                ll: data === null || data === void 0 ? void 0 : data.ll,
                timezone: data === null || data === void 0 ? void 0 : data.timezone
            }
        });
        next();
    }
    catch (error) {
        console.log("Error in tracking user", error);
        next();
    }
}));
