import { API_RUN } from './URLCollention.js';
import { closeLoader, openLoader } from './home.js';

const container = document.getElementById('cards-container');

export function finalShipments(shipmentId) {
    // Fetch data for the clicked shipment
    openLoader();
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML=''
    const filterInputContainer = document.getElementById("filter-input-container");
    filterInputContainer.innerHTML=''
    fetch(`${API_RUN}api/shipments/${shipmentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Fetch last bid for the shipment
            fetch(`${API_RUN}api/bids/shipment/${shipmentId}`)
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            // Handle case where no bids are posted
                            return [];
                        }
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(bids => {
                    closeLoader();
                    // Display shipment details and last bid
                    const lastBidAmount = bids.length > 0 ? bids[bids.length - 1].bidAmount : 0;
                    console.log(data);
                    console.log(bids);

                    const cardContainer = document.createElement('div');
                    cardContainer.classList.add('container-card-final');

                    const card = document.createElement('div');
                    card.classList.add('shipment-card-final');

                    const shipmentIdDiv = document.createElement('div');
                    shipmentIdDiv.classList.add('shipment');

                    // Create image container
                    const imageDiv = document.createElement('div');
                    imageDiv.classList.add('imageid');
                    const image = document.createElement('img');
                    image.src = data.shipment.imageUrl;
                    image.alt = 'Uploaded Image';
                    image.width = '460';
                    image.height = '345';
                    image.classList.add('shipment-image-id');
                    imageDiv.appendChild(image);
                    shipmentIdDiv.appendChild(imageDiv);

                    // Create shipment details container
                    const shipmentDetailsDiv = document.createElement('div');
                    shipmentDetailsDiv.classList.add('shipment-details');
                    const pickupDate = document.createElement('p');
                    pickupDate.innerHTML = `<span>PickUp Date:</span>${formatDate(data.shipment.shipmentDate)}`;
                    shipmentDetailsDiv.appendChild(pickupDate);
                    const deliveryDate = document.createElement('p');
                    deliveryDate.innerHTML = `<span>Delivery Date:</span>${formatDate(data.shipment.deliveryDate)}`;
                    shipmentDetailsDiv.appendChild(deliveryDate);
                    const maxBidAmount = document.createElement('p');
                    maxBidAmount.innerHTML = `<span>Your Bid:</span>${lastBidAmount}`;
                    shipmentDetailsDiv.appendChild(maxBidAmount);
                    const pickupAddress = document.createElement('p');
                    pickupAddress.innerHTML = `<span>Pickup Address:</span>${formatAddress(data.originAddress)}`;
                    shipmentDetailsDiv.appendChild(pickupAddress);
                    const deliveryAddress = document.createElement('p');
                    deliveryAddress.innerHTML = `<span>Delivery Address:</span>${formatAddress(data.destinationAddress)}`;
                    shipmentDetailsDiv.appendChild(deliveryAddress);
                    shipmentIdDiv.appendChild(shipmentDetailsDiv);

                    // Append shipment details to card
                    card.appendChild(shipmentIdDiv);

                    // Append card to card container
                    cardContainer.appendChild(card);

                    // Append card container to main container
                    container.appendChild(cardContainer);
                })
                .catch(error => console.error('Error fetching bids:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Sample array of shipmentIds
const shipmentIds = ['shipmentId1', 'shipmentId2', 'shipmentId3'];

// Iterate over shipmentIds and call finalShipments function for each
shipmentIds.forEach(shipmentId => finalShipments(shipmentId));

// Utility functions formatDate and formatAddress remain the same
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
}

function formatAddress(address) {
    return `${address.streetAddress} ${address.city} ${address.state}`;
}
