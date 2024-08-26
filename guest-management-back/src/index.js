const express = require('express');
const { getGuests, getGuestById, addGuest } = require('./controllers/guestController');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());
/*
app.get('/', (req, res) => {
    res.send('Hello World!');
});*/

app.get('/guests', getGuests);

app.get('/guests/:id', getGuestById);

app.post('/guests', addGuest);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});