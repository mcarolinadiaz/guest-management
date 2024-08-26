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
    addGuest(guest);
    return guest;
};

const setGuest = (id, updatedGuest) => {
    const guest = updateGuestById(id, updatedGuest);
    console.log("En use-cases",guest);
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