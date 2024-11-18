const Trip = require('../models/tripModel');

// Lấy tất cả chuyến đi
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới chuyến đi
const createTrip = async (req, res) => {
    const { name, location, image, price, description } = req.body;

    try {
        const newTrip = new Trip({ name, location, image, price, description });
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getTrips, createTrip };
