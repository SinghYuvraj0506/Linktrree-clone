import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { z } from "zod";
import prisma from "../config/db.config";
import ApiResponse from "../utils/ApiResponse";
import { createLinkSchema } from "../schemas/link.schema";

export const getUserLinks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id

  const links = await prisma.link.findMany({
    where:{userId},
    orderBy:{order:'asc'}
  });


  res.json(new ApiResponse(200, links, "Link Fetched Successfully"));
})



export const createLinks = asyncHandler(async (req: Request, res: Response) => {
  const {
    body: { order, title, type, url },
  }: z.infer<typeof createLinkSchema> = req;

  let link = await prisma.link.create({
    data: {
      order,
      title,
      type,
      url,
      userId: req.user?.id as string,
    },
  });

  res.json(new ApiResponse(200, link, "Link Created Successfully"));
});


export const updateLink = asyncHandler(async (req: Request, res: Response) => {
  const linkId = req.params.id;
  const {
    body: { order, title, type, url },
  }: z.infer<typeof createLinkSchema> = req;

  let link = await prisma.link.update({
    where: { id: linkId },
    data: {
      order,
      title,
      type,
      url,
      userId: req.user?.id as string,
    },
  });

  res.json(new ApiResponse(200, link, "Link Updated Successfully"));
});


export const deleteLink = asyncHandler(
  async (req: Request, res: Response) => {
    const linkId = req.params.id;

    let link = await prisma.link.delete({
      where: { id: linkId },
    });

    res.json(new ApiResponse(200, link, "Link Deleted Successfully"));
  }
);
