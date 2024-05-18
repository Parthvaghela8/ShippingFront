import { WEB_RUN , API_RUN } from './URLCollention.js'

export async function addShipper(userId) {
    try {
      // Attempt to fetch shipper details
      const response = await fetch(`${API_RUN}api/shippers/details/${userId}`);
  
      if (!response.ok) {
        if (response.status === 404) {
          // If shipper not found, add the shipper
          const addShipperResponse = await fetch(`${API_RUN}api/shippers/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
          });
        //   setTimeout(timeoutFunction, 3000);
  
          if (!addShipperResponse.ok) {
            throw new Error('Failed to add Shipper');
          }
        //   else
        //   {
        //      window.location.href = WEB_RUN;
        //   }
  
          const shipperData = await addShipperResponse.json();
          console.log('Add Shipper Response Data:', shipperData); // Additional logging
  
          if (!shipperData || shipperData.shipperId === undefined) {
            throw new Error('Shipper ID not found in add shipper response');
          }

  
          const shipperId = shipperData.shipperId;
          console.log('Shipper ID:', shipperId);
          return shipperId;
        } else {
          throw new Error('Network response was not ok');
        }
      }
  
      const shipperData = await response.json();
      console.log('Fetch Shipper Details Response Data:', shipperData); // Additional logging
  
      if (!shipperData || shipperData.shipperId === undefined) {
        throw new Error('Shipper ID not found in fetch details response');
      }
  
      const shipperId = shipperData.shipperId;
      console.log('Shipper ID:', shipperId);
      return shipperId;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
}
