import Resource from "../models/Resource";
import { randomUUID } from "crypto";

const mockData = [
  { name: "Flat Beds", quantity: 80, _id: `RES-${randomUUID()}` },
  { name: "Recliner Beds", quantity: 100, _id: `RES-${randomUUID()}` },
  { name: "Ventilator", quantity: 16, _id: `RES-${randomUUID()}` },
  { name: "Oxygen Cylinder", quantity: 110, _id: `RES-${randomUUID()}` },
  { name: "Normal Masks", quantity: 200, _id: `RES-${randomUUID()}` },
  { name: "Non Rebreather Masks", quantity: 120, _id: `RES-${randomUUID()}` },
];

class ResourceService {
  async rewriteCollectionWithDefaultData() {
    try {
      await Resource.deleteMany({});

      await Resource.insertMany(mockData);

      console.log("Collection rewritten with default data successfully");
    } catch (err) {
      console.error("Error rewriting collection:", err);
    }
  }
  async getAllResources() {
    try {
      const resources = await Resource.find({});
      return resources;
    } catch (e) {
      console.log(e);
    }
  }

  async decreaseResourceQuantity(resourceId: string) {
    try {
      const resource = await Resource.findOne({ _id: resourceId });
      if (!resource) return false;
      resource.quantity -= 1;
      await resource.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

export default new ResourceService();
