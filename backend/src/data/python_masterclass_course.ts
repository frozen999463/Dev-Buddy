import { pythonMasterclassPartA } from "./python_masterclass_a";
import { pythonMasterclassPartB } from "./python_masterclass_b";

export const pythonMasterclass = {
    course: {
        title: "Python Masterclass: Zero to Hero",
        slug: "python-masterclass",
        description: "A complete, beginner-to-advanced Python course. Build real projects while mastering variables, control flow, functions, OOP, file handling, memory management, and clean code principles.",
        status: "published"
    },
    sections: [
        ...pythonMasterclassPartA,
        ...pythonMasterclassPartB,
    ]
};
