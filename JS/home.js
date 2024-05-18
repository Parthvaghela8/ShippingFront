import { checkAndSetToken, parseTokenFromUrl, GitLogin, GitFech } from './login.js';
import { WEB_RUN , API_RUN } from './URLCollention.js'
import { addUser } from './createUser.js';
import { addCustomer } from './getCustomer.js';
import { addShipper } from './getShipper.js';

async function addUserAndFetchDetails(email) {
    try {
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

      
      return customerData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  async function addShipperAndFetchDetails(email) {
    try {
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

      
      return shipperData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}

  
  
async function start() {
    const code = await parseTokenFromUrl();


    // Check if the required items are present in localStorage
// if (localStorage.getItem('token') && localStorage.getItem('flag') && localStorage.getItem('userEmail')) {
//     console.log("Please Redirect Me Baby");

//     // Get the email from localStorage
//     const userEmail = localStorage.getItem('userEmail');

//     // Make an API call to get all user details
//     fetch('your_get_all_users_api_endpoint', {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('token'),
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Check if the response contains user details and if the email matches
//         const matchedUser = data.find(user => user.email === userEmail);

//         if (matchedUser) {
//             // Extract userId from the matched user object
//             const userId = matchedUser.userId;
//             console.log("User ID:", userId);

//             // Now you can proceed with redirecting the user based on the userId
//             if (localStorage.getItem('flag') === '0') {
//                 console.log("customer");
//                 window.location.href = "./JS/costomer.html";
//             } else {
//                 console.log("shipper");
//                 window.location.href = "./JS/Shipper.html";
//             }
//         } else {
//             console.log("No user found for the provided email. Adding new user...");

//             // Make an API call to add a new user
//             fetch('your_add_user_api_endpoint', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail
//                     // Add other user details if required
//                 })
//             })
//             .then(response => response.json())
//             .then(newUser => {
//                 // Handle the newly added user, maybe log or use the response in some way
//                 console.log("New user added:", newUser);

//                 // Redirect the user accordingly (you might need to get the userId from the response)
//                 // For now, let's assume you have the userId from the response
//                 const userId = newUser.userId;
//                 // Proceed with redirecting the user
//             })
//             .catch(error => {
//                 console.error("Error adding new user:", error);
//                 // Handle errors that occur during the API call to add a new user
//             });
//         }
//     })
//     .catch(error => {
//         console.error("Error fetching all users:", error);
//         // Handle errors that occur during the API call to get all user details
//     });
// }


    if (localStorage.getItem('token') && localStorage.getItem('flag') && localStorage.getItem('userEmail')) {
        console.log("Please Redirect Me Baby");
        const email = localStorage.getItem('userEmail');
        // const email="123@email.com"
        if (localStorage.getItem('flag') == 0) {

            // login();   
            console.log("customer")

            // Replace 'your-email@example.com' with the email you want to fetch
            

            // Fetch the user data using the email
            addUserAndFetchDetails(email)
            .then(customerId => {
              console.log('customerId:', customerId);
              localStorage.setItem('customerId', customerId);
              window.location.href='./js/costomer.html'
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
              console.log('shipperId:', shipperId);
              localStorage.setItem('shipperId', shipperId);
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
