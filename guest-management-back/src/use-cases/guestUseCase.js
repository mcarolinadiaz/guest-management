const { getAllGuests, getGuestById, addGuest, updateGuestById } = require('../repositories/guestRepository');

const getGuestList = () => {
    return getAllGuests();
};

const getGuest = (id) => {
    const guest = getGuestById(id);
    if (!guest) {
        throw new Error('Guest not found');
    }
    return guest;
};

const createGuest = (guest) => {
    // Crea un nuevo invitado
    const guests = addGuest(guest);
    return guests;
};

const setGuest = (id, updatedGuest) => {
    // Update invitado por id.
    const guest = updateGuestById(id, updatedGuest);
    if (!guest) {
        throw new Error('Guest not found');
    }
    return guest;
};

module.exports = {
    getGuestList,
    getGuest,
    createGuest,
    setGuest
};