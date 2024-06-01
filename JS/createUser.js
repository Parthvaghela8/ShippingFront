import { API_RUN } from './URLCollention.js';
import { fetchOptions } from "./login.js";

export async function addUser(email) {
  try {
    const response = await fetch(`${API_RUN}api/users/email/${email}`,fetchOptions);

    if (!response.ok) {
      if (response.status === 404) {
        // If user not found, add the user
        const addUserResponse = await fetch(`${API_RUN}api/users/save`, {
          method: 'POST',
          headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });

        if (!addUserResponse.ok) {
          throw new Error('Failed to add user');
        }

        const userData = await addUserResponse.json();
        const userId = userData.userId; // Ensure userData contains userId

        console.log('User ID:', userId);
        return userId;
      } else {
        throw new Error('Network response was not ok');
      }
    }

    const userData = await response.json();

    if (!userData || userData.userId === undefined) {
      throw new Error('User ID not found in response');
    }

    const userId = userData.userId;
    console.log('User ID:', userId);
    return userId;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

