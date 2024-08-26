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
    guests.push(newGuest)
    return guests;
};

const getGuestById = (id) => {
    return guests.find(element => element.id == id);
}

const updateGuestById = (id, payload) => {
    // Encuentra el índice del invitado en la lista
    // Convierte el ID a un número entero
    const guestId = parseInt(id, 10);
    const index = guests.findIndex(element => element.id == guestId);
    // Verifica si el invitado existe
    if (index !== -1) {
        // Actualiza las propiedades del invitado con los valores del payload, si están presentes
        guests[index].userName = payload.userName !== undefined ? payload.userName : guests[index].userName;
        guests[index].confirmation = payload.confirmation !== undefined ? payload.confirmation : guests[index].confirmation;
        guests[index].meat = payload.meat !== undefined ? payload.meat : guests[index].meat;
        guests[index].salad = payload.salad !== undefined ? payload.salad : guests[index].salad;
        // Devuelve el invitado actualizado
        return guests[index];
    }
    // Devuelve null si el invitado no se encontró
    return null;
}

module.exports = {
    getAllGuests,
    addGuest,
    getGuestById,
    updateGuestById
};