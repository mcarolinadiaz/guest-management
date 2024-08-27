const express = require('express');
const cors = require('cors'); // Importa el middleware cors.
const { getGuests, getGuestById, addGuest, updateGuest } = require('./controllers/guestController');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200' // Supongo el frontend se levanta en puerto 4200
}));

app.get('/guests', getGuests);

app.get('/guests/:id', getGuestById);

app.post('/guests', addGuest);

app.put('/guests/:id', updateGuest);

// Exporta la instancia de Express para pruebas
module.exports = app;

// Inicia el servidor solo si el archivo es ejecutado directamente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
}