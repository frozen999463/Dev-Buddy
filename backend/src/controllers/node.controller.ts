import { Request, Response } from "express";
import { Node } from "../models/Node";

export const getNodeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const node = await Node.findById(id);
        if (!node) {
            return res.status(404).json({ message: "Node not found" });
        }
        res.json(node);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch node" });
    }
};

export const updateNode = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content, questions, starterCode } = req.body;

        const node = await Node.findByIdAndUpdate(
            id,
            { content, questions, starterCode },
            { new: true }
        );

        if (!node) {
            return res.status(404).json({ message: "Node not found" });
        }

        res.json(node);
    } catch (error) {
        res.status(500).json({ message: "Failed to update node" });
    }
};
