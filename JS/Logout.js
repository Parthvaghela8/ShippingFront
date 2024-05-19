export function logout() {
          
    localStorage.clear();

    // Clear session storage
    sessionStorage.clear();

    alert('Logging out...');

    window.location.href = "http://127.0.0.1:5500/";
}