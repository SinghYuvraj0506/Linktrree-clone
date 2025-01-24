"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = exports.cookieOption = void 0;
const cookieALlOptions = () => {
    if (process.env.NODE_ENV === "development") {
        return {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: "localhost"
        };
    }
    else {
        return {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // domain:"livetesting.tech"
        };
    }
};
exports.cookieOption = cookieALlOptions();
exports.swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Employee API',
            description: 'Employee API Information',
            version: '1.0.0',
            contact: {
                name: 'Sagi Weizmann',
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ['./routes/*.js'],
};
