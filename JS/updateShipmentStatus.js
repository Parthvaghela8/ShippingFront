import { API_RUN } from "./URLCollention.js";

export async function updateShipmentStatus(shipmentId, newStatus) {
    // Endpoint URL
    const url = `${API_RUN}api/shipments/status/${shipmentId}`;
    
    // Request body
    const requestBody = {
        status: newStatus
    };

    // Request options
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    };

    // Send the PUT request
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update shipment status');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response
            console.log('Shipment status updated:', data);
            // You can perform additional actions here if needed
        })
        .catch(error => {
            // Handle errors
            console.error('Error updating shipment status:', error);
        });
}
