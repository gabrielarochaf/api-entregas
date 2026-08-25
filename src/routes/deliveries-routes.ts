import { Router } from "express";

import { DeliveriesController } from "../controllers/deliveries-controller";
import { ensureAuthenticated } from "../middlewares/ensure-autheticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorized";
import { DeliveriesStatusController } from "../controllers/deliveries-status-controller";


const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));

deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

export { deliveriesRoutes };
