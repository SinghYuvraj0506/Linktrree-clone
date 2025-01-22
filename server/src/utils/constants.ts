import { CookieOptions } from "express";

const cookieALlOptions: () => CookieOptions = () => {
    if (process.env.NODE_ENV === "development"){
      return {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        domain:"localhost"
      };
    }
    
    else{
      return {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // domain:"livetesting.tech"
      };
    }
  }

  export const cookieOption = cookieALlOptions()

  export const swaggerOptions = {
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
  