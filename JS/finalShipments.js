import { WEB_RUN , API_RUN } from './URLCollention.js'

const container = document.getElementById('cards-container');

export function finalShipments(shipmentId) {
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
                // container.innerHTML = "";
                const card = document.createElement('div');
                card.classList.add('shipment-card-id');

                // Create heading
                // const heading = document.createElement('h1');
                // heading.textContent = 'Shipment Details';
                // container.appendChild(heading);

                // Create shipment ID section
                const shipmentIdDiv = document.createElement('div');
                shipmentIdDiv.classList.add('shipment-id');

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
                // Input timestamp
                var shipmentdt = data.shipment.shipmentDate;

                // Create a new Date object using the timestamp
                var date = new Date(shipmentdt);

                // Extract year, month, and day
                var year = date.getFullYear();
                var month = date.getMonth() + 1; // Month starts from 0, so add 1
                var day = date.getDate();

                // Format the date as desired (e.g., DD-MM-YYYY)
                var shipdt = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year;

                var deliverdt = data.shipment.deliveryDate;

                // Create a new Date object using the timestamp
                var date = new Date(deliverdt);

                // Extract year, month, and day
                var year = date.getFullYear();
                var month = date.getMonth() + 1; // Month starts from 0, so add 1
                var day = date.getDate();

                // Format the date as desired (e.g., DD-MM-YYYY)
                var devdt = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year;

                // Output the simple date
                // console.log(simpleDate);

                const shipmentDetailsDiv = document.createElement('div');
                shipmentDetailsDiv.classList.add('shipment-details');
                const pickupDate = document.createElement('p');
                pickupDate.innerHTML = `<span>PickUp Date:</span>${shipdt}`;
                shipmentDetailsDiv.appendChild(pickupDate);
                const deliveryDate = document.createElement('p');
                deliveryDate.innerHTML = `<span>Delivery Date:</span>${devdt}`;
                shipmentDetailsDiv.appendChild(deliveryDate);
                const maxBidAmount = document.createElement('p');
                maxBidAmount.innerHTML = `<span>Your Bid:</span>${lastBidAmount}`;
                shipmentDetailsDiv.appendChild(maxBidAmount);
                const pickupAddress = document.createElement('p');
                pickupAddress.innerHTML = `<span>Pickup Address:</span>${data.originAddress.streetAddress} ${data.originAddress.city} ${data.originAddress.state}`;
                shipmentDetailsDiv.appendChild(pickupAddress);
                const deliveryAddress = document.createElement('p');
                deliveryAddress.innerHTML = `<span>Delivery Address:</span>${data.destinationAddress.streetAddress} ${data.destinationAddress.city} ${data.destinationAddress.state}`;
                shipmentDetailsDiv.appendChild(deliveryAddress);
                shipmentIdDiv.appendChild(shipmentDetailsDiv);

                // Create bid details section
            //     const bidDetailsDiv = document.createElement('div');
            //     bidDetailsDiv.classList.add('bid-details');
            //     const lastBid = document.createElement('p');
                // lastBid.textContent = `Last Bid: ${bids.length > 0 ? bids[bids.length - 1].bidAmount : 'No bids yet'}`;
            //     bidDetailsDiv.appendChild(lastBid);

            //     console.log(localStorage.getItem('shipperId'));
            //     if(localStorage.getItem('shipperId')!==null){

            //     const newBidHeading = document.createElement('h3');
            //     newBidHeading.textContent = 'New Bid';
            //     bidDetailsDiv.appendChild(newBidHeading);
            //     const bidInput = document.createElement('input');
            //     bidInput.type = 'number';
            //     bidInput.id = 'bidAmount';
            //     bidInput.placeholder = 'Enter Bid Amount';
            //     bidInput.min = '0';
            //     bidDetailsDiv.appendChild(bidInput);
            //     const bidButton = document.createElement('button');
            //     bidButton.type = 'submit';
            //     bidButton.textContent = 'Bid';
                
            //     const maxbid=data.shipment.maxBidAmount;
            //     console.log(maxbid)
            //     console.log(lastBidAmount)
            //     bidButton.onclick = function () {
            //         const bidAmount = parseInt(document.getElementById('bidAmount').value);
            //         if (lastBidAmount === 0) {
            //             if (bidAmount > 0 && bidAmount < maxbid) {
            //                 submitBid(data.shipment.shipmentId, bidAmount);
            //             } else {
            //                 openModal("Please place a bid greater than 0 and less than Maxbid Amount.");
            //             }   
            //         }
            //         else {
            //             if (bidAmount < lastBidAmount) {
            //                 if (bidAmount > 0) {
            //                     submitBid(data.shipment.shipmentId, bidAmount);
            //                 }
            //                 else {
            //                     alert("Please place a proper bid")
            //                 }
            //             } else {
            //                 console.log("hii")
            //                 openModal("Bid amount must be less than the last bid amount.");
            //             }
            //         }
            //     };
            //     //     if (lastBidAmount==0){
            //     //         bidButton.disabled=false;
            //     //     }
            //     //     else{
            //     //     if (lastBidAmount <= 0) {
            //     //         bidButton.disabled = true;
            //     //     }
            //     // }
            //     bidDetailsDiv.appendChild(bidButton);
            // }

                // Append bid details to main container
                card.appendChild(shipmentIdDiv);
                // card.appendChild(bidDetailsDiv);

                // Append main container to the body or any desired parent element

                container.appendChild(card);
            })
            .catch(error => console.error('Error fetching bids:', error));
    })
    .catch(error => console.error('Error fetching data:', error));
}