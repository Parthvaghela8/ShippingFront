const URLS = Object.freeze({ 
    API_LOCAL: `http://127.0.0.1:8080/`, 
    API_LIVE: `https://54.220.202.86:8080/`, 
    WEB_LOCAL: `http://127.0.0.1:5500/`, 
    WEB_LIVE: `https://54.220.202.86:3000/`
  });

// export default URLS.API_LOCAL;
export const API_RUN = URLS.API_LOCAL;
export const WEB_RUN = URLS.WEB_LOCAL;