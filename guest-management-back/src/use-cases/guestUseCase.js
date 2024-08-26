const { getAllGuests, getGuestById, addGuest } = require('../repositories/guestRepository');

const getGuestList = () => {
    return getAllGuests();
};

const getGuest = (id) => {
    const guest = getGuestById(id);
    if (!guest) {
        throw new Error('Guest not found');
    }
    return guest;
}

const createGuest = (guest) => {
    const guests = addGuest(guest);
    if (!guests) {
        throw new Error('Guest not found');
    }
    return guests;
}

module.exports = {
    getGuestList,
    getGuest,
    createGuest
};