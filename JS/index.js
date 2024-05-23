import { WEB_RUN, API_RUN } from "./URLCollention.js";
import { closeLoader, openLoader } from "./home.js";
import { handleCardClick } from "./shipment.js";
import { updateShipmentStatus } from "./updateShipmentStatus.js";

const container = document.getElementById("cards-container");
const apiUrl = `${API_RUN}api/shipments/getdata`;

let data; // Declare data variable here

export function AllShipments() {
  openLoader();
  container.innerHTML = "";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseData) => { // Rename data variable to avoid conflict
      data = responseData; // Assign data to the variable declared outside
      console.log(data);

      const cardContainer = document.createElement("div"); // Create a parent div for all cards
      cardContainer.classList.add("container-card"); // Add a class to the parent div
      const Heading = document.createElement("h1"); // Create a parent div for all cards
      Heading.classList.add("heading");
      Heading.innerHTML = `Shipments`;


      const filterSelect = document.createElement("select");
      filterSelect.id = "filter-select";
      filterSelect.innerHTML = `
    <option value="shipmentDate">Shipment Date</option>
    <option value="deliveryDate">Delivery Date</option>
    <option value="maxBidAmount">Max Bid Amount</option>
`;

filterSelect.addEventListener("change", function () {
    const selectedValue = filterSelect.value;
    const filterInputContainer = document.getElementById("filter-input-container");
    filterInputContainer.innerHTML = ""; // Clear previous input elements
  
    // Create the appropriate input element based on the selected value
    if (selectedValue === "maxBidAmount") {
      const filterInput = document.createElement("input");
      filterInput.id = "filter-input";
      filterInput.type = "number";
      filterInput.placeholder = "Enter max bid amount";
      filterInputContainer.appendChild(filterInput);
    } else {
      const filterInput = document.createElement("input");
      filterInput.id = "filter-input";
      filterInput.type = "date"; // Assuming other options are for dates
      filterInputContainer.appendChild(filterInput);
    }
  });
  

      const applyFilterBtn = document.createElement("button");
      applyFilterBtn.textContent = "Apply Filter";
    //   debugger
      applyFilterBtn.addEventListener("click", function () {
        const filterInput=document.getElementById("filter-input")
        const selectedValue = filterSelect.value;
        const filterValue = selectedValue === "shipmentDate" || selectedValue === "deliveryDate" 
            ? filterInput.value // Use text input for date filter options
            : parseInt(filterInput.value); 
            console.log(filterInput.value);// Convert input value to number for amount filter option
        filterShipments(selectedValue, filterValue);
    });
    
      // Append filter UI elements to a container element
      const filterContainer = document.getElementById("filter-container");
      filterContainer.innerHTML=''
      filterContainer.appendChild(filterSelect);
    //   filterContainer.appendChild(filterInput);
      filterContainer.appendChild(applyFilterBtn);

      data.map((shipment) => {
        if (shipment.shipment.shipmentStatus !== "Close") {
          const card = document.createElement("div");
          card.classList.add("shipment-card");
          // Assuming 'shipment' is available in the current context

          // Create the anchor element
          const anchor = document.createElement("a");
          anchor.href = "#";

          // Create the imagebox div
          const imagebox = document.createElement("div");
          imagebox.classList.add("imagebox");

          // Create the image element
          const image = document.createElement("img");
          image.src = shipment.shipment.imageUrl;
          image.alt = "Uploaded Image";
          image.width = "460";
          image.height = "345";

          // Append the image to the imagebox
          imagebox.appendChild(image);

          // Create the content div
          const content = document.createElement("div");
          content.classList.add("content");

          /// Input timestamp
          var shipmentdt = shipment.shipment.shipmentDate;

          // Create a new Date object using the timestamp
          var date = new Date(shipmentdt);

          // Extract year, month, and day
          var year = date.getFullYear();
          var month = date.getMonth() + 1; // Month starts from 0, so add 1
          var day = date.getDate();

          // Format the date as desired (e.g., DD-MM-YYYY)
          var shipdt =
            (day < 10 ? "0" + day : day) +
            "-" +
            (month < 10 ? "0" + month : month) +
            "-" +
            year;

          var deliverdt = shipment.shipment.deliveryDate;

          // Create a new Date object using the timestamp
          var date = new Date(deliverdt);

          // Extract year, month, and day
          var year = date.getFullYear();
          var month = date.getMonth() + 1; // Month starts from 0, so add 1
          var day = date.getDate();

          // Format the date as desired (e.g., DD-MM-YYYY)
          var devdt =
            (day < 10 ? "0" + day : day) +
            "-" +
            (month < 10 ? "0" + month : month) +
            "-" +
            year;

          // Create span elements for shipment details
          const pickupDateSpan = document.createElement("span");
          pickupDateSpan.textContent = "PickUp Date:";
          const pickupDate = document.createElement("p");
          pickupDate.appendChild(pickupDateSpan);
          pickupDate.innerHTML += shipdt;

          const deliveryDateSpan = document.createElement("span");
          deliveryDateSpan.textContent = "Delivery Date:";
          const deliveryDate = document.createElement("p");
          deliveryDate.appendChild(deliveryDateSpan);
          deliveryDate.innerHTML += devdt;

          const maxBidAmountSpan = document.createElement("span");
          maxBidAmountSpan.textContent = "Max Bid Amount:";
          const maxBidAmount = document.createElement("p");
          maxBidAmount.appendChild(maxBidAmountSpan);
          maxBidAmount.innerHTML += shipment.shipment.maxBidAmount;

          // Create a timer element
          const timerSpan = document.createElement("span");
          timerSpan.textContent = "Time Remaining:";
          const timer = document.createElement("p");
          timer.appendChild(timerSpan);
          const timerBtn = document.createElement("span");
          timerBtn.classList.add("timer-btn");
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

            const status = "Close";

            // console.log(shipment.shipment.shipmentStatus);

            if (distance < 0) {
              if (shipment.shipment.shipmentStatus !== status) {
                await updateShipmentStatus(
                  shipment.shipment.shipmentId,
                  status
                );
              }
              timerBtn.innerHTML = "Bidding closed";
              return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerBtn.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            setTimeout(updateTimer, 1000);
          }

          updateTimer();

          card.addEventListener("click", () => {
            handleCardClick(shipment.shipment.shipmentId);
          });
          // Append the card to the parent div
          closeLoader();
          cardContainer.appendChild(card);
        }
      });
      container.appendChild(Heading);
      // Append the parent div to the container
      container.appendChild(cardContainer);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  // Filter UI elements
  const filterSelect = document.getElementById("filter-select");
  const filterDateInput = document.getElementById("filter-date");
  const filterAmountInput = document.getElementById("filter-amount");
//   const applyFilterBtn = document.getElementById("apply-filter");

  filterSelect.addEventListener("change", function () {
    const selectedValue = filterSelect.value;
    if (selectedValue === "shipmentDate" || selectedValue === "deliveryDate") {
      filterDateInput.style.display = "inline-block";
      filterAmountInput.style.display = "none";
    } else if (selectedValue === "maxBidAmount") {
      filterDateInput.style.display = "none";
      filterAmountInput.style.display = "inline-block";
    }
  });


});

