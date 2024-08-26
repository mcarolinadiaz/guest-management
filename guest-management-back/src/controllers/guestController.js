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
    // Obtiene invitado del body
    const guestData = req.body;
    if (!guestData.userName) {
        return res.status(400).json({ error: 'userName is required' });
    }
    if (!guestData.meat) {
        return res.status(400).json({ error: 'meat is required' });
    }
    if (!guestData.salad) {
        return res.status(400).json({ error: 'salad is required' });
    }
    const newGuest = createGuest(guestData);
    res.status(201).json(newGuest);
}

const updateGuest = (req, res) => {
    try {
        // Obtiene id 
        const guestId = parseInt(req.params.id);
        //Obtiene body
        const guestData = req.body;
        const newGuest = setGuest(guestId, guestData);
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