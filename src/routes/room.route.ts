import { Router } from "express";
import roomController from "../controllers/room.controller";

const roomRouter: Router = Router();

roomRouter.get("/", roomController.getRooms);
roomRouter.post("/reserve", roomController.reserveRoom);
roomRouter.post("/reAllocateDefaultData", roomController.reAllocateDefaultData);

export default roomRouter;
