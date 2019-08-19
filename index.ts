/**
 * @developer Oyewole abayomi Samuel
 * @email oyewoleabayomi@gmail.com
 * @website http://www.oyewoleabayomi.com
 */
import { ShipmentUpdate, ShipmentSearchIndex } from "./challenge";

interface ShipmentDataInterface {
  id: string;
  data: any
};

/**
 * @class Main
 * @classdesc the main class here basically acts as my testing module
 */
class Main {
  singleShipment: ShipmentDataInterface;
  bulkShipment: ShipmentDataInterface[];

  constructor(private shipmentUpdate: ShipmentUpdate) {
    this.singleShipment = {
      id: 'ship-101',
      data: { category: 'cargo' }
    };
    this.bulkShipment = [
       { id: 'ship-101', data: { category: 'cargo' } },
       { id: 'ship-102', data: { category: 'batch' } }
    ];
  }

  async updateShipment() {
    const { id, data } = this.singleShipment;
    await this.shipmentUpdate.receiveUpdate(id, data);
  }

  updateBulkShipment() {
    this.bulkShipment.map(async ({ id, data }) => {
      await this.shipmentUpdate.receiveUpdate(id, data);
    });
  }
}

const shipmentSearchIndex = new ShipmentSearchIndex();
const shipmentUpdate = new ShipmentUpdate(shipmentSearchIndex);

// Main instance
const app = new Main(shipmentUpdate);

/**
 * test case 1
 * Run two shipment updates concurrently with the same id
 */
app.updateShipment();
app.updateShipment();

/**
 * test case 2
 * Run a single shipment update
 */
// app.updateShipment();

/**
 * test case 3
 * Run a batch shipment update with unique IDs
 */
// app.updateBulkShipment();