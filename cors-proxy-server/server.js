// // server.js
// const express = require('express');
// // const fetch = require('node-fetch');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());

// app.get('/proxy', async (req, res) => {
//     const url = req.query.url;
//     if (!url) {
//         return res.status(400).json({ error: 'Missing URL parameter' });
//     }

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching data from the URL' });
//     }
// });

// app.listen(port, () => {
//     console.log(`CORS Proxy Server is running on port ${port}`);
// });
