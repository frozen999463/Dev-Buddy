"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNode = exports.getNodeById = void 0;
const Node_1 = require("../models/Node");
const getNodeById = async (req, res) => {
    try {
        const { id } = req.params;
        const node = await Node_1.Node.findById(id);
        if (!node) {
            return res.status(404).json({ message: "Node not found" });
        }
        res.json(node);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch node" });
    }
};
exports.getNodeById = getNodeById;
const updateNode = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, questions, starterCode } = req.body;
        const node = await Node_1.Node.findByIdAndUpdate(id, { content, questions, starterCode }, { new: true });
        if (!node) {
            return res.status(404).json({ message: "Node not found" });
        }
        res.json(node);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update node" });
    }
};
exports.updateNode = updateNode;
