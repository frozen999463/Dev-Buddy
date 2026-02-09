import express from "express";
import { getNodeById, updateNode } from "../controllers/node.controller";
import { verifyFirebaseToken } from "../middleware/auth";
import { isAdmin } from "../middleware/admin";

const router = express.Router();

router.get("/:id", getNodeById);
router.put("/:id", verifyFirebaseToken, isAdmin, updateNode);

export default router;
