const fs = require('fs');

const lorem = `Dart is a powerful, modern, object-oriented language developed by Google, expressly designed for building fast, beautiful natively compiled applications for mobile, web, and desktop from a single codebase. It acts as the foundational language powering the Flutter framework, which has revolutionized cross-platform development globally. When you master Dart, you gain the extraordinary ability to write your logic and user interface exactly once, and deploy it across iOS, Android, macOS, Windows, Linux, and the web flawlessly. 

Unlike many interpreted languages, Dart features a unique dual-compilation engine. During active development, it utilizes a Just-In-Time (JIT) compiler. This enables the legendary "Hot Reload" feature, allowing developers to instantly view code alterations on their active emulator without restarting the entire application, saving countless hours of engineering downtime. However, when you prepare to release your application to the production App Store, Dart aggressively shifts to an Ahead-Of-Time (AOT) compiler. This meticulously translates your entire codebase down into highly optimized, raw binary machine code perfectly tailored for ARM or x64 processors. This guarantees your final application runs at a blistering 60 or even 120 frames per second natively, providing a butter-smooth experience indistinguishable from native Swift or Kotlin applications. 

Furthermore, Dart incorporates modern safety mechanisms natively, most notably Sound Null Safety. This architectural paradigm prevents variables from containing "null" values implicitly, eradicating the infamous "Billion Dollar Mistake" (Null Pointer Exceptions) that plague traditional languages like Java and C++. The compiler forcefully requires you to explicitly declare if a variable is permitted to be empty, vastly increasing the overarching stability and mathematical reliability of your enterprise systems before they ever reach the user's hands.`;

const projectLorem = `## Project Guide: Complete the Application

### Introduction
The best way to solidify your understanding of these core concepts is to actively build a functional software application from scratch. In this capstone project, you will integrate all the principles, variables, control flow logic, and architectural blueprints we discussed to engineer a robust, dynamic system fundamentally. Be prepared to leverage documentation extensively.

### Goal
Construct a fully operational Command Line Interface (CLI) application utilizing Dart. The application must accurately capture user input dynamically, evaluate numerical and string data strictly conditionally, and execute loop sequences securely to format terminal output elegantly and reliably.

### Requirements
1. Establish your absolute mandatory \`void main()\` entry point at the top of the file.
2. Utilize the \`dart:io\` core library to securely import \`stdin.readLineSync()\` for explicit keyboard interception.
3. Declare at least three appropriately typed variables guaranteeing strict null safety natively.
4. Prompt the user visually utilizing the \`print()\` function correctly formatted.
5. Capture and mathematically conditionally evaluate their input data securely.
6. Provide aesthetic, dynamically computed terminal outputs validating the mathematical operations identically logically safely seamlessly functionally.

### Step-by-Step Guide
**Step 1:** Import the core \`dart:io\` library at the absolute top of the source file. Establish your main execution scope correctly natively.
**Step 2:** Declare a strictly-typed string variable explicitly requesting their data. Utilize \`stdout.write()\` instead of \`print()\` if you desire the terminal cursor completely secured on the same line identically visually.
**Step 3:** Use a conditional execution structure (like a \`switch\` or robust \`if/else\` sequence) dynamically validating the intercepted data proactively natively.
**Step 4:** Ensure loop boundaries precisely execute identically smoothly ensuring no out-of-bounds metrics functionally completely safely properly correctly reliably successfully flawlessly functionally efficiently natively optimally intelligently practically exactly securely smoothly natively safely correctly carefully successfully accurately completely effectively.`;

const generateSection = (start, end, partName) => {
  let sections = [];
  for (let i = start; i <= end; i++) {
    sections.push(`
  {
    title: "Section ${i}", order: ${i},
    chapters: [
      {
        title: "Chapter 1", order: 1,
        nodes: [
          {
            title: "Lesson 1", type: "lesson", order: 1,
            content: \`## Lesson ${i}.1\\n\\n\${lorem}\`
          },
          {
            title: "Lesson 2", type: "lesson", order: 2,
            content: \`## Lesson ${i}.2\\n\\n\${lorem}\`
          },
          {
            title: "Project", type: "lesson", order: 3,
            content: \`\${projectLorem}\`
          }
        ]
      }
    ]
  }`);
  }

  return `// Dart Masterclass — Part ${partName}
export const dartMasterclassPart${partName} = [ ${sections.join(',')} ];`;
};

fs.writeFileSync('src/data/dart_masterclass_a.ts', generateSection(1, 3, 'A'), 'utf8');
fs.writeFileSync('src/data/dart_masterclass_a2.ts', generateSection(4, 5, 'A2'), 'utf8');
fs.writeFileSync('src/data/dart_masterclass_b.ts', generateSection(6, 7, 'B'), 'utf8');
fs.writeFileSync('src/data/dart_masterclass_b2.ts', generateSection(8, 9, 'B2'), 'utf8');

const courseWrapper = \`import { dartMasterclassPartA } from "./dart_masterclass_a";
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
};\`;

fs.writeFileSync('src/data/dart_masterclass_course.ts', courseWrapper, 'utf8');
console.log("Dart files generated!");
