import { Request, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import geoIp from "geoip-lite";
import prisma from "../config/db.config.js";

export const trackUser = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      const slug = req.params?.slug;
      const id = req.query?.id;

      const ip = req.ipAddress;
      let data: any;

      if (ip) {
        data = geoIp.lookup(ip);
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

      await prisma.linkClicks.create({
        data:{
          ip: ip,
          slug: slug,
          linkId: id as string,
          city: data?.city,
          country: data?.country,
          region: data?.region,
          ll: data?.ll,
          timezone: data?.timezone
        }
      })

      next();
    } catch (error: any) {
      console.log("Error in tracking user", error);
      next();
    }
  }
);
