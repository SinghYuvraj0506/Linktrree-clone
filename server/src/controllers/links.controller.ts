import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { z } from "zod";
import prisma from "../config/db.config";
import ApiResponse from "../utils/ApiResponse";
import { createLinkSchema, updateLinkSchema } from "../schemas/link.schema";

const getLinksInclude = () => {
  return {
    _count: {
      select: {
        analytics: true,
      },
    },
    id: true,
    title: true,
    url: true,
    order: true,
    type: true,
    active: true,
    thumbnail: true,
    thumbnail_layout: true,
    prioritize: true,
    animation_type: true,
    show_time: true,
    hide_time: true,
    isLocked: true,
    lock_type: true,
    lock_data: true,
  };
};

export const getUserLinks = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const links = await prisma.link.findMany({
      where: { userId },
      select: getLinksInclude(),
      orderBy: { order: "asc" },
    });

    res.json(new ApiResponse(200, links, "Link Fetched Successfully"));
  }
);

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
    select: getLinksInclude(),
  });

  res.json(new ApiResponse(200, link, "Link Created Successfully"));
});

export const updateLink = asyncHandler(async (req: Request, res: Response) => {
  const linkId = req.params.id;
  const userId = req.user?.id as string;

  const {
    body: {
      order,
      title,
      type,
      url,
      active,
      thumbnail,
      thumbnail_layout,
      prioritize,
      animation_type,
      show_time,
      hide_time,
      isLocked,
      lock_type,
      redirect,
      lock_data,
    },
  }: z.infer<typeof updateLinkSchema> = req;

  const transactions:any = []

  if (prioritize) {
    transactions.push(
      prisma.link.updateMany({
        where: { userId },
        data: {
          prioritize: false,
          animation_type: "NONE",
        },
      })
    );
  }

  const updateQuery = prisma.link.update({
    where: { id: linkId },
    data: {
      order,
      title,
      type,
      url,
      active,
      userId,
      thumbnail,
      thumbnail_layout,
      show_time,
      hide_time,
      isLocked,
      lock_type,
      animation_type,
      lock_data,
      prioritize,
      redirect_relation_user: redirect
        ? {
            connect: {
              id: userId,
            },
          }
        : {
          disconnect:{
            id: userId
          }
        },
    },
    select: getLinksInclude(),
  })

  transactions.push(updateQuery)
  
  const data = await prisma.$transaction(transactions);
  res.json(new ApiResponse(200, data[1], "Link Updated Successfully"));
});

export const deleteLink = asyncHandler(async (req: Request, res: Response) => {
  const linkId = req.params.id;

  let link = await prisma.link.delete({
    where: { id: linkId },
  });

  res.json(new ApiResponse(200, link, "Link Deleted Successfully"));
});
