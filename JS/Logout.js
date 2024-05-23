import { WEB_RUN } from "./URLCollention.js";
import { createHomePage, startCall } from "./home.js";

export function logout() {
          
    localStorage.clear();
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML=''
    const filterInputContainer = document.getElementById("filter-input-container");
    filterInputContainer.innerHTML
    // Clear session storage
    sessionStorage.clear();

    alert('Logging out...');

    // window.location.href = WEB_RUN;
    
    const navbarContainer = document.querySelector('.navbar');
    navbarContainer.innerHTML = '';

    createHomePage()

    // startCall();
}