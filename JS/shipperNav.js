import { logout } from "./Logout.js";
import { createShipmentForm } from './shipmentform.js';
import { AllShipments } from './index.js';
import { getFinalShipperDetails } from "./FinalShipper.js";
import { fetchOptions } from "./login.js";


export function createShipperNavbar() {
    // Create container div
    const navbarContainer = document.querySelector('.navbar');
    
    // Clear the container if it has any existing children
    while (navbarContainer.firstChild) {
        navbarContainer.removeChild(navbarContainer.firstChild);
    }

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    // Create navbar-logo div
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('navbar-logo');
    // logoDiv.onclick = loadAllShipments;

    // Create logo image
    const logoImg = document.createElement('img');
    logoImg.src = './assets/image/logo.png';
    logoImg.height = '90';
    logoImg.classList.add('logo');
    logoImg.alt = 'Logo';

    // Append logo image to navbar-logo div
    logoDiv.appendChild(logoImg);

    // Create h1 element
    // const h1 = document.createElement('h1');
    // h1.textContent = 'Shipper';
    // h1.style.color = 'aliceblue';

    // Create ul element
    const ul = document.createElement('ul');
    ul.classList.add('navbar-menu');

    // Create list items
    const liAllShipments = document.createElement('li');
    liAllShipments.onclick = AllShipments;
    const aAllShipments = document.createElement('a');
    aAllShipments.textContent = 'All Shipments';
    liAllShipments.appendChild(aAllShipments);

    // const liAddShipments = document.createElement('li');
    // liAddShipments.onclick = loadAddShipments;
    // const aAddShipments = document.createElement('a');
    // aAddShipments.textContent = 'ADD shipments';
    // liAddShipments.appendChild(aAddShipments);

    const liYourShipments = document.createElement('li');
    liYourShipments.onclick = getFinalShipperDetails    ;
    const aYourShipments = document.createElement('a');
    aYourShipments.textContent = 'My Shipments';
    liYourShipments.appendChild(aYourShipments);

    const liLogout = document.createElement('li');
    // liLogout.onclick = logout;
    const aLogout = document.createElement('a');
    aLogout.textContent = 'Logout';
    liLogout.appendChild(aLogout);
    aLogout.onclick = logout;

    // Append list items to ul
    ul.appendChild(liAllShipments);
    // ul.appendChild(liAddShipments);
    ul.appendChild(liYourShipments);
    ul.appendChild(liLogout);

    // Create navbar-toggle div
    const navbarToggle = document.createElement('ul');
    navbarToggle.classList.add('navbar-toggle');

    // Create bars inside navbar-toggle div
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('li');
        bar.classList.add('bar');
        navbarToggle.appendChild(bar);
    }

    // Append logo, h1, ul, and navbar-toggle to container div
    containerDiv.appendChild(logoDiv);
    // containerDiv.appendChild(h1);
    containerDiv.appendChild(ul);
    containerDiv.appendChild(navbarToggle);

    // Append container div to navbarContainer
    
    navbarContainer.appendChild(containerDiv);

    // Add event listener to navbar-toggle
    navbarToggle.addEventListener('click', function () {
        ul.classList.toggle('active');
    });
}

// Call the function to create the shipper navbar
// createShipperNavbar();
