import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../config/db.config";
import ApiResponse from "../utils/ApiResponse";

export const getAnalytics = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const data = await prisma.$transaction([
      prisma.linkClicks.findMany({
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

      prisma.linkClicks.groupBy({
        by: ["linkId"],
        where: {
          link: {
            userId: userId,
          },
        },
        orderBy: {
          linkId: "asc",
        },
        _count:{
          id: true
        }
      }),
    ]);

    res.json(
      new ApiResponse(
        200,
        { slugStats: data[0], linksStats: data[1] },
        "Analytics fetched Successfully"
      )
    );
  }
);

