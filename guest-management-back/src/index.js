const express = require('express');
const { getGuests, getGuestById } = require('./controllers/guestController');

const app = express();
const PORT = 3000;
/*
app.get('/', (req, res) => {
    res.send('Hello World!');
});*/

app.get('/guests', getGuests);

app.get('/guests/:id', getGuestById);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});