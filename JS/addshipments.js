// Function to create shipment form
import { WEB_RUN, API_RUN } from './URLCollention.js'
import { openModal } from './popup.js';


export function submitForm() {
  return new Promise((resolve, reject) => {
    uploadFile()
      .then((image) => {
        // Log the image data
        console.log("Image URL:", image);

        // Extract form data
        const shipmentDate = new Date(
          document.getElementById("shipmentDate").value
        ).toISOString();
        const deliveryDate = new Date(
          document.getElementById("deliveryDate").value
        ).toISOString();
        const maxBidAmount = parseFloat(
          document.getElementById("maxBidAmount").value
        ).toFixed(2);

        const currentDate = new Date().toISOString();

        // const bidEndDate = new Date(
        //   document.getElementById("bidEndDate").value
        // )

        // Get the selected bid end datetime value from the input field
        const bidEndDateValue = document.getElementById("bidEndDate").value;
        const bidEndDate = new Date(bidEndDateValue);
        const timezoneOffset = bidEndDate.getTimezoneOffset() * 60000; // offset in milliseconds
        const adjustedBidEndDate = new Date(bidEndDate.getTime() - timezoneOffset).toISOString();

        // Use isoFormattedDateTime in your formData object


        const originPostalCodeInput =
          document.getElementById("originPostalCode");
        const destinationPostalCodeInput = document.getElementById(
          "destinationPostalCode"
        );

        const desc = document.getElementById(
          "description"
        ).value;


        const originPostalCode = parseInt(originPostalCodeInput.value, 10);
        const destinationPostalCode = parseInt(
          destinationPostalCodeInput.value,
          10
        );


        if (isNaN(originPostalCode) || isNaN(destinationPostalCode)) {
          console.error("Error: Invalid postal code");
          reject("Invalid postal code");
          return;
        }

        const formData = {
          shipmentDate: shipmentDate,
          deliveryDate: deliveryDate,
          maxBidAmount: maxBidAmount,
          bidStartTime: currentDate,
          bidEndTime: adjustedBidEndDate,
          imageUrl: image,
          categoryId: 1,
          description: desc,
          shipmentStatus: "open",
          customerId: localStorage.getItem('customerId'),
          originAddressId: "",
          destinationAddressId: "",
        };

        // Submit origin address data
        submitAddress(
          "OriginAddressForm",
          "originStreetAddress",
          "originCity",
          "originState",
          "originPostalCode"
        )
          .then((originAddressId) => {
            formData.originAddressId = originAddressId;


            submitAddress(
              "DestinationAddressForm",
              "destinationStreetAddress",
              "destinationCity",
              "destinationState",
              "destinationPostalCode"
            )
              .then((destinationAddressId) => {
                formData.destinationAddressId = destinationAddressId;

                fetch(`${API_RUN}api/shipments/save`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
                })
                  .then(response => {
                    if (response.ok) {
                      openModal('Shipment created successfully!');
                      resolve();
                    } else {
                      throw new Error('Error creating shipment');
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    openModal('Error creating shipment');
                    reject(error);
                  });
              })
              .catch((error) => {
                console.error("Error:", error);
                reject(error);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        openModal("An error occurred while submitting the form");
        reject(error);
      });
  });
}


export function createLabel(text, htmlFor) {
  const label = document.createElement("label");
  label.textContent = text;
  label.setAttribute("for", htmlFor);
  return label;
}


export function createInput(type, id, name, required) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = name;
  if (required) {
    input.required = true;
  }
  return input;
}


export function uploadFile() {
  return new Promise((resolve, reject) => {
    var fileInput = document.getElementById("imageUpload");
    var file = fileInput.files[0];
    if (!file) {
      document.getElementById("uploadStatus").innerText =
        "Please select a file";
      reject("No file selected");
      return;
    }

    var formData = new FormData();
    formData.append("file", file);

    fetch(`${API_RUN}api/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        return response.text();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
}
export function submitAddress(form, address, city, state, postalCode) {
  return new Promise((resolve, reject) => {
    const formData = new FormData(document.getElementById(form));

    const addressData = {
      streetAddress: document.getElementById(address)?.value,
      city: document.getElementById(city)?.value,
      state: document.getElementById(state)?.value,
      postalCode: parseInt(document.getElementById(postalCode)?.value),
    };
    console.log(addressData);

    const jsonData = JSON.stringify(addressData);


    console.log(jsonData);


    fetch(`${API_RUN}api/addresses/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((savedAddressData) => {

        resolve(savedAddressData);
      })
      .catch((error) => {

        console.error("Error:", error);
        reject(error);
      });
  });
}