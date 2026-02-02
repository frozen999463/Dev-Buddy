"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.post("/signup", auth_1.verifyFirebaseToken, async (req, res) => {
    try {
        const { uid, email } = req.user;
        // Check if user exists
        let user = await User_1.User.findOne({ uid });
        if (!user) {
            user = await User_1.User.create({ uid, email });
        }
        res.json({ message: "User saved ✅", user });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.default = router;
