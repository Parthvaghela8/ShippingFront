import { openModal } from './popup.js';
import { handleCardClick } from './shipment.js';
import { API_RUN , WEB_RUN } from './URLCollention.js';

export function submitBid(shipmentId, bidAmount) {
    fetch(`${API_RUN}api/bids/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shipmentId: shipmentId,
            bidAmount: bidAmount,
            shipperId:localStorage.getItem('shipperId'),
            bidTime: new Date(),
            bidStatus: "pending",

        })
       
    })
    .then(response => {
        if (response.ok) {
            console.log('Bid placed successfully');
            openModal('Bid placed successfully!');
            handleCardClick(shipmentId)
            // Optionally, you can update the UI to reflect the bid placement
        } else {
            console.error('Failed to place bid');
            // Handle error if needed
        }
    })
    .catch(error => console.error('Error placing bid:', error));

   
}