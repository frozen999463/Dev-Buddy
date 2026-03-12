import { cMasterclassPartA } from "./c_masterclass_a";
import { cMasterclassPartA2 } from "./c_masterclass_a2";
import { cMasterclassPartB } from "./c_masterclass_b";
import { cMasterclassPartB2 } from "./c_masterclass_b2";

export const cMasterclass = {
    course: {
        title: "C Programming Masterclass: Core Fundamentals",
        slug: "c-masterclass",
        description: "Master the grandfather of modern languages. Learn memory management, pointers, structs, dynamic allocation, and build high-performance terminal applications.",
        status: "published"
    },
    sections: [
        ...cMasterclassPartA,
        ...cMasterclassPartA2,
        ...cMasterclassPartB,
        ...cMasterclassPartB2,
    ]
};
