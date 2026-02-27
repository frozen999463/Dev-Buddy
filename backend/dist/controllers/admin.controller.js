"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getUsersList = exports.getAdminStats = void 0;
const User_1 = require("../models/User");
const getAdminStats = async (req, res) => {
    try {
        const usersCount = await User_1.User.countDocuments();
        res.json({ usersCount });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
exports.getAdminStats = getAdminStats;
const getUsersList = async (req, res) => {
    try {
        const users = await User_1.User.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
exports.getUsersList = getUsersList;
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const user = await User_1.User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update role" });
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.User.findByIdAndDelete(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete user" });
    }
};
exports.deleteUser = deleteUser;
