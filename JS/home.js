import { checkAndSetToken, parseTokenFromUrl, GitLogin, GitFech } from './login.js';
import { WEB_RUN } from './URLCollention.js'

async function start() {
    const code = await parseTokenFromUrl();

    if (localStorage.getItem('token') && localStorage.getItem('flag') && localStorage.getItem('userEmail')) {
        console.log("Please Redirect Me Baby");
        if (localStorage.getItem('flag') == 0) {

            // login();   
            console.log("customer")

            fetch(`${APIURL}users/getdata`)
            .then((response) => {
              if (!response.ok) {
                // openModal("Failed to add use");
                throw new Error("Failed to add user");
              }
              return response.json();
            })
            .then((data) => {
              // openModal("User Added successfully:");

              
              indexPage();
            })
            .catch((error) => {
              console.error("Error creating employee", error);
            });



            window.location.href = "./JS/costomer.html"
        }
        else {
            // login();
            console.log("shipper")

            window.location.href = "./JS/Shipper.html"
        }
    }
    
    if (code) {
        console.log(code);
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

function createHomePage() {

    
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
    container.appendChild(paragraph2);
    container.appendChild(buttonsDiv);
    container.appendChild(modalDiv);

    container1.appendChild(container);
}

// Call start to initiate the logic
start();
