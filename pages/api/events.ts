import { Event, Actor, Tenant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

// TODO: Create DTO with filtered properties
export type EventDto = Event & {
  createdBy: Actor;
  tenant: Tenant;
};

export type Page<T> = {
  page: number;
  items: T[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    create(req, res);
  } else if (req.method === "GET") {
    getAll(req, res);
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse<Event>) => {
  const { name, description, actorId, tenantId } = req.body;
  const event = await prisma.event.create({
    data: {
      description,
      name,
      actorId,
      location: req.socket.remoteAddress ?? "",
      tenantId,
    },
  });

  res.json(event);
};

const getAll = async (
  req: NextApiRequest,
  res: NextApiResponse<Page<EventDto>>
) => {
  const { page: pageStr, size: sizeStr, query } = req.query;
  const page = parseInt(pageStr as string);
  const size = parseInt(sizeStr as string);

  const events = await prisma.event.findMany({
    skip: page * size,
    take: size,
    include: {
      createdBy: true,
      tenant: true,
    },
    where: {
      name: {
        contains: query === "" ? undefined : (query as string),
      },
    },
  });

  res.json({
    page,
    items: events, // TODO: Create DTO type
  });
};
