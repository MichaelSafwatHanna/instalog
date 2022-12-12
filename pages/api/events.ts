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
  total: number;
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
  // TODO: Get tenant from request's User
  const { page: pageStr, size: sizeStr, query, tenant } = req.query;
  const page = parseInt(pageStr as string);
  const size = parseInt(sizeStr as string);

  const [total, items] = await prisma.$transaction([
    prisma.event.count({
      where: {
        name: {
          contains: query === "" ? undefined : (query as string),
        },
        tenant: {
          name: {
            equals: tenant as string,
          },
        },
      },
    }),
    prisma.event.findMany({
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
        tenant: {
          name: {
            equals: tenant as string,
          },
        },
      },
    }),
  ]);

  res.json({
    page,
    items,
    total,
  });
};
