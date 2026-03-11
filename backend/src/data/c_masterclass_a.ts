// C Masterclass — Part A (Sections 1-5)
export const cMasterclassPartA = [
    {
        title: "Introduction to Programming", order: 1,
        chapters: [
            {
                title: "C — The Foundation Language", order: 1,
                nodes: [
                    {
                        title: "What is C?", type: "lesson", order: 1,
                        content: `## C — The Grandfather of Languages\n\nC was created by Dennis Ritchie at Bell Labs in 1972. It was used to build Unix, Linux, Windows, and macOS. Almost every modern programming language borrows syntax from C.\n\nWhen you learn C, you learn how computers actually work — memory, addresses, and hardware interaction. Unlike Python, C doesn't hide these details from you.\n\n**Why learn C?**\n- Makes you a stronger programmer in any language\n- System programming: embedded systems, operating systems, drivers\n- Blazing fast — used everywhere performance matters\n- Teaches memory management that all languages use under the hood\n\n## Your First C Program\n\`\`\`c\n#include <stdio.h>  // Load the standard I/O library\n\nint main() {              // Program starts here\n    printf("Hello!\\n");  // Print to screen\n    return 0;             // 0 = success\n}\n\`\`\`\n\n**Every part matters:**\n- \`#include <stdio.h>\` — tells the compiler to load printing functions\n- \`int main()\` — every C program must have this entry point\n- \`printf()\` — the printing function (% specifiers needed for variables)\n- \`return 0\` — tells the OS the program succeeded\n- Every statement ends with \`;\``
                    },
                    {
                        title: "Compilation Process", type: "lesson", order: 2,
                        content: `## How C is Compiled\n\nC is a **compiled language** — your code is translated entirely into machine code before running.\n\n**Steps:**\n\`\`\`\n Source Code (main.c)\n        ↓\n Preprocessor (#include, #define resolved)\n        ↓\n Compiler (translates to assembly)\n        ↓\n Assembler (translates to binary object code)\n        ↓\n Linker (combines with libraries)\n        ↓\n Executable (./a.out or app.exe)\n\`\`\`\n\n**Compiling with GCC:**\n\`\`\`bash\ngcc main.c -o myapp    # Compile and name the output 'myapp'\n./myapp                 # Run it\n\ngcc -Wall main.c -o myapp  # -Wall turns on all warnings\n\`\`\`\n\n**Benefits of compilation:**\n- Programs run at nanosecond speed\n- Errors caught before the user ever runs the program\n- Optimisations applied by the compiler\n\n**Drawback:** You must recompile after every code change.`
                    },
                    {
                        title: "Intro Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What year was C created?", options: ["1960", "1972", "1985", "1991"], correctAnswer: 1 },
                            { question: "What is the entry point of every C program?", options: ["start()", "run()", "main()", "begin()"], correctAnswer: 2 },
                            { question: "What does 'return 0' in main() mean?", options: ["Return the number 0", "Program failed", "Program succeeded", "Nothing"], correctAnswer: 2 },
                            { question: "What does the #include directive do?", options: ["Defines a constant", "Loads a library header file", "Creates a function", "Starts the program"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Intro", order: 2,
                nodes: [
                    {
                        title: "Project: Greeting Card in C", type: "lesson", order: 1,
                        content: `## Project: Greeting Card in C\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    char name[50];\n    int age;\n    \n    printf("Enter your name: ");\n    scanf("%s", name);\n    printf("Enter your age: ");\n    scanf("%d", &age);\n    \n    printf("\\n==============================\\n");\n    printf("  Hello, %s!\\n", name);\n    printf("  You are %d years old.\\n", age);\n    printf("  Welcome to C programming!\\n");\n    printf("==============================\\n");\n    \n    return 0;\n}\n\`\`\`\n\n**Key concepts:**\n- \`char name[50]\` — a string in C is an array of chars\n- \`scanf("%s", name)\` — reads input (\`%s\` for string, \`%d\` for int)\n- \`&age\` — the \`&\` gives scanf the memory address to store into\n\n**Extensions:**\n- 🔥 Print the year they were born (2024 - age)\n- 🔥 Print their name in a box that adjusts to the name length`
                    }
                ]
            }
        ]
    },

    {
        title: "Programming Fundamentals", order: 2,
        chapters: [
            {
                title: "Variables and Data Types", order: 1,
                nodes: [
                    {
                        title: "Variables in C", type: "lesson", order: 1,
                        content: `## Variables in C — Strict Typing\n\nC requires you to declare the type of every variable before using it. This tells the compiler exactly how much memory to reserve.\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    // Basic types\n    int age = 25;           // 4 bytes — whole numbers\n    float price = 9.99f;    // 4 bytes — decimal (~7 digits)\n    double pi = 3.14159265; // 8 bytes — decimal (~15 digits)\n    char grade = 'A';       // 1 byte — single character\n    \n    // No bool in C (unless #include <stdbool.h>)\n    int isValid = 1;   // 1 = true\n    int isFailed = 0;  // 0 = false\n    \n    // Printing with format specifiers\n    printf("Age: %d\\n", age);\n    printf("Price: %.2f\\n", price);  // 2 decimal places\n    printf("Pi: %lf\\n", pi);\n    printf("Grade: %c\\n", grade);\n    \n    return 0;\n}\n\`\`\`\n\n**Memory sizes:**\n| Type | Size | Range |\n|------|------|-------|\n| char | 1 byte | -128 to 127 |\n| int | 4 bytes | ±2.1 billion |\n| float | 4 bytes | ~7 decimal digits |\n| double | 8 bytes | ~15 decimal digits |`
                    },
                    {
                        title: "Strings in C", type: "lesson", order: 2,
                        content: `## Strings in C — Arrays of Characters\n\nC has no String type! A string is an array of \`char\` ending with a null terminator (\`'\\0'\`).\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>  // String functions\n\nint main() {\n    // Declaration — must specify max size\n    char name[50] = "Alice";\n    // Internally: ['A','l','i','c','e','\\0',...]\n    \n    printf("Name: %s\\n", name);          // Alice\n    printf("Length: %lu\\n", strlen(name)); // 5\n    \n    // String functions from string.h\n    char name2[50];\n    strcpy(name2, name);    // Copy name into name2\n    strcat(name2, " Smith"); // Concatenate\n    printf("%s\\n", name2);  // Alice Smith\n    \n    // Comparing strings (NOT with ==)\n    if (strcmp(name, "Alice") == 0) {\n        printf("Names match!\\n");\n    }\n    \n    // Character operations\n    #include <ctype.h>\n    printf("%c\\n", toupper('a'));  // A\n    printf("%d\\n", isdigit('5')); // Non-zero (true)\n    \n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Data Types Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "How many bytes does an int typically take in C?", options: ["1", "2", "4", "8"], correctAnswer: 2 },
                            { question: "What format specifier prints a double in C?", options: ["%s", "%d", "%c", "%lf"], correctAnswer: 3 },
                            { question: "How do you compare two strings in C?", options: ["str1 == str2", "strcmp(str1, str2) == 0", "str1.equals(str2)", "compare(str1, str2)"], correctAnswer: 1 },
                            { question: "What character terminates every C string?", options: ["'.'", "' '", "'\\0'", "'\\n'"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Input and Output", order: 2,
                nodes: [
                    {
                        title: "printf and scanf", type: "lesson", order: 1,
                        content: `## Input and Output in C\n\n**printf — formatted output:**\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    int score = 95;\n    float gpa = 3.85;\n    char name[] = "Alice";\n    \n    // Format specifiers control the display\n    printf("Name: %s\\n", name);\n    printf("Score: %d\\n", score);\n    printf("GPA: %.2f\\n", gpa);      // 2 decimal places: 3.85\n    printf("Score: %05d\\n", score);  // Zero-padded: 00095\n    printf("%-10s|\\n", name);        // Left-aligned: "Alice     |"\n    \n    return 0;\n}\n\`\`\`\n\n**scanf — formatted input:**\n\`\`\`c\nint age;\nchar name[50];\nfloat salary;\n\nprintf("Enter name: ");\nscanf("%s", name);      // No & for arrays!\n\nprintf("Enter age: ");\nscanf("%d", &age);      // & required for non-arrays\n\nprintf("Enter salary: ");\nscanf("%f", &salary);\n\nprintf("Hello %s, age %d, salary %.2f\\n",\n       name, age, salary);\n\`\`\`\n\n**⚠️ scanf pitfalls:**\n- \`%s\` stops at whitespace (can't read full names)\n- Use \`fgets(name, sizeof(name), stdin)\` for full lines\n- Always provide \`&\` for non-array variables`
                    },
                    {
                        title: "Operators in C", type: "lesson", order: 2,
                        content: `## Operators in C\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    int a = 17, b = 5;\n    \n    // Arithmetic\n    printf("%d\\n", a + b);  // 22\n    printf("%d\\n", a - b);  // 12\n    printf("%d\\n", a * b);  // 85\n    printf("%d\\n", a / b);  // 3 — INTEGER division!\n    printf("%d\\n", a % b);  // 2 — remainder\n    \n    // Integer vs Float division\n    printf("%f\\n", (float)a / b);  // 3.400000 — cast to float!\n    \n    // Increment / Decrement\n    int x = 5;\n    printf("%d\\n", x++);  // 5 — post-increment (use then add)\n    printf("%d\\n", x);    // 6\n    printf("%d\\n", ++x);  // 7 — pre-increment (add then use)\n    \n    // Bitwise operators (unique to low-level languages!)\n    printf("%d\\n", 6 & 3);   // AND: 2\n    printf("%d\\n", 6 | 3);   // OR: 7\n    printf("%d\\n", 6 ^ 3);   // XOR: 5\n    printf("%d\\n", 1 << 3);  // Left shift: 8 (multiply by 2^3)\n    \n    return 0;\n}\n\`\`\``
                    }
                ]
            },
            {
                title: "Mini Projects — Fundamentals", order: 3,
                nodes: [
                    {
                        title: "Project: Calculator in C", type: "lesson", order: 1,
                        content: `## Project: Calculator in C\n\n\`\`\`c\n#include <stdio.h>\n\nfloat add(float a, float b) { return a + b; }\nfloat sub(float a, float b) { return a - b; }\nfloat mul(float a, float b) { return a * b; }\nfloat dvd(float a, float b) { return b != 0 ? a/b : 0; }\n\nint main() {\n    float a, b, result;\n    char op;\n    char again = 'y';\n    \n    while (again == 'y' || again == 'Y') {\n        printf("\\nEnter: num op num (e.g. 5 + 3): ");\n        scanf("%f %c %f", &a, &op, &b);\n        \n        switch (op) {\n            case '+': result = add(a, b); break;\n            case '-': result = sub(a, b); break;\n            case '*': result = mul(a, b); break;\n            case '/':\n                if (b == 0) { printf("Divide by zero!\\n"); continue; }\n                result = dvd(a, b); break;\n            default:\n                printf("Unknown operator!\\n"); continue;\n        }\n        printf("Result: %.4f\\n", result);\n        printf("Go again? (y/n): ");\n        scanf(" %c", &again);\n    }\n    return 0;\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Type Systems and Conversions", order: 3,
        chapters: [
            {
                title: "Type Casting in C", order: 1,
                nodes: [
                    {
                        title: "Implicit and Explicit Casting", type: "lesson", order: 1,
                        content: `## Type Casting in C\n\n**Implicit conversion (promotion):**\nC automatically converts smaller types to larger ones in mixed expressions.\n\n\`\`\`c\nint i = 5;\nfloat f = i;        // int → float automatically (5.0)\ndouble d = f;       // float → double automatically\n\n// In expressions:\ndouble result = i + 3.14;  // i promoted to double (8.14)\n\`\`\`\n\n**Explicit casting:**\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    int a = 7, b = 2;\n    \n    // Integer division — loses the 0.5!\n    printf("%d\\n", a / b);           // 3\n    \n    // Cast BEFORE the operation\n    printf("%.2f\\n", (float)a / b);  // 3.50 ✓\n    printf("%.2f\\n", (double)a / b); // 3.50 ✓\n    \n    // Truncation (not rounding)\n    float x = 9.99f;\n    int truncated = (int)x;   // 9, not 10!\n    printf("%d\\n", truncated);\n    \n    // Char and int are interchangeable\n    char c = 'A';\n    int ascii = (int)c;\n    printf("%d\\n", ascii);    // 65 — ASCII value of 'A'\n    printf("%c\\n", ascii + 1); // 'B'\n    \n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Integer Overflow", type: "lesson", order: 2,
                        content: `## Integer Overflow in C\n\nC integers have fixed sizes. If you exceed the maximum, they **wrap around** — a dangerous bug!\n\n\`\`\`c\n#include <stdio.h>\n#include <limits.h>  // Contains INT_MAX, INT_MIN, etc.\n\nint main() {\n    printf("INT_MAX: %d\\n", INT_MAX);   // 2,147,483,647\n    printf("INT_MIN: %d\\n", INT_MIN);   // -2,147,483,648\n    \n    int x = INT_MAX;\n    x = x + 1;  // OVERFLOW!\n    printf("After overflow: %d\\n", x);  // -2,147,483,648!\n    \n    // Unsigned int — no negatives, double the positive range\n    unsigned int u = 0;\n    u = u - 1;  // Wraps to 4,294,967,295!\n    printf("Unsigned underflow: %u\\n", u);\n    \n    // Safe: use long long for large numbers\n    long long big = 9999999999LL;\n    printf("Big number: %lld\\n", big);\n    \n    return 0;\n}\n\`\`\`\n\n**Prevention:**\n- Use \`long long\` for large values\n- Check bounds before arithmetic\n- Use libraries like \`<stdint.h>\` for fixed-size types (\`int32_t\`, \`int64_t\`)`
                    },
                    {
                        title: "Type Casting Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does (int)9.99 evaluate to in C?", options: ["10", "9", "9.99", "Error"], correctAnswer: 1 },
                            { question: "What happens when an integer overflows in C?", options: ["Crash", "Stays at max value", "Wraps around", "Becomes float"], correctAnswer: 2 },
                            { question: "What does (float)7 / 2 give?", options: ["3", "3.5", "3.0", "Error"], correctAnswer: 1 },
                            { question: "What is the ASCII value of 'A'?", options: ["60", "65", "97", "70"], correctAnswer: 1 }
                        ]
                    }
                ]
            }
        ]
    },

    {
        title: "Control Flow", order: 4,
        chapters: [
            {
                title: "Conditionals and Loops", order: 1,
                nodes: [
                    {
                        title: "if-else and switch in C", type: "lesson", order: 1,
                        content: `## Conditional Statements in C\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    int score = 85;\n    \n    if (score >= 90) {\n        printf("Grade: A\\n");\n    } else if (score >= 80) {\n        printf("Grade: B\\n");\n    } else if (score >= 70) {\n        printf("Grade: C\\n");\n    } else {\n        printf("Grade: F\\n");\n    }\n    \n    // Ternary operator\n    char *status = (score >= 60) ? "PASS" : "FAIL";\n    printf("Status: %s\\n", status);\n    \n    // switch statement\n    int day = 3;\n    switch (day) {\n        case 1: printf("Monday\\n");    break;\n        case 2: printf("Tuesday\\n");   break;\n        case 3: printf("Wednesday\\n"); break;\n        case 4: printf("Thursday\\n");  break;\n        case 5: printf("Friday\\n");    break;\n        default: printf("Weekend!\\n");\n    }\n    // ⚠️ ALWAYS use 'break' in switch — or code falls through!\n    \n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Loops in C", type: "lesson", order: 2,
                        content: `## Loops in C\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    // for loop\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", i);  // 0 1 2 3 4\n    }\n    printf("\\n");\n    \n    // while loop\n    int count = 10;\n    while (count > 0) {\n        printf("%d ", count);  // 10 9 8 7...\n        count--;\n    }\n    printf("\\n");\n    \n    // do-while — runs at least once\n    int guess;\n    do {\n        printf("Enter a positive number: ");\n        scanf("%d", &guess);\n    } while (guess <= 0);\n    printf("You entered: %d\\n", guess);\n    \n    // Nested loops — multiplication table\n    for (int i = 1; i <= 5; i++) {\n        for (int j = 1; j <= 5; j++) {\n            printf("%3d", i * j);\n        }\n        printf("\\n");\n    }\n    \n    // break and continue\n    for (int i = 0; i < 10; i++) {\n        if (i % 2 == 0) continue;  // Skip evens\n        if (i == 7) break;         // Stop at 7\n        printf("%d ", i);          // 1 3 5\n    }\n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Control Flow Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What happens in C switch if you forget 'break'?", options: ["Compile error", "Crash", "Falls through to next case", "Jumps to default"], correctAnswer: 2 },
                            { question: "What is the difference between while and do-while?", options: ["No difference", "do-while always runs at least once", "while runs forever", "do-while is faster"], correctAnswer: 1 },
                            { question: "In C for(int i=0; i<5; i++), how many times does the body run?", options: ["4", "5", "6", "Infinite"], correctAnswer: 1 },
                            { question: "What does 'continue' do in a loop?", options: ["Exits loop", "Skips rest of this iteration", "Restarts the loop", "Goes to next function"], correctAnswer: 1 }
                        ]
                    },
                    {
                        title: "FizzBuzz Challenge", type: "challenge", order: 4,
                        starterCode: "// Implement FizzBuzz: print 1-100\n// Multiples of 3: Fizz\n// Multiples of 5: Buzz\n// Multiples of both: FizzBuzz\n// Otherwise: the number\n// Hint: use i % 3 == 0 etc.\nvoid fizzbuzz() {\n    // write here\n}",
                        solution: "void fizzbuzz() {\n    for (int i = 1; i <= 100; i++) {\n        if (i % 15 == 0) printf(\"FizzBuzz\\n\");\n        else if (i % 3 == 0) printf(\"Fizz\\n\");\n        else if (i % 5 == 0) printf(\"Buzz\\n\");\n        else printf(\"%d\\n\", i);\n    }\n}",
                        testCases: [{ input: "", expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n...FizzBuzz" }]
                    }
                ]
            },
            {
                title: "Mini Projects — Control Flow", order: 2,
                nodes: [
                    {
                        title: "Project: Number Guessing Game in C", type: "lesson", order: 1,
                        content: `## Project: Number Guessing Game\n\n\`\`\`c\n#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n\nint main() {\n    srand(time(NULL));  // Seed random with current time\n    int secret = rand() % 100 + 1;\n    int guess, attempts = 0;\n    \n    printf("=== Guessing Game (1-100) ===\\n");\n    \n    do {\n        printf("\\nAttempt %d — Your guess: ", attempts + 1);\n        scanf("%d", &guess);\n        attempts++;\n        \n        if (guess == secret) {\n            printf("🎉 Correct in %d attempts!\\n", attempts);\n        } else if (guess < secret) {\n            printf("Too low! 📉\\n");\n        } else {\n            printf("Too high! 📈\\n");\n        }\n    } while (guess != secret);\n    \n    return 0;\n}\n\`\`\`\n\n**Extensions:**\n- 🔥 Add max 7 attempts (use for loop, game over if not guessed)\n- 🔥 Show "Very close!" if within 5 of the answer`
                    }
                ]
            }
        ]
    },

    {
        title: "Functions and Modular Programming", order: 5,
        chapters: [
            {
                title: "Functions in C", order: 1,
                nodes: [
                    {
                        title: "Defining Functions", type: "lesson", order: 1,
                        content: `## Functions in C\n\nIn C, every function must declare its **return type** and **parameter types**.\n\n\`\`\`c\n#include <stdio.h>\n\n// Function declaration (prototype) — tells compiler it exists\n// Can be in a .h header file\nfloat circle_area(float radius);\nint factorial(int n);\nvoid print_separator(int width);\n\nint main() {\n    printf("Area: %.2f\\n", circle_area(5.0f));  // 78.54\n    printf("5! = %d\\n", factorial(5));            // 120\n    print_separator(20);\n    return 0;\n}\n\n// Function definitions\nfloat circle_area(float radius) {\n    return 3.14159f * radius * radius;\n}\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);  // Recursion!\n}\n\nvoid print_separator(int width) {\n    for (int i = 0; i < width; i++) printf("-");\n    printf("\\n");\n    // No return needed for void functions\n}\n\`\`\``
                    },
                    {
                        title: "Pass by Value vs Pointer", type: "lesson", order: 2,
                        content: `## Pass by Value vs Pass by Pointer\n\nC passes arguments **by value** — the function gets a copy, not the original.\n\n\`\`\`c\n#include <stdio.h>\n\n// Pass by value — original unchanged\nvoid try_double_value(int x) {\n    x = x * 2;  // Only the copy changes!\n}\n\n// Pass by pointer — original IS changed\nvoid double_by_pointer(int *x) {\n    *x = *x * 2;  // Dereference to change the original\n}\n\n// Swap using pointers\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int n = 5;\n    try_double_value(n);\n    printf("%d\\n", n);   // 5 — unchanged!\n    \n    double_by_pointer(&n);  // & passes the address\n    printf("%d\\n", n);   // 10 — changed!\n    \n    int x = 3, y = 7;\n    swap(&x, &y);\n    printf("x=%d y=%d\\n", x, y);  // x=7 y=3\n    \n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Functions Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What return type means the function returns nothing in C?", options: ["null", "empty", "void", "none"], correctAnswer: 2 },
                            { question: "C passes arguments by:", options: ["Reference", "Value (a copy)", "Pointer always", "Depends on type"], correctAnswer: 1 },
                            { question: "How do you pass a variable by reference in C?", options: ["Using 'ref' keyword", "Passing &variable", "Using 'out' keyword", "C doesn't support this"], correctAnswer: 1 },
                            { question: "What is a function prototype in C?", options: ["A test function", "A declaration with no body that tells the compiler a function exists", "A function pointer", "An abstract function"], correctAnswer: 1 }
                        ]
                    },
                    {
                        title: "Recursion Challenge", type: "challenge", order: 4,
                        starterCode: "int fibonacci(int n) {\n    // Return the nth Fibonacci number\n    // F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)\n}",
                        solution: "int fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n-1) + fibonacci(n-2);\n}",
                        testCases: [
                            { input: "0", expectedOutput: "0" },
                            { input: "7", expectedOutput: "13" },
                            { input: "10", expectedOutput: "55" }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Functions", order: 2,
                nodes: [
                    {
                        title: "Project: Palindrome & Prime in C", type: "lesson", order: 1,
                        content: `## Project: Palindrome and Prime Checker in C\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n#include <math.h>\n\nint is_palindrome(char str[]) {\n    int left = 0;\n    int right = strlen(str) - 1;\n    while (left < right) {\n        if (tolower(str[left]) != tolower(str[right]))\n            return 0;  // Not palindrome\n        left++; right--;\n    }\n    return 1;  // Is palindrome\n}\n\nint is_prime(int n) {\n    if (n < 2) return 0;\n    for (int i = 2; i <= (int)sqrt(n); i++) {\n        if (n % i == 0) return 0;\n    }\n    return 1;\n}\n\nvoid print_primes(int limit) {\n    printf("Primes up to %d: ", limit);\n    for (int i = 2; i <= limit; i++) {\n        if (is_prime(i)) printf("%d ", i);\n    }\n    printf("\\n");\n}\n\nint main() {\n    char word[100];\n    int num;\n    \n    printf("Enter a word: ");\n    scanf("%s", word);\n    printf("%s is%s a palindrome\\n",\n           word, is_palindrome(word) ? "" : " NOT");\n    \n    printf("Enter a number: ");\n    scanf("%d", &num);\n    printf("%d is%s prime\\n",\n           num, is_prime(num) ? "" : " NOT");\n    \n    print_primes(50);\n    return 0;\n}\n\`\`\``
                    }
                ]
            }
        ]
    }
];