function filterShipments(filterBy, filterValue) {
    // debugger;
    // Convert filterValue to date-time local format
    const filterDate = new Date(filterValue).toISOString().slice(0, 16);

    const filteredData = data.filter((shipment) => {
        if (filterBy === "shipmentDate") {
            const shipmentDate = new Date(shipment.shipment.shipmentDate).toISOString().slice(0, 16);
            return shipmentDate >= filterDate; // Filter shipments with dates greater than or equal to filterDate
        } else if (filterBy === "deliveryDate") {
            const deliveryDate = new Date(shipment.shipment.deliveryDate).toISOString().slice(0, 16);
            return deliveryDate >= filterDate; // Filter shipments with dates greater than or equal to filterDate
        } else if (filterBy === "maxBidAmount") {
            return shipment.shipment.maxBidAmount >= parseInt(filterValue); // Filter shipments with max bid amount greater than or equal to filterValue
        }
    });

    renderFilteredData(filteredData);
}


function renderFilteredData(filteredData) {
  // Clear existing data
  container.innerHTML = "";
  const cardContainer = document.createElement("div"); // Create a parent div for all cards
  cardContainer.classList.add("container-card");
  // Render filtered data
  filteredData.forEach((shipment) => {
    const card = document.createElement("div");
    card.classList.add("shipment-card");

    // Create the anchor element
    const anchor = document.createElement("a");
    anchor.href = "#";

    // Create the imagebox div
    const imagebox = document.createElement("div");
    imagebox.classList.add("imagebox");

    // Create the image element
    const image = document.createElement("img");
    image.src = shipment.shipment.imageUrl;
    image.alt = "Uploaded Image";
    image.width = "460";
    image.height = "345";

    // Append the image to the imagebox
    imagebox.appendChild(image);

    // Create the content div
    const content = document.createElement("div");
    content.classList.add("content");

    
    // Create span elements for shipment details
    const pickupDateSpan = document.createElement("span");
    pickupDateSpan.textContent = "PickUp Date:";
    const pickupDate = document.createElement("p");
    pickupDate.appendChild(pickupDateSpan);
    pickupDate.innerHTML += shipment.shipment.shipmentDate;

    const deliveryDateSpan = document.createElement("span");
    deliveryDateSpan.textContent = "Delivery Date:";
    const deliveryDate = document.createElement("p");
    deliveryDate.appendChild(deliveryDateSpan);
    deliveryDate.innerHTML += shipment.shipment.deliveryDate;

    const maxBidAmountSpan = document.createElement("span");
    maxBidAmountSpan.textContent = "Max Bid Amount:";
    const maxBidAmount = document.createElement("p");
    maxBidAmount.appendChild(maxBidAmountSpan);
    maxBidAmount.innerHTML += shipment.shipment.maxBidAmount;

    // Create a timer element
    const timerSpan = document.createElement("span");
    timerSpan.textContent = `Bid Status: ${shipment.shipment.shipmentStatus} `;
    const timer = document.createElement("p");
    timer.appendChild(timerSpan);
    const timerBtn = document.createElement("span");
    timerBtn.classList.add("timer-btn");
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

    // Append the card to the parent div
    cardContainer.appendChild(card);
    container.append(cardContainer);
  });
}

// AllShipments()
