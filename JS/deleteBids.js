import { API_RUN } from "./URLCollention.js";
import { openModal } from "./popup.js";
import { deleteShipment } from "./deleteShipment.js";
import { fetchOptions } from "./login.js";

export async function deleteBids(shipmentId){
    // debugger;
   await fetch(`${API_RUN}api/bids/shipment/${shipmentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
      // You can add more headers if required, such as authentication token
    }
  })
  .then(response => {
    if (response.ok || response.status === 404) {
        // openModal("Shipment deleted successfully");
        deleteShipment(shipmentId)
      } 

  })
  .catch(error => {
    openModal("Cannot Delete Once Shipper is Selected",error);
  });
}