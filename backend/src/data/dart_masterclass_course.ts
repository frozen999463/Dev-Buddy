import { dartMasterclassPartA } from "./dart_masterclass_a";
import { dartMasterclassPartA2 } from "./dart_masterclass_a2";
import { dartMasterclassPartB } from "./dart_masterclass_b";
import { dartMasterclassPartB2 } from "./dart_masterclass_b2";

export const dartMasterclass = {
    course: {
        title: "Dart & Flutter Foundations Masterclass",
        slug: "dart-masterclass",
        description: "Learn Dart, the modern language optimized for building fast apps on any platform. Perfect for Flutter development.",
        status: "published"
    },
    sections: [
        ...dartMasterclassPartA,
        ...dartMasterclassPartA2,
        ...dartMasterclassPartB,
        ...dartMasterclassPartB2,
    ]
};