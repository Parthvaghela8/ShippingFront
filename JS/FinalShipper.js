import { WEB_RUN , API_RUN } from './URLCollention.js'
import { finalShipments } from './finalShipments.js';
const container = document.getElementById('cards-container');


export function getFinalShipperDetails() {
  // debugger;
  container.innerHTML=""
    fetch(`${API_RUN}api/finalshippers/shipments/all`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch shipments');
      }
      return response.json();
    })
    .then(shipments => {
      shipments.map(shipment => {
      // Handle the list of shipments
      console.log(shipment.shipperId);
      const shipperId = shipment.shipperId;
      const localShipperId= parseInt(localStorage.getItem('shipperId'))
      // Assuming shipperId is a property of each shipment
      // debugger
      if(localShipperId === shipperId){
        console.log( shipment.shipmentId)
        finalShipments(shipment.shipmentId)
      }
        
      // Now you can process the shipments or display them on the webpage
      })
    })
    .catch(error => {
      console.error('Error fetching shipments:', error);
      // Handle the error, such as displaying an error message on the webpage
    });
}
