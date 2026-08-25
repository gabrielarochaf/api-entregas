import { Router } from "express";

import { DeliveriesController } from "../controllers/deliveries-controller";
import { ensureAuthenticated } from "../middlewares/ensure-autheticated";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorized";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));

deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);

export { deliveriesRoutes };
