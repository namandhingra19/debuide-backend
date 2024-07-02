import { Request, Response } from "express";
import RoomServiceService from "../sevices/RoomService.service";
import { randomUUID } from "crypto";
import ResourcesService from "../sevices/Resources.service";

class RoomController {
  async reserveRoom(req: Request, res: Response) {
    const { type } = req.body;
    const success = await RoomServiceService.reserveRoom(type);
    const resources = await ResourcesService.getAllResources();
    if (success) {
      res.status(200).json({
        message: `${type} room reserved.`,
        resources: resources,
      });
    } else {
      res.status(400).json({
        message: `No ${type} rooms available.`,
        resources: resources,
      });
    }
  }
  async getRooms(req: Request, res: Response) {
    const rooms = await RoomServiceService.getRooms();
    res.status(200).json(rooms);
  }
  async reAllocateDefaultData(req: Request, res: Response) {
    console.log("Reallocating default data");
    await RoomServiceService.rewriteCollectionWithDefaultData();
    await ResourcesService.rewriteCollectionWithDefaultData();
    res.status(200).json({ message: "Default data reallocated." });
  }
}

export default new RoomController();
