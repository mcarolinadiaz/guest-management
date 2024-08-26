const { getAllGuests, getGuestById } = require('../repositories/guestRepository');

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

module.exports = {
    getGuestList,
    getGuest
};