import { WEB_RUN, API_RUN } from './URLCollention.js'
import { handleCardClick } from './shipment.js';
import { deleteShipment } from './deleteShipment.js';
import { deleteBids } from './deleteBids.js';
import { closeLoader, openLoader } from './home.js';
import { fetchOptions } from "./login.js";

const container = document.getElementById('cards-container');
const apiUrl = `${API_RUN}api/shipments/getdata`;


export function YourShipments() {
    openLoader()
    container.innerHTML = ""
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = ''
    const filterInputContainer = document.getElementById("filter-input-container");
    filterInputContainer.innerHTML = ''
    fetch(apiUrl, fetchOptions)
        .then(response => response.json())
        .then(data => {


            const cardContainer = document.createElement('div'); // Create a parent div for all cards
            cardContainer.classList.add('container-card'); // Add a class to the parent div
            const Heading = document.createElement('h1'); // Create a parent div for all cards
            Heading.classList.add('heading');
            Heading.innerHTML = `Your Shipments`
            data.map(shipment => {
                // debugger;
                if (shipment.customer.customerId == localStorage.getItem('customerId')) {
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


                    var shipmentdt = shipment.shipment.shipmentDate;

                    // Create a new Date object using the timestamp
                    var date = new Date(shipmentdt);

                    // Extract year, month, and day
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1; // Month starts from 0, so add 1
                    var day = date.getDate();

                    // Format the date as desired (e.g., DD-MM-YYYY)
                    var shipdt = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year;

                    var deliverdt = shipment.shipment.deliveryDate;

                    // Create a new Date object using the timestamp
                    var date = new Date(deliverdt);

                    // Extract year, month, and day
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1; // Month starts from 0, so add 1
                    var day = date.getDate();

                    // Format the date as desired (e.g., DD-MM-YYYY)
                    var devdt = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year;

                    // Create span elements for shipment details
                    const pickupDateSpan = document.createElement('span');
                    pickupDateSpan.textContent = 'PickUp Date:';
                    const pickupDate = document.createElement('p');
                    pickupDate.appendChild(pickupDateSpan);
                    pickupDate.innerHTML += shipdt;

                    const deliveryDateSpan = document.createElement('span');
                    deliveryDateSpan.textContent = 'Delivery Date:';
                    const deliveryDate = document.createElement('p');
                    deliveryDate.appendChild(deliveryDateSpan);
                    deliveryDate.innerHTML += devdt;

                    const maxBidAmountSpan = document.createElement('span');
                    maxBidAmountSpan.textContent = 'Max Bid Amount:';
                    const maxBidAmount = document.createElement('p');
                    maxBidAmount.appendChild(maxBidAmountSpan);
                    maxBidAmount.innerHTML += shipment.shipment.maxBidAmount;
                    content.appendChild(pickupDate);
                    content.appendChild(deliveryDate);
                    content.appendChild(maxBidAmount);

                    if (shipment.shipment.shipmentStatus !== 'Close') {
                        ;

                        const deleteButton = document.createElement("button");
                        deleteButton.type = "submit";
                        deleteButton.textContent = "Delete";
                        deleteButton.setAttribute("role", "button");

                        deleteButton.onclick = () => {
                            deleteBids(shipment.shipment.shipmentId)
                        };
                        content.appendChild(deleteButton)
                    }
                    else {
                        const BidClosed = document.createElement('span');
                        BidClosed.textContent = 'Bid Closed';
                        content.appendChild(BidClosed)
                    }

                    // Append imagebox and content to anchor
                    anchor.appendChild(imagebox);
                    anchor.appendChild(content);

                    // Append anchor to card element
                    card.appendChild(anchor);


                    card.addEventListener('click', () => {
                        handleCardClick(shipment.shipment.shipmentId);
                    });
                    // Append the card to the parent div
                    cardContainer.appendChild(card);
                    closeLoader()
                }

            });
            container.appendChild(Heading);
            // Append the parent div to the container
            container.appendChild(cardContainer);
            closeLoader()
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            closeLoader()
        });
}

// AllShipments()

