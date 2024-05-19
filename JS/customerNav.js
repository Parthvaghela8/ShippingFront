import { logout } from './Logout.js';

export function createCustomerNavbar() {
    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    // Create navbar-logo div
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('navbar-logo');
    // logoDiv.onclick = AllShipments;

    // Create logo image
    const logoImg = document.createElement('img');
    logoImg.src = './assets/image/logo.png';
    logoImg.height = '90';
    logoImg.classList.add('logo');
    logoImg.alt = '';

    // Append logo image to navbar-logo div
    logoDiv.appendChild(logoImg);

    // Create ul element
    const ul = document.createElement('ul');
    ul.classList.add('navbar-menu');

    // Create list items
    const liLogin = document.createElement('li');
    // liLogin.onclick = checkAndSetToken;
    

    const liHome = document.createElement('li');
    // liHome.onclick = createHomePage;
    const aHome = document.createElement('a');
    aHome.textContent = 'Home';
    liHome.appendChild(aHome);

    const liShowShipments = document.createElement('li');
    // liShowShipments.onclick = AllShipments;
    const aShowShipments = document.createElement('a');
    aShowShipments.textContent = 'Show Shipments';
    liShowShipments.appendChild(aShowShipments);

    const liAddShipments = document.createElement('li');
    // liAddShipments.onclick = createShipmentForm;
    const aAddShipments = document.createElement('a');
    aAddShipments.textContent = 'Add Shipments';
    liAddShipments.appendChild(aAddShipments);
// debugger;
    const aLogin = document.createElement('a');
    aLogin.textContent = 'Logout';
    liLogin.appendChild(aLogin);
    aLogin.onclick = logout;

    // Append list items to ul
    
    ul.appendChild(liHome);
    ul.appendChild(liShowShipments);
    ul.appendChild(liAddShipments);
    ul.appendChild(liLogin);

    // Create navbar-toggle div
    const navbarToggle = document.createElement('div');
    navbarToggle.classList.add('navbar-toggle');

    // Create bars inside navbar-toggle div
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        navbarToggle.appendChild(bar);
    }

    // Append logo, ul, and navbar-toggle to container div
    containerDiv.appendChild(logoDiv);
    containerDiv.appendChild(ul);
    containerDiv.appendChild(navbarToggle);

    // Append container div to navbarContainer
    const navbarContainer = document.querySelector('.navbar');
    navbarContainer.appendChild(containerDiv);
}

// Call the function to create the navbar
// createNavbar();
