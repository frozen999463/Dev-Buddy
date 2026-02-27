"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_controller_1 = require("../controllers/node.controller");
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const router = express_1.default.Router();
router.get("/:id", node_controller_1.getNodeById);
router.put("/:id", auth_1.verifyFirebaseToken, admin_1.isAdmin, node_controller_1.updateNode);
exports.default = router;
