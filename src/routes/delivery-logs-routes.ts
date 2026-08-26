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

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "costumer"]),
  deliveryLogsController.show,
);

export { deliveryLogsRoutes };