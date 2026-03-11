export const cCourse = {
    course: {
        title: "C Programming: The Fundamentals",
        slug: "c-programming-fundamentals",
        description: "Learn the foundation of modern computing with C. Master memory management, pointers, and structures.",
        status: "published"
    },
    sections: [
        {
            title: "Introduction to Programming", order: 1,
            chapters: [
                {
                    title: "Welcome to C", order: 1,
                    nodes: [
                        {
                            title: "What is Programming?", type: "lesson", order: 1,
                            content: `### The Grandfather of Languages\n\nWelcome to C! C is one of the oldest and most trusted programming languages. It was used to build Windows, Linux, and macOS.\n\nWhen you learn C, you don't just learn how to code... you learn *how a computer works*. Unlike Python, which hides the messy details from you, C forces you to manage the computer's memory yourself.\n\nThis might sound scary, but it will make you a much stronger programmer!`
                        },
                        {
                            title: "Compilers and Execution", type: "lesson", order: 2,
                            content: `### Translating to Machine Code\n\nC uses a **Compiler** (usually GCC or Clang).\n\n1. You write your code in a text file (e.g., \`main.c\`).\n2. The Compiler reads your file and translates it entirely into Binary (0s and 1s).\n3. It produces an executable file (like \`a.out\` or \`app.exe\`).\n4. You run that executable.\n\nBecause it is pre-translated, C programs are INCREDIBLY fast!`
                        },
                        {
                            title: "Your First C Program", type: "lesson", order: 3,
                            content: `### Hello, World!\n\nLet's look at the classic first program.\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    // This is a comment in C\n    printf("Hello, World!\\n");\n    return 0;\n}\n\`\`\`\n\n**Explanation:**\n- \`#include <stdio.h>\` tells the compiler to load Standard Input/Output features so we can print to the screen.\n- \`int main()\` is the entry point. Every C program *must* have a main function.\n- \`printf()\` is the printing function.\n- \`\\n\` means newline.\n- \`return 0;\` tells the OS the program finished successfully.`
                        }
                    ]
                }
            ]
        },
        {
            title: "Programming Basics", order: 2,
            chapters: [
                {
                    title: "Variables & Data Types", order: 1,
                    nodes: [
                        {
                            title: "Strict Typing", type: "lesson", order: 1,
                            content: `### Putting Data in Boxes\n\nIn C, you **must** tell the computer exactly what type of data a variable will hold before you use it.\n\n\`\`\`c\nint age = 25;       // Whole numbers\nfloat price = 9.99; // Decimals (Floating point)\nchar grade = 'A';   // A single character\n\`\`\`\n\nWhy? Because C needs to know exactly how much RAM (Memory) to reserve for that variable!`
                        },
                        {
                            title: "Formatting Output", type: "lesson", order: 2,
                            content: `### Printing Variables\n\nBecause C is strict, \`printf\` needs to know what type it is printing.\n\n\`\`\`c\nint apples = 5;\nprintf("I have %d apples.\\n", apples);\n\`\`\`\n\n- \`%d\` is the format specifier for integers (decimal).\n- \`%f\` is for floats.\n- \`%c\` is for chars.`
                        }
                    ]
                },
                {
                    title: "Control Flow", order: 2,
                    nodes: [
                        {
                            title: "Conditionals", type: "lesson", order: 1,
                            content: `### Making Decisions\n\nC uses curly braces \`{}\` to group code.\n\n\`\`\`c\nint score = 85;\n\nif (score >= 90) {\n    printf("Grade: A\\n");\n} else if (score >= 80) {\n    printf("Grade: B\\n");\n} else {\n    printf("Grade: C\\n");\n}\n\`\`\`\n\nThe condition goes inside \`()\` and the block goes inside \`{}\`.`
                        },
                        {
                            title: "Loops", type: "lesson", order: 2,
                            content: `### Repeating Tasks\n\n**For Loop:**\n\`\`\`c\nfor (int i = 0; i < 5; i++) {\n    printf("Count: %d\\n", i);\n}\n\`\`\`\nThe \`for\` loop has three parts: \`int i=0\` (Start), \`i < 5\` (Condition), \`i++\` (Increment).\n\n**While Loop:**\n\`\`\`c\nint count = 0;\nwhile (count < 3) {\n    printf("Counting...\\n");\n    count++;\n}\n\`\`\``
                        }
                    ]
                }
            ]
        },
        {
            title: "Functions and Modular Programming", order: 3,
            chapters: [
                {
                    title: "Building Blocks", order: 1,
                    nodes: [
                        {
                            title: "Writing Functions", type: "lesson", order: 1,
                            content: `### Reusable Tasks\n\nFunctions in C must declare what type of data they return, and what type of data they accept.\n\n\`\`\`c\n// This function takes two ints, and returns an int\nint addNumbers(int a, int b) {\n    int sum = a + b;\n    return sum;\n}\n\nint main() {\n    int result = addNumbers(5, 10);\n    printf("Result: %d\\n", result); // Prints 15\n    return 0;\n}\n\`\`\``
                        }
                    ]
                }
            ]
        },
        {
            title: "Data Structures Fundamentals", order: 4,
            chapters: [
                {
                    title: "Arrays and Memory", order: 1,
                    nodes: [
                        {
                            title: "Arrays", type: "lesson", order: 1,
                            content: `### Fixed Size Lists\n\nAn array in C is a contiguous block of memory holding multiple items of the *same type*. You must set its size when creating it.\n\n\`\`\`c\nint scores[5] = {90, 85, 88, 92, 95};\n\nprintf("First score: %d\\n", scores[0]);\nscores[0] = 99; // Changing the value\n\`\`\``
                        },
                        {
                            title: "Strings are Arrays", type: "lesson", order: 2,
                            content: `### There is no String type!\n\nC does not have a native String type! A string is just an array of \`char\` (characters) that ends with a special invisible null terminator character (\`\\0\`).\n\n\`\`\`c\nchar name[] = "Alice";\n// Internally this is: ['A', 'l', 'i', 'c', 'e', '\\0']\n\nprintf("Hello %s\\n", name); // %s is for strings\n\`\`\``
                        }
                    ]
                }
            ]
        },
        {
            title: "Object-Oriented Programming Patterns", order: 5,
            chapters: [
                {
                    title: "Structures (Structs)", order: 1,
                    nodes: [
                        {
                            title: "Grouping Data", type: "lesson", order: 1,
                            content: `### The Precursor to Classes\n\nC doesn't have Classes. But you can group related variables together using a \`struct\`.\n\n\`\`\`c\nstruct Student {\n    int id;\n    float gpa;\n}; // Don't forget the semicolon here!\n\nint main() {\n    struct Student s1;\n    s1.id = 101;\n    s1.gpa = 3.8;\n\n    printf("Student %d has GPA %f\\n", s1.id, s1.gpa);\n    return 0;\n}\n\`\`\`\nThis is the foundation that C++, Java, and Python built 'Objects' upon!`
                        }
                    ]
                }
            ]
        },
        {
            title: "Advanced Programming Concepts", order: 6,
            chapters: [
                {
                    title: "Memory Control", order: 1,
                    nodes: [
                        {
                            title: "Pointers", type: "lesson", order: 1,
                            content: `### The Most Feared Concept in C\n\nEvery variable lives at a specific address in your RAM (like a house address). A **Pointer** is simply a variable that stores *someone else's address*.\n\n\`\`\`c\nint age = 25;\nint *pAge = &age; // The & means 'Address Of'\n\nprintf("Age is: %d\\n", age);\nprintf("Address is: %p\\n", pAge);\n\n// Going to the address to get the value (Dereferencing)\nprintf("Value at address: %d\\n", *pAge);\n\`\`\`\nIf you master pointers, you master memory!`
                        }
                    ]
                }
            ]
        },
        {
            title: "Practical Projects", order: 7,
            chapters: [
                {
                    title: "Capstone Projects", order: 1,
                    nodes: [
                        {
                            title: "Project: Number Guessing Game", type: "lesson", order: 1,
                            content: `### Build a Guessing Game\n\n**Description:** Write a program that picks a random number from 1-100 and asks the user to guess it.\n\n**Requirements:**\n1. Use \`#include <stdlib.h>\` and \`rand()\` for the random number.\n2. Use a \`while\` loop to keep asking for a guess utilizing \`scanf("%d", &guess)\`\n3. Print 'Too high' or 'Too low' using \`if\` statements.\n4. When correct, print how many tries it took!`
                        }
                    ]
                }
            ]
        }
    ]
};
