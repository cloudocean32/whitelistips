const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const IP_FILE = path.join(__dirname, 'ips.txt');
const PROXY_FILE = path.join(__dirname, 'proxies.txt');

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/ips', (req, res) => {
    fs.readFile(IP_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading IP file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const ips = data.split('\n')
                       .map(ip => ip.trim())
                       .filter(ip => ip.length > 0);

        res.json({
            count: ips.length,
            ips: ips
        });
    });
});

app.get('/proxies', (req, res) => {
    fs.readFile(PROXY_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Proxy file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const proxies = data.split('\n')
                       .map(proxy => proxy.trim())
                       .filter(proxy => proxy.length > 0);

        res.json({
            count: proxies.length,
            proxies: proxies
        });
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to IP List Service. Access /ips to get the IP list.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
