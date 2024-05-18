export function createShippingWarsPage() {
    // Create the document elements
    const html = document.createElement('html');
    html.lang = 'en';

    const head = document.createElement('head');

    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');

    const metaViewport = document.createElement('meta');
    metaViewport.setAttribute('name', 'viewport');
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');

    const title = document.createElement('title');
    title.textContent = 'ShippingWars';

    const linkHomeCss = document.createElement('link');
    linkHomeCss.rel = 'stylesheet';
    linkHomeCss.href = '../CSS/home.css';

    const linkNavbarCss = document.createElement('link');
    linkNavbarCss.rel = 'stylesheet';
    linkNavbarCss.href = '../CSS/navbar.css';

    const linkStyleCss = document.createElement('link');
    linkStyleCss.rel = 'stylesheet';
    linkStyleCss.href = '../CSS/style.css';

    const linkPopupCss = document.createElement('link');
    linkPopupCss.rel = 'stylesheet';
    linkPopupCss.href = '../CSS/popup.css';

    const body = document.createElement('body');

    const nav = document.createElement('nav');
    nav.classList.add('navbar');

    const container = document.createElement('div');
    container.classList.add('container');

    const navbarLogo = document.createElement('div');
    navbarLogo.classList.add('navbar-logo');
    navbarLogo.onclick = loadAllShipments;

    const logoImg = document.createElement('img');
    logoImg.src = '../assets/image/logo.png';
    logoImg.height = '90';
    logoImg.classList.add('logo');
    logoImg.alt = 'Logo';

    const h1 = document.createElement('h1');
    h1.style.color = 'aliceblue';
    h1.textContent = 'Customer';

    const ulNavbarMenu = document.createElement('ul');
    ulNavbarMenu.classList.add('navbar-menu');

    const liAllShipments = document.createElement('li');
    liAllShipments.onclick = loadAllShipments;
    const aAllShipments = document.createElement('a');
    aAllShipments.textContent = 'ALL shipments';
    liAllShipments.appendChild(aAllShipments);

    const liAddShipments = document.createElement('li');
    liAddShipments.onclick = loadAddShipments;
    const aAddShipments = document.createElement('a');
    aAddShipments.textContent = 'ADD shipments';
    liAddShipments.appendChild(aAddShipments);

    const liYourShipments = document.createElement('li');
    liYourShipments.onclick = loadYourShipments;
    const aYourShipments = document.createElement('a');
    aYourShipments.textContent = 'Your Shipments';
    liYourShipments.appendChild(aYourShipments);

    const liLogout = document.createElement('li');
    liLogout.onclick = logout;
    const aLogout = document.createElement('a');
    aLogout.textContent = 'Logout';
    liLogout.appendChild(aLogout);

    const divNavbarToggle = document.createElement('div');
    divNavbarToggle.classList.add('navbar-toggle');

    const divBar1 = document.createElement('div');
    divBar1.classList.add('bar');

    const divBar2 = document.createElement('div');
    divBar2.classList.add('bar');

    const divBar3 = document.createElement('div');
    divBar3.classList.add('bar');

    const divCardsContainer = document.createElement('div');
    divCardsContainer.id = 'cards-container';

    const footer = document.createElement('footer');

    const pFooter = document.createElement('p');
    pFooter.textContent = '\u00A9 2024 ShippingWars. All rights reserved.';

    const scriptAllShipments = document.createElement('script');
    scriptAllShipments.src = './loadAllShipments.js';

    const scriptAddShipments = document.createElement('script');
    scriptAddShipments.src = './loadAddShipments.js';

    const scriptYourShipments = document.createElement('script');
    scriptYourShipments.src = './loadYourShipments.js';

    const scriptLogout = document.createElement('script');
    scriptLogout.src = './logout.js';

    // Append elements to build the DOM structure
    nav.appendChild(container);
    container.appendChild(navbarLogo);
    navbarLogo.appendChild(logoImg);
    container.appendChild(h1);
    container.appendChild(ulNavbarMenu);
    ulNavbarMenu.appendChild(liAllShipments);
    ulNavbarMenu.appendChild(liAddShipments);
    ulNavbarMenu.appendChild(liYourShipments);
    ulNavbarMenu.appendChild(liLogout);
    container.appendChild(divNavbarToggle);
    divNavbarToggle.appendChild(divBar1);
    divNavbarToggle.appendChild(divBar2);
    divNavbarToggle.appendChild(divBar3);

    body.appendChild(nav);
    body.appendChild(divCardsContainer);
    body.appendChild(footer);

    footer.appendChild(pFooter);

    head.appendChild(metaCharset);
    head.appendChild(metaViewport);
    head.appendChild(title);
    head.appendChild(linkHomeCss);
    head.appendChild(linkNavbarCss);
    head.appendChild(linkStyleCss);
    head.appendChild(linkPopupCss);

    html
}