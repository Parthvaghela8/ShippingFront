import { API_RUN, WEB_RUN } from './URLCollention.js'

async function getTokenFromCode(code) {
    const url = `${API_RUN}auth/code?code=${code}&flag=${localStorage.getItem('flag')}`;
    localStorage.setItem("gettokenurl",url);
    let Token = await fetch(url)
        .then((response) => response.text())
        .catch((error) => {
            console.error("Error fetching neighbourhood data:", error);
        });
    return Token;
}

export async function parseTokenFromUrl() {
    const currentUrl = new URL(window.location.href);

    const urlParams = currentUrl.searchParams;
    const code = urlParams.get("code");

    return code;
}


const fetchOptions = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
};


export async function checkAndSetToken() {
    const code = await parseTokenFromUrl();
    if (!localStorage.getItem("token")) {
        console.log("Code", code);
        const token = await getTokenFromCode(code);
        console.log("Token", token);
        if (!token.includes("error")) {
            localStorage.setItem("token", token);
        }
        window.location.href = WEB_RUN;
    }
}

export function GitLogin(flag) {
    const clientId = "Ov23liMIUo0ytzmbjhT2";
    const redirectUri = `${WEB_RUN}`;
    const scope = `user:email`

    // Construct Google OAuth URL with OpenID Connect for ID token
    const authUrl = `https://github.com/login/oauth/select_account?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    localStorage.setItem("flag", flag);

    localStorage.setItem("authurl",authUrl);

    console.log(authUrl);

    // Redirect user to Google OAuth URL
    window.location.href = authUrl;
}

export async function GitFech() {

    let useremail;

    fetch(`https://api.github.com/user/emails`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => {
            // Check if the response status is OK (status code 200)
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // Log the entire response to debug
            console.log("Full response data:", data);

            // Check if data is an array and has at least one element
            if (Array.isArray(data) && data.length > 0) {
                // Extract the first email from the response
                useremail = data[0].email;

                // Store the first email in localStorage
                // localStorage.setItem("flag",flag)
                localStorage.removeItem("userEmail");
                localStorage.setItem("userEmail", useremail);
                console.log("First email stored in localStorage:", useremail);
                
                window.location.href = WEB_RUN;
            } else {
                console.error("No emails found in the response or response is not an array");
            }
        })
        .catch((error) => {
            console.error("Error fetching emails:", error);
        });
    }

    // let saved = false;
    // if (localStorage.getItem("username")) {
    //     const Employees = await GetAllEmployee();
    //     Employees.map((emp) => {
    //         if (localStorage.getItem("username") === emp.employeeName) {
    //             saved = true;
    //         }
    //     });
    // }
    // if (!saved) {
    //     const requestBody = {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             employeeName: localStorage.getItem("username"),
    //             employeeReportsTo: 0,
    //         }),
    //     };

    // // Send the POST request
    // fetch(`${APIURL}employees`, requestBody)
    //     .then((response) => {
    //         if (!response.ok) {
    //             // openModal("Failed to add use");
    //             throw new Error("Failed to add user");
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         // openModal("User Added successfully:");
    //         loadEventsPage();
    //     })
    //     .catch((error) => {
    //         console.error("Error creating employee", error);
    //     });
    // }
// }



// Call the function
// checkAndSetToken();
