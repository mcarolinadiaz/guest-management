const express = require('express');
const { getGuests, getGuestById, addGuest, updateGuest } = require('./controllers/guestController');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

app.get('/guests', getGuests);

app.get('/guests/:id', getGuestById);

app.post('/guests', addGuest);

app.put('/guests/:id', updateGuest);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});