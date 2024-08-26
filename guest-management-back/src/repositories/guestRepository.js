const {Guest} = require('../models/guest');

const guests = [
    new Guest(1, "Mariana Pérez", true, 300, ["tomate", "lechuga"]),
    new Guest(2, "Joaquín Ramírez", false, 0, []),
    new Guest(3, "Sofía González", true, 400, ["cebolla"]),
    new Guest(4, "Lucas Martín", true, 250, ["tomate", "cebolla"]),
    new Guest(5, "Florencia Díaz", false, 0, []),
    new Guest(6, "Carlos Fernández", true, 350, ["lechuga", "tomate"])
];

const getAllGuests = () => {
    return guests;
};

const addGuest = (guest) => {
    // Crea un nuevo objeto y lo agrega a la lista
    let newGuest = new Guest(guests[guests.length - 1].id + 1,
        guest.userName,
        guest.confirmation,
        guest.meat,
        guest.salad
    )
    this.guests.push(newGuest);
};

const getGuestById = (id) => {
    return guests.find(element => element.id == id);
}

const updateGuestById = (id, payload) => {
    const index = guests.findIndex(element => element.id == id);
    if (index != -1) {
        guests[index].userName = payload.userName ? payload.userName : guests[index].userName;
        guests[index].confirmation = payload.confirmation ? payload.confirmation : guests[index].confirmation;
        guests[index].meat = payload.meat ? payload.meat : guests[index].meat;
        guests[index].salad = payload.salad ? payload.salad : guests[index].salad;
    }
    return index != -1 ? new Guest(id, guests[index].userName, guests[index].confirmation, guests[index].meat, guests[index].salad) : null;
}

module.exports = {
    getAllGuests,
    addGuest,
    getGuestById,
    updateGuestById
};