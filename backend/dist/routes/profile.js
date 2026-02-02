"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get("/profile", auth_1.verifyFirebaseToken, async (req, res) => {
    try {
        const { uid, email, name, firebase } = req.user;
        let user = await User_1.User.findOne({ uid });
        if (!user) {
            user = await User_1.User.create({
                uid,
                email,
                name: name || null,
                provider: firebase.sign_in_provider,
                onboarded: false,
            });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});
router.patch("/onboarding", auth_1.verifyFirebaseToken, async (req, res) => {
    try {
        const { uid } = req.user;
        const { name, experienceLevel, learningGoal } = req.body;
        const user = await User_1.User.findOneAndUpdate({ uid }, {
            name,
            experienceLevel,
            learningGoal,
            onboarded: true,
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update onboarding data" });
    }
});
exports.default = router;
