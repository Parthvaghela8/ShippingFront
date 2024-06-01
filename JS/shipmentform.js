import { createInput } from './addshipments.js';
import { submitForm } from './addshipments.js';
import { createLabel } from './addshipments.js';
import { openModal } from './popup.js';
import { fetchOptions } from "./login.js";

const container = document.getElementById('cards-container');

export function createShipmentForm() {

    container.innerHTML = "";
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML=''
    const filterInputContainer = document.getElementById("filter-input-container");
    filterInputContainer.innerHTML=''
  
    // Create form element
    const form = document.createElement("form");
    form.id = "shipmentForm";
    form.setAttribute("role", "form");
  
  
    const fieldset = document.createElement("fieldset");
  
    // Create legend element for fieldset
    const heading1 = document.createElement("h2");
    heading1.textContent = "Shipment Details";
    heading1.classList.add('shipment-heading');
  
  
    const shipmentDateLabel = document.createElement("label");
    shipmentDateLabel.textContent = "Shipment Date:";
    shipmentDateLabel.setAttribute("for", "shipmentDate");
    const shipmentDateInput = document.createElement("input");
    shipmentDateInput.type = "date";
    shipmentDateInput.id = "shipmentDate";
    shipmentDateInput.name = "shipmentDate";
    shipmentDateInput.required = true;
  
  
    const deliveryDateLabel = document.createElement("label");
    deliveryDateLabel.textContent = "Delivery Date:";
    deliveryDateLabel.setAttribute("for", "deliveryDate");
    const deliveryDateInput = document.createElement("input");
    deliveryDateInput.type = "date";
    deliveryDateInput.id = "deliveryDate";
    deliveryDateInput.name = "deliveryDate";
    deliveryDateInput.required = true;

    shipmentDateInput.addEventListener("change", function() {
      const today = new Date();
      const shipmentDate = new Date(this.value);
      if (shipmentDate < today) {
          openModal("Shipment date must be greater than today");
          this.value = ""; // Clear the input field
      }
  });
  
  deliveryDateInput.addEventListener("change", function() {
      const shipmentDate = new Date(shipmentDateInput.value);
      const deliveryDate = new Date(this.value);
      const threeDaysLater = new Date(shipmentDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // Adding three days in milliseconds
      if (deliveryDate <= shipmentDate || deliveryDate < threeDaysLater) {
          openModal("Delivery date must be at least 3 days greater than shipment date");
          this.value = ""; // Clear the input field
      }
  });
  
  
    const maxBidAmountLabel = document.createElement("label");
    maxBidAmountLabel.textContent = "Max Bid Amount:";
    maxBidAmountLabel.setAttribute("for", "maxBidAmount");
    const maxBidAmountInput = document.createElement("input");
    maxBidAmountInput.type = "number";
    maxBidAmountInput.id = "maxBidAmount";
    maxBidAmountInput.name = "maxBidAmount";
    maxBidAmountInput.required = true;

    const bidEndDateLabel = document.createElement("label");
    bidEndDateLabel.textContent = "Bid End Date And Time:";
    bidEndDateLabel.setAttribute("for", "bidEndDate");
    const bidEndDateInput = document.createElement("input");
    bidEndDateInput.type = "datetime-local"; // Use appropriate type for datetime input
    bidEndDateInput.id = "bidEndDate";
    bidEndDateInput.name = "bidEndDate";
    bidEndDateInput.required = true;
  
    bidEndDateInput.addEventListener("change", function() {
      const today = new Date();
      const shipmentDate = new Date(document.getElementById("shipmentDate").value);
      const bidEndDate = new Date(this.value);
      
      if (bidEndDate <= today) {
          openModal("Bid end date must be greater than today");
          this.value = ""; // Clear the input field
      } else if (bidEndDate >= shipmentDate) {
          openModal("Bid end date must be less than shipment date");
          this.value = ""; // Clear the input field
      }
  });
  const h2UploadImage = createLabel(
    "Upload image",
  );
    // const h2UploadImage = document.createElement("lable");
    // h2UploadImage.textContent = "Upload Image";
  
    const imageUpload = document.createElement("input");
    imageUpload.type = "file";
    imageUpload.id = "imageUpload";
  
    const OriginAddressForm = document.createElement("form");
    OriginAddressForm.id = "OriginAddressForm";
    OriginAddressForm.setAttribute("role", "form");
  
    const originAddressLegend = document.createElement("h4");
    originAddressLegend.textContent = "Origin Address Details";
  
    const originStreetAddressLabel = createLabel(
      "Street Address:",
      "originStreetAddress"
    );
    const originStreetAddressInput = createInput(
      "text",
      "originStreetAddress",
      "originStreetAddress",
      true
    );
  
    const originCityLabel = createLabel("City:", "originCity");
    const originCityInput = createInput("text", "originCity", "originCity", true);
  
    const originStateLabel = createLabel("State:", "originState");
    const originStateInput = createInput(
      "text",
      "originState",
      "originState",
      true
    );
  
    const originPostalCodeLabel = createLabel("Postal Code:", "originPostalCode");
    const originPostalCodeInput = createInput(
      "number",
      "originPostalCode",
      "originPostalCode",
      true
    );
  
    const DestinationAddressForm = document.createElement("form");
    DestinationAddressForm.id = "DestinationAddressForm";
    DestinationAddressForm.setAttribute("role", "form");
  
    const destinationAddressLegend = document.createElement("h4");
    destinationAddressLegend.textContent = "Destination Address Details";
  
    const destinationStreetAddressLabel = createLabel(
      "Street Address:",
      "destinationStreetAddress"
    );
    const destinationStreetAddressInput = createInput(
      "text",
      "destinationStreetAddress",
      "destinationStreetAddress",
      true
    );
  
    const destinationCityLabel = createLabel("City:", "destinationCity");
    const destinationCityInput = createInput(
      "text",
      "destinationCity",
      "destinationCity",
      true
    );
  
    const destinationStateLabel = createLabel("State:", "destinationState");
    const destinationStateInput = createInput(
      "text",
      "destinationState",
      "destinationState",
      true
    );
  
    const destinationPostalCodeLabel = createLabel(
      "Postal Code:",
      "destinationPostalCode"
    );
    const destinationPostalCodeInput = createInput(
      "number",
      "destinationPostalCode",
      "destinationPostalCode",
      true
    );
  
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    descriptionLabel.setAttribute("for", "description");
    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = "description";
    descriptionInput.name = "description";
    descriptionInput.rows = "4";
    descriptionInput.cols = "80";
  
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add('shipment-form-button');
    submitButton.textContent = "Submit";
    submitButton.setAttribute("role", "button");
    submitButton.addEventListener("click", function (event) {
      const form = document.getElementById('shipmentForm');
      if (!form.checkValidity()) {
          // If the form is invalid, prevent the default submit action
          event.preventDefault();
          // Trigger HTML5 form validation UI
          form.reportValidity();
      } else {
          // If the form is valid, proceed with form submission
          submitForm();
          // Prevent the default submit action to avoid page reload
          event.preventDefault();
      }
    });
  
    fieldset.appendChild(heading1);
    fieldset.appendChild(shipmentDateLabel);
    fieldset.appendChild(shipmentDateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(deliveryDateLabel);
    fieldset.appendChild(deliveryDateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(maxBidAmountLabel);
    fieldset.appendChild(maxBidAmountInput);
    fieldset.appendChild(document.createElement("br"));

    fieldset.appendChild(bidEndDateLabel);
    fieldset.appendChild(bidEndDateInput);
    fieldset.appendChild(document.createElement("br"));

    fieldset.appendChild(h2UploadImage);
    fieldset.appendChild(imageUpload);
  
    fieldset.appendChild(originAddressLegend);
    fieldset.appendChild(originStreetAddressLabel);
    fieldset.appendChild(originStreetAddressInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(originCityLabel);
    fieldset.appendChild(originCityInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(originStateLabel);
    fieldset.appendChild(originStateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(originPostalCodeLabel);
    fieldset.appendChild(originPostalCodeInput);
    fieldset.appendChild(document.createElement("br"));
  
    fieldset.appendChild(destinationAddressLegend);
    fieldset.appendChild(destinationStreetAddressLabel);
    fieldset.appendChild(destinationStreetAddressInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(destinationCityLabel);
    fieldset.appendChild(destinationCityInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(destinationStateLabel);
    fieldset.appendChild(destinationStateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(destinationPostalCodeLabel);
    fieldset.appendChild(destinationPostalCodeInput);
    fieldset.appendChild(document.createElement("br"));
  
    fieldset.appendChild(descriptionLabel);
    fieldset.appendChild(descriptionInput);
    fieldset.appendChild(document.createElement("br"));
  
  
  
    form.appendChild(fieldset);
    form.appendChild(submitButton);
  
  
    container.appendChild(form);
    container.appendChild(OriginAddressForm);
    container.appendChild(DestinationAddressForm);
  }