import { WEB_RUN , API_RUN } from './URLCollention.js'
import { handleCardClick } from './shipment.js';
import { updateShipmentStatus } from './updateShipmentStatus.js';

const container = document.getElementById('cards-container');
const apiUrl = `${API_RUN}api/shipments/getdata`;


export function AllShipments() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            container.innerHTML = ""
            const cardContainer = document.createElement('div'); // Create a parent div for all cards
            cardContainer.classList.add('container-card'); // Add a class to the parent div
            const Heading = document.createElement('h1'); // Create a parent div for all cards
            Heading.classList.add('heading');
            Heading.innerHTML = `Shipments`
            data.map(shipment => {
                const card = document.createElement('div');
                card.classList.add('shipment-card');
                // Assuming 'shipment' is available in the current context

                // Create the anchor element
                const anchor = document.createElement('a');
                anchor.href = "#";

                // Create the imagebox div
                const imagebox = document.createElement('div');
                imagebox.classList.add('imagebox');

                // Create the image element
                const image = document.createElement('img');
                image.src = shipment.shipment.imageUrl;
                image.alt = 'Uploaded Image';
                image.width = '460';
                image.height = '345';

                // Append the image to the imagebox
                imagebox.appendChild(image);

                // Create the content div
                const content = document.createElement('div');
                content.classList.add('content');

                // Create span elements for shipment details
                const pickupDateSpan = document.createElement('span');
                pickupDateSpan.textContent = 'PickUp Date:';
                const pickupDate = document.createElement('p');
                pickupDate.appendChild(pickupDateSpan);
                pickupDate.innerHTML += shipment.shipment.shipmentDate;

                const deliveryDateSpan = document.createElement('span');
                deliveryDateSpan.textContent = 'Delivery Date:';
                const deliveryDate = document.createElement('p');
                deliveryDate.appendChild(deliveryDateSpan);
                deliveryDate.innerHTML += shipment.shipment.deliveryDate;

                const maxBidAmountSpan = document.createElement('span');
                maxBidAmountSpan.textContent = 'Max Bid Amount:';
                const maxBidAmount = document.createElement('p');
                maxBidAmount.appendChild(maxBidAmountSpan);
                maxBidAmount.innerHTML += shipment.shipment.maxBidAmount;


                 // Create a timer element
                const timerSpan = document.createElement('span');
                timerSpan.textContent = 'Time Remaining:';
                const timer = document.createElement('p');
                timer.appendChild(timerSpan);
                const timerBtn = document.createElement('span');
                timerBtn.classList.add('timer-btn');
                timer.appendChild(timerBtn);


                // Append paragraphs to content div
                content.appendChild(pickupDate);
                content.appendChild(deliveryDate);
                content.appendChild(maxBidAmount);
                content.appendChild(timer);

                // Append imagebox and content to anchor
                anchor.appendChild(imagebox);
                anchor.appendChild(content);

                // Append anchor to card element
                card.appendChild(anchor);

                const bidEndTime = new Date(shipment.shipment.bidEndTime).getTime();

                console.log(shipment.shipment.bidEndTime);

                async function updateTimer() {
                    const now = new Date().getTime();
                    const distance = bidEndTime - now;
                    // console.log(now,bidEndTime);

                    const status = 'Close'

                    console.log(shipment.shipment.shipmentStatus);

                    if (distance < 0) {
                        if (shipment.shipment.shipmentStatus !== status ) {
                            await updateShipmentStatus(shipment.shipment.shipmentId,status);
                        }
                        timerBtn.innerHTML = "Bidding closed";
                        return;
                    }

                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    timerBtn.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

                    setTimeout(updateTimer, 1000);
                }

                updateTimer();


                card.addEventListener('click', () => {
                    handleCardClick(shipment.shipment.shipmentId);
                });
                // Append the card to the parent div
                cardContainer.appendChild(card);
            });
            container.appendChild(Heading);
            // Append the parent div to the container
            container.appendChild(cardContainer);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// AllShipments()

