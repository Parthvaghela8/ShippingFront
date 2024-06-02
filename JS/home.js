import { checkAndSetToken, parseTokenFromUrl, GitLogin, GitFech } from './login.js';
import { WEB_RUN , API_RUN } from './URLCollention.js'
import { addUser } from './createUser.js';
import { addCustomer } from './getCustomer.js';
import { addShipper } from './getShipper.js';
import { createCustomerNavbar } from './customerNav.js';
import { createShipperNavbar } from './shipperNav.js';
import { fetchOptions } from "./login.js";

async function addUserAndFetchDetails(email) {
    try {
      openLoader();
      // Attempt to add user and get the userId
      const userId = await addUser(email);
      
      // Ensure userId is defined before proceeding
      if (!userId) {
        throw new Error('User ID is undefined or null');
      }
      localStorage.setItem('userId',userId);
      console.log('Fetched User ID:', userId);
      
      // Proceed to add customer using the fetched userId
     
      const customerData = await addCustomer(userId);

      closeLoader()
      return customerData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  async function addShipperAndFetchDetails(email) {
    try {
      openLoader();
      // Attempt to add user and get the userId
      const userId = await addUser(email);
      
      // Ensure userId is defined before proceeding
      if (!userId) {
        throw new Error('User ID is undefined or null');
      }
      localStorage.setItem('userId', userId);
      console.log('Fetched User ID:', userId);
      
      // Proceed to add shipper using the fetched userId
     
      const shipperData = await addShipper(userId)
      .then(shipperId => {
          // Handle the shipper ID
          console.log('Shipper ID:', shipperId);
          localStorage.setItem('shipperId', shipperId);
          // Proceed with further actions
      })
      .catch(error => {
          // Handle errors
          console.error('Error:', error);
      });

      closeLoader()
      return shipperData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}

export function openLoader() {
  document.getElementById("loader").style.display = "block";
}

// Function to close the loader
export function closeLoader() {
  document.getElementById("loader").style.display = "none";
}


  
  
export async function startCall() {
    const code = await parseTokenFromUrl();

    if (localStorage.getItem('token') && localStorage.getItem('flag') && localStorage.getItem('userEmail')) {
        console.log("Please Redirect Me");
        const email = localStorage.getItem('userEmail');
  
        if (localStorage.getItem('flag') == 0) {

            // login();   
            console.log("customer")

            // Fetch the user data using the email
            addUserAndFetchDetails(email)
            .then(customerId => {
              console.log('customerId:', customerId);
              localStorage.setItem('customerId', customerId);
              console.log(localStorage.getItem('customerId'));
              createCustomerNavbar()
            //   window.location.href='./js/costomer.html'
              // Handle the user ID here
            })
            .catch(error => {
              console.error('Error:', error);
              // Handle errors here
            });;

            // window.location.href = "./JS/costomer.html"
        }
        else {
            // login();
            console.log("shipper")

            addShipperAndFetchDetails(email)
            .then(shipperId => {
            //   console.log('shipperId:', shipperId);
            createShipperNavbar()
             
              // Handle the user ID here
            })
            .catch(error => {
              console.error('Error:', error);
              // Handle errors here
            });;

            // window.location.href = "./JS/Shipper.html"
        }
    }
    
    if (code) {
        console.log(code);
        const currentUrl = new URL(window.location.href);
        localStorage.setItem("aftercodeurl",currentUrl);
    }


    if (code && !localStorage.getItem('token')) {
        await checkAndSetToken();
    }

    if (!code && localStorage.getItem('token')) {
        if(!localStorage.getItem('userEmail'))
            await GitFech();
    }

    if (!code) {
        createHomePage();
        return;
    }

}

export function createHomePage() {

    
    const container1 = document.getElementById('cards-container');
    container1.innerHTML = "";
    const container = document.createElement('div');
    container.classList.add('home-container');

    const paragraph1 = document.createElement('p');
    paragraph1.classList.add('home-para');
    paragraph1.textContent = 'Transport & Logistics Solution';

    const heading = document.createElement('h1');
    heading.classList.add('home-h1');
    heading.innerHTML = '#1st Place to Solve your <span class="home-style">Transportation</span> Problem';

    const paragraph2 = document.createElement('p');
    paragraph2.classList.add('home-para');
    paragraph2.innerHTML = 'Do you want to continue as <span class="home-style">Customer</span> or <span class="home-style">Shipper</span>';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const customerButton = document.createElement('button');
    customerButton.classList.add('button-select');
    customerButton.classList.add('customer');
    customerButton.textContent = 'Customer';

    customerButton.addEventListener("click", function (event) {
        event.preventDefault();
        GitLogin(0);
    });

    const shipperButton = document.createElement('button');
    shipperButton.classList.add('button-select');
    shipperButton.classList.add('shipper');
    shipperButton.textContent = 'Shipper';

    shipperButton.addEventListener("click", function (event) {
        event.preventDefault();
        GitLogin(1);
    });

    const modalDiv = document.createElement('div');
    modalDiv.id = 'myModal';
    modalDiv.classList.add('modal');

    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;';

    const modelInnerDiv = document.createElement('div');
    modelInnerDiv.id = 'model-inner';

    const oldChildDiv = document.createElement('div');
    oldChildDiv.id = 'old-child';

    modalContentDiv.appendChild(closeButton);
    modalContentDiv.appendChild(modelInnerDiv);
    modelInnerDiv.appendChild(oldChildDiv);

    modalDiv.appendChild(modalContentDiv);
if(localStorage.getItem('userEmail')=== null)
    {

    buttonsDiv.appendChild(customerButton);
    buttonsDiv.appendChild(shipperButton);
    }

    container.appendChild(paragraph1);
    container.appendChild(heading);
    if(localStorage.getItem('userEmail')=== null)
      {
    container.appendChild(paragraph2);
      }
    container.appendChild(buttonsDiv);
    container.appendChild(modalDiv);

    container1.appendChild(container);
}

// Call start to initiate the logic
startCall();
