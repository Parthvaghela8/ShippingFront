import { WEB_RUN , API_RUN } from './URLCollention.js'

export async function addCustomer(userId) {
    try {
      // Attempt to fetch customer details
      const response = await fetch(`${API_RUN}api/customers/details/${userId}`);
  
      if (!response.ok) {
        if (response.status === 404) {
          // If customer not found, add the customer
          const addCustomerResponse = await fetch(`${API_RUN}api/customers/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
          });
        //   setTimeout(timeoutFunction, 3000);
  
          if (!addCustomerResponse.ok) {
            throw new Error('Failed to add Customer');
          }
        //   else
        //   {
        //      window.location.href = WEB_RUN;
        //   }
  
          const customerData = await addCustomerResponse.json();
          console.log('Add Customer Response Data:', customerData); // Additional logging
  
          if (!customerData || customerData.customerId === undefined) {
            throw new Error('Customer ID not found in add customer response');
          }

  
          const customerId = customerData.customerId;
          console.log('Customer ID:', customerId);
          return customerId;
        } else {
          throw new Error('Network response was not ok');
        }
      }
  
      const customerData = await response.json();
      console.log('Fetch Customer Details Response Data:', customerData); // Additional logging
  
      if (!customerData || customerData.customerId === undefined) {
        throw new Error('Customer ID not found in fetch details response');
      }
  
      const customerId = customerData.customerId;
      console.log('Customer ID:', customerId);
      return customerId;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
  

