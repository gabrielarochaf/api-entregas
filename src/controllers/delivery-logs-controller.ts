import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "@/utils/AppError";

class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    if (delivery.status === "delivered") {
      throw new AppError(
        "Cannot create log for a delivery that has already been delivered",
        400,
      );
    }

    if (delivery.status === "processing") {
      throw new AppError(
        "Cannot create log for a delivery that is still processing",
        400,
      );
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response
      .status(201)
      .json({ message: "Delivery log created successfully" });
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
      include: {
        logs: true,
        user: true,
      },
    });

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    const logs = await prisma.deliveryLog.findMany({
      where: {
        deliveryId: delivery_id,
      },
    });

    if (
      request.user?.role === "costumer" &&
      request.user.id !== delivery?.userId
    ) {
      throw new AppError(
        "You are not authorized to view this delivery logs",
        403,
      );
    }
    return response.status(200).json({ delivery, logs });
  }
}

export { DeliveryLogsController };
