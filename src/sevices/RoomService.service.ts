import Room from "../models/Room";
import Resource from "../models/Resource";
import { randomUUID } from "crypto";

const roomRequirements = {
  "Normal Room": { "Flat Beds": 1, "Normal Masks": 2 },
  "Oxygen Rooms": {
    "Oxygen Cylinder": 2,
    "Recliner Beds": 1,
    "Non Rebreather Masks": 2,
  },
  ICU: { Ventilator: 1, "Recliner Beds": 1, "Oxygen Cylinder": 1 },
};
const mockData = [
  {
    name: "Normal Room",
    _id: `ROOM-${randomUUID()}`,
    quantity: 50,
  },
  {
    name: "Oxygen Rooms",
    _id: `ROOM-${randomUUID()}`,
    quantity: 50,
  },
  { name: "ICU", _id: `ROOM-${randomUUID()}`, quantity: 20, reserved: false },
];
class RoomService {
  async reserveRoom(type: string): Promise<boolean> {
    try {
      const room = await Room.findOne({
        _id: type,
        quantity: { $gt: 0 },
      });
      if (!room) return false;
      const resourcesAvailable = await this.checkResourcesAvailability(
        room.name
      );
      if (!resourcesAvailable) return false;
      await this.releaseResources(room.name);
      room.quantity -= 1;
      await room.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private async checkResourcesAvailability(type: string): Promise<boolean> {
    const requirements = roomRequirements[type];
    for (const resourceType in requirements) {
      const resource = await Resource.findOne({ name: resourceType });
      if (!resource || resource.quantity < requirements[resourceType]) {
        return false;
      }
    }
    return true;
  }

  private async releaseResources(type: string) {
    const requirements = roomRequirements[type];
    const promises = [];
    for (const resourceType in requirements) {
      console.log(resourceType);
      console.log(requirements[resourceType]);
      const promise = await Resource.findOneAndUpdate(
        { name: resourceType },
        {
          $inc: { quantity: -requirements[resourceType] },
        }
      );
      // promises.push(promise);
    }
    await Promise.all(promises);
  }
  async rewriteCollectionWithDefaultData() {
    try {
      await Room.deleteMany({});

      await Room.insertMany(mockData);

      console.log("Collection rewritten with default data successfully");
    } catch (err) {
      console.error("Error rewriting collection:", err);
    }
  }

  async getRooms() {
    try {
      const rooms = await Room.find({});
      return rooms;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export default new RoomService();
