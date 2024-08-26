const {getGuestList, getGuest, createGuest, setGuest } = require('../use-cases/guestUseCase');

const getGuests = (req, res) => {
    // Obtiene lista de guests
    const guests = getGuestList();
    res.json(guests);
};

const getGuestById = (req, res) => {
    // Obtiene invitado por id o arroja error
    try {
        // Obtiene id 
        const guestId = parseInt(req.params.id);
        // Obtiene invitado por id
        const guest = getGuest(guestId);
        res.json(guest);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const addGuest = (req, res) => {
    try {
        // Obtiene id 
        const guestData = req.body;
        const newGuest = createGuest(guestData);
        res.json(newGuest);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const updateGuest = (req, res) => {
    try {
        // Obtiene id 
        const guestId = parseInt(req.params.id);
        const guestData = req.body;
        console.log("guestData", guestData);
        const newGuest = setGuest(guestId, guestData);
        console.log("newGuest", newGuest);
        res.json(newGuest);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

module.exports = {
    getGuests,
    getGuestById,
    addGuest,
    updateGuest
};