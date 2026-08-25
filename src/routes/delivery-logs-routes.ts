import Router from "express";

import { DeliveryLogsController } from "../controllers/delivery-logs-controller";

import { ensureAuthenticated } from "../middlewares/ensure-autheticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorized";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create,
);

export { deliveryLogsRoutes };