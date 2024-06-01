import { API_RUN } from "./URLCollention.js";
import { openModal } from "./popup.js";
import { YourShipments } from "./yourShipments.js";
import { fetchOptions } from "./login.js";


export async function deleteShipment(id) {
    try {
      const response = await fetch(`${API_RUN}api/shipments/delete/${id}`, {
        method: "DELETE",
        fetchOptions
      });
  
      if (response.ok) {
        openModal("Shipment deleted successfully");
        YourShipments()
      } else if (response.status === 404) {
        const errorMessage = await response.text();
        openModal("Cannot Delete Once Shipper is Selected");
      } else {
        openModal("Can't Delete Shipment on When Bidding is done");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  