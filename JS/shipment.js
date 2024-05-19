import { WEB_RUN , API_RUN } from './URLCollention.js'
import { submitBid } from './submitBid.js';

const container = document.getElementById('cards-container');
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function openModal(message) {
    var modelDiv = document.getElementById("model-inner");
    var oldchild = document.getElementById("old-child");
   
    const data = document.createElement("div");
    data.id = "old-child";
    data.textContent = message;
    modelDiv.replaceChild(data, oldchild);
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  };
   
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

export function handleCardClick(shipmentId) {
    // Fetch data for the clicked shipment
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

                // fetch(`${API_RUN}api/bids/save`)
                // const lastBidAmount=bids.length > 0 ? bids[bids.length - 1].bidAmount: 0
                // Display shipment details and last bid
                const lastBidAmount = bids.length > 0 ? bids[bids.length - 1].bidAmount:0;
                console.log(data);
                console.log(bids);
                container.innerHTML = "";
                const card = document.createElement('div');
                card.classList.add('shipment-card-id');

                // Create heading
                const heading = document.createElement('h1');
                heading.textContent = 'Shipment Details';
                container.appendChild(heading);

                // Create shipment ID section
                const shipmentIdDiv = document.createElement('div');
                shipmentIdDiv.classList.add('shipment-id');

                // Create image container
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('imageid');
                const image = document.createElement('img');
                image.src = data.shipment.imageUrl;
                image.alt = 'Uploaded Image';
                image.classList.add('shipment-image-id');
                imageDiv.appendChild(image);
                shipmentIdDiv.appendChild(imageDiv);

                // Create shipment details container
                const shipmentDetailsDiv = document.createElement('div');
                shipmentDetailsDiv.classList.add('shipment-details');
                const pickupDate = document.createElement('p');
                pickupDate.innerHTML = `<span>PickUp Date:</span>${data.shipment.shipmentDate}`;
                shipmentDetailsDiv.appendChild(pickupDate);
                const deliveryDate = document.createElement('p');
                deliveryDate.innerHTML = `<span>Delivery Date:</span>${data.shipment.deliveryDate}`;
                shipmentDetailsDiv.appendChild(deliveryDate);
                const maxBidAmount = document.createElement('p');
                maxBidAmount.innerHTML = `<span>Max Bid Amount:</span>${data.shipment.maxBidAmount}`;
                shipmentDetailsDiv.appendChild(maxBidAmount);
                const pickupAddress = document.createElement('p');
                pickupAddress.innerHTML = `<span>Pickup Address:</span>${data.originAddress.streetAddress} ${data.originAddress.city} ${data.originAddress.state}`;
                shipmentDetailsDiv.appendChild(pickupAddress);
                const deliveryAddress = document.createElement('p');
                deliveryAddress.innerHTML = `<span>Delivery Address:</span>${data.destinationAddress.streetAddress} ${data.destinationAddress.city} ${data.destinationAddress.state}`;
                shipmentDetailsDiv.appendChild(deliveryAddress);
                shipmentIdDiv.appendChild(shipmentDetailsDiv);

                // Create bid details section
                const bidDetailsDiv = document.createElement('div');
                bidDetailsDiv.classList.add('bid-details');
                const lastBid = document.createElement('p');
                lastBid.textContent = `Last Bid: ${bids.length > 0 ? bids[bids.length - 1].bidAmount : 'No bids yet'}`;
                bidDetailsDiv.appendChild(lastBid);
                const newBidHeading = document.createElement('h3');
                newBidHeading.textContent = 'New Bid';
                bidDetailsDiv.appendChild(newBidHeading);
                const bidInput = document.createElement('input');
                bidInput.type = 'number';
                bidInput.id = 'bidAmount';
                bidInput.placeholder = 'Enter Bid Amount';
                bidInput.min = '0';
                bidDetailsDiv.appendChild(bidInput);
                const bidButton = document.createElement('button');
                bidButton.type = 'submit';
                bidButton.textContent = 'Bid';
                const maxbid=data.shipment.maxBidAmount;
                console.log(maxbid)
                console.log(lastBidAmount)
                bidButton.onclick = function () {
                    const bidAmount = parseInt(document.getElementById('bidAmount').value);
                    if (lastBidAmount === 0) {
                        if (bidAmount > 0 && bidAmount < maxbid) {
                            submitBid(data.shipment.shipmentId, bidAmount);
                        } else {
                            openModal("Please place a bid greater than 0.");
                        }
                    }
                    else {
                        if (bidAmount < lastBidAmount) {
                            if (bidAmount > 0) {
                                submitBid(data.shipment.shipmentId, bidAmount);
                            }
                            else {
                                alert("Please place a proper bid")
                            }
                        } else {
                            console.log("hii")
                            openModal("Bid amount must be less than the last bid amount.");
                        }
                    }
                };
                //     if (lastBidAmount==0){
                //         bidButton.disabled=false;
                //     }
                //     else{
                //     if (lastBidAmount <= 0) {
                //         bidButton.disabled = true;
                //     }
                // }
                bidDetailsDiv.appendChild(bidButton);

                // Append bid details to main container
                card.appendChild(shipmentIdDiv);
                card.appendChild(bidDetailsDiv);

                // Append main container to the body or any desired parent element

                container.appendChild(card);
            })
            .catch(error => console.error('Error fetching bids:', error));
    })
    .catch(error => console.error('Error fetching data:', error));
}
