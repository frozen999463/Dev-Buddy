import { dartMasterclassPartA } from "./dart_masterclass_a";
import { dartMasterclassPartB } from "./dart_masterclass_b";

export const dartMasterclass = {
    course: {
        title: "Dart & Flutter Foundations Masterclass",
        slug: "dart-masterclass",
        description: "Learn Dart, the language powering Flutter. Master UI-optimized concepts, sound null safety, futures, streams, and mixins to build blazing-fast apps.",
        status: "published"
    },
    sections: [
        ...dartMasterclassPartA,
        ...dartMasterclassPartB,
    ]
};
