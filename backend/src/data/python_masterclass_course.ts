import { pythonMasterclassPartA } from "./python_masterclass_a";
import { pythonMasterclassPartA2 } from "./python_masterclass_a2";
import { pythonMasterclassPartB } from "./python_masterclass_b";
import { pythonMasterclassPartB2 } from "./python_masterclass_b2";

export const pythonMasterclass = {
    course: {
        title: "Python Masterclass: Zero to Hero",
        slug: "python-masterclass",
        description: "A complete, beginner-to-advanced Python course. Build real projects while mastering variables, control flow, functions, OOP, file handling, memory management, and clean code principles.",
        status: "published"
    },
    sections: [
        ...pythonMasterclassPartA,
        ...pythonMasterclassPartA2,
        ...pythonMasterclassPartB,
        ...pythonMasterclassPartB2,
    ]
};
