import { cMasterclassPartA } from "./c_masterclass_a";
import { cMasterclassPartB } from "./c_masterclass_b";

export const cMasterclass = {
    course: {
        title: "C Programming Masterclass: Core Fundamentals",
        slug: "c-masterclass",
        description: "Master the grandfather of modern languages. Learn memory management, pointers, structs, dynamic allocation, and build high-performance terminal applications.",
        status: "published"
    },
    sections: [
        ...cMasterclassPartA,
        ...cMasterclassPartB,
    ]
};
