import { Request, Response } from "express";

class DeliveriesController {
    create(request: Request, response: Response) {
        return response.status(201).json({ message: "Delivery created successfully" });
    }
}

export {DeliveriesController}