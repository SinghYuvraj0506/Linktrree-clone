import { Request, NextFunction} from "express";
import asyncHandler from "../utils/asyncHandler.js";
import geoIp from "geoip-lite"
import prisma from "../config/db.config.js";

export const trackUser = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      const slug = req.params?.slug
      const id = req.query?.id

      const ip = req.ipAddress;
      let data:any

      if(ip){
        data = geoIp.lookup(ip);
      }

      await prisma.linkClicks.create({
        data:{
          ip: ip,
          slug: slug,
          linkId: String(id) ?? null,
          city: data?.city,
          country: data?.country,
          region: data?.region,
          ll: data?.ll,
          timezone: data?.timezone
        }
      })
   
      next();
    } catch (error: any) {
      console.log("Error in tracking user", error)
      next();
    }
  }
);
