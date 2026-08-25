import {Request, Response} from 'express';

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        return response.status(201).json({ message: 'Delivery log created successfully' });

    }
}

export {DeliveryLogsController};