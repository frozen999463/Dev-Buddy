// C Masterclass — Part B (Sections 6-9)
export const cMasterclassPartB = [
    {
        title: "Memory and Low-Level Concepts", order: 6,
        chapters: [
            {
                title: "Pointers and Memory", order: 1,
                nodes: [
                    {
                        title: "Pointers in C", type: "lesson", order: 1,
                        content: `## Pointers — The Heart of C\n\nEvery variable lives at a specific address in RAM. A **pointer** is a variable that stores another variable's address.\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    int age = 25;\n    \n    // & = address-of operator\n    printf("Value: %d\\n", age);    // 25\n    printf("Address: %p\\n", &age); // 0x7fff... (some address)\n    \n    // Declare a pointer\n    int *pAge = &age;   // pAge stores age's address\n    \n    printf("Pointer holds: %p\\n", pAge);    // Same as &age\n    printf("Pointer value: %d\\n", *pAge);   // 25 (dereference)\n    \n    // Change the value THROUGH the pointer\n    *pAge = 30;\n    printf("age is now: %d\\n", age);  // 30!\n    \n    // NULL pointer — safe default\n    int *p = NULL;  // Always initialise pointers!\n    if (p == NULL) {\n        printf("Pointer is NULL — not yet set.\\n");\n    }\n    \n    return 0;\n}\n\`\`\`\n\n**Remember:**\n- \`int *p\` — p is a pointer to an int\n- \`&x\` — the address of x\n- \`*p\` — the value at the address p holds (dereference)`
                    },
                    {
                        title: "Structs in C", type: "lesson", order: 2,
                        content: `## Structs — Grouping Data in C\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>\n\n// Define the struct type\ntypedef struct {\n    char name[50];\n    int age;\n    float gpa;\n} Student;  // typedef lets us use 'Student' instead of 'struct Student'\n\nvoid print_student(Student s) {\n    printf("Name: %s | Age: %d | GPA: %.2f\\n",\n           s.name, s.age, s.gpa);\n}\n\nStudent top_student(Student arr[], int n) {\n    Student top = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i].gpa > top.gpa) top = arr[i];\n    }\n    return top;\n}\n\nint main() {\n    Student s1;\n    strcpy(s1.name, "Alice");\n    s1.age = 20;\n    s1.gpa = 3.85f;\n    print_student(s1);\n    \n    // Array of structs\n    Student class[3] = {\n        {"Alice", 20, 3.85f},\n        {"Bob", 21, 3.60f},\n        {"Carol", 19, 3.90f}\n    };\n    \n    for (int i = 0; i < 3; i++) print_student(class[i]);\n    \n    Student top = top_student(class, 3);\n    printf("Top: %s\\n", top.name);\n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Dynamic Memory Allocation", type: "lesson", order: 3,
                        content: `## Dynamic Memory in C — malloc and free\n\n\`\`\`c\n#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n;\n    printf("How many numbers? ");\n    scanf("%d", &n);\n    \n    // malloc — allocate n * 4 bytes on the heap\n    int *arr = (int *)malloc(n * sizeof(int));\n    \n    if (arr == NULL) {  // ALWAYS check!\n        printf("Memory allocation failed!\\n");\n        return 1;\n    }\n    \n    // Fill the array\n    for (int i = 0; i < n; i++) {\n        printf("Enter number %d: ", i + 1);\n        scanf("%d", &arr[i]);\n    }\n    \n    // Print and calculate sum\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n        sum += arr[i];\n    }\n    printf("\\nSum: %d | Avg: %.2f\\n",\n           sum, (float)sum / n);\n    \n    free(arr);     // MUST free!\n    arr = NULL;    // Good practice\n    \n    return 0;\n}\n\`\`\`\n\n**calloc vs malloc:**\n\`\`\`c\n// malloc — allocates uninitialized memory\nint *a = (int *)malloc(n * sizeof(int));\n\n// calloc — allocates AND zeros the memory\nint *b = (int *)calloc(n, sizeof(int));\n\`\`\``
                    },
                    {
                        title: "Memory Quiz", type: "quiz", order: 4,
                        questions: [
                            { question: "What does the & operator return?", options: ["The value", "The type", "The memory address", "Nothing"], correctAnswer: 2 },
                            { question: "What does *ptr do when ptr is a pointer?", options: ["Multiplies", "Gets the address", "Gets the value at the address", "Declares a pointer"], correctAnswer: 2 },
                            { question: "What C function must you call after malloc to avoid memory leaks?", options: ["delete()", "release()", "free()", "destroy()"], correctAnswer: 2 },
                            { question: "What should you always do after declaring a pointer?", options: ["Use it immediately", "Initialize it (to NULL or an address)", "Print it", "Cast it to int"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Memory", order: 2,
                nodes: [
                    {
                        title: "Project: Dynamic Student Records", type: "lesson", order: 1,
                        content: `## Project: Dynamic Student Record System\n\n\`\`\`c\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    char name[50];\n    int roll;\n    float gpa;\n} Student;\n\nvoid print_student(Student s) {\n    printf("Roll: %3d | %-15s | GPA: %.2f\\n",\n           s.roll, s.name, s.gpa);\n}\n\nvoid sort_by_gpa(Student *arr, int n) {\n    // Bubble sort\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j].gpa < arr[j+1].gpa) {\n                Student temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n}\n\nint main() {\n    int n;\n    printf("Number of students: ");\n    scanf("%d", &n);\n    \n    Student *students = (Student *)malloc(n * sizeof(Student));\n    if (!students) { printf("Error!\\n"); return 1; }\n    \n    for (int i = 0; i < n; i++) {\n        students[i].roll = i + 1;\n        printf("Name: "); scanf("%s", students[i].name);\n        printf("GPA: ");  scanf("%f", &students[i].gpa);\n    }\n    \n    sort_by_gpa(students, n);\n    printf("\\n=== Ranked by GPA ===\\n");\n    for (int i = 0; i < n; i++) print_student(students[i]);\n    \n    free(students);\n    return 0;\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "File Handling", order: 7,
        chapters: [
            {
                title: "Reading and Writing Files", order: 1,
                nodes: [
                    {
                        title: "File I/O in C", type: "lesson", order: 1,
                        content: `## File Operations in C\n\n\`\`\`c\n#include <stdio.h>\n\nint main() {\n    // Writing\n    FILE *fp = fopen("data.txt", "w");\n    if (fp == NULL) {\n        perror("Error opening file");\n        return 1;\n    }\n    fprintf(fp, "Name: Alice\\n");\n    fprintf(fp, "Score: %d\\n", 95);\n    fclose(fp);  // MUST close the file!\n    \n    // Reading line by line\n    FILE *fp2 = fopen("data.txt", "r");\n    if (fp2 == NULL) { perror("Error"); return 1; }\n    \n    char line[100];\n    while (fgets(line, sizeof(line), fp2) != NULL) {\n        printf("%s", line);  // Print each line\n    }\n    fclose(fp2);\n    \n    // Appending\n    FILE *fp3 = fopen("data.txt", "a");\n    fprintf(fp3, "City: Mumbai\\n");\n    fclose(fp3);\n    \n    return 0;\n}\n\`\`\`\n\n| Mode | Meaning |\n|------|----------|\n| \`"r"\` | Read |\n| \`"w"\` | Write (overwrites!) |\n| \`"a"\` | Append |\n| \`"r+"\` | Read and write |`
                    },
                    {
                        title: "Struct-Based File Storage", type: "lesson", order: 2,
                        content: `## Saving Structs to Binary Files\n\nBinary files store data in the same format as memory — fast and compact.\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char name[50];\n    int age;\n    float gpa;\n} Student;\n\nvoid save_students(Student arr[], int n, char *filename) {\n    FILE *fp = fopen(filename, "wb");  // 'b' = binary mode\n    if (!fp) { perror("Error"); return; }\n    fwrite(arr, sizeof(Student), n, fp);\n    fclose(fp);\n    printf("Saved %d records.\\n", n);\n}\n\nvoid load_students(Student arr[], int *n, char *filename) {\n    FILE *fp = fopen(filename, "rb");\n    if (!fp) { *n = 0; return; }\n    *n = fread(arr, sizeof(Student), 10, fp);\n    fclose(fp);\n}\n\nint main() {\n    Student students[3] = {\n        {"Alice", 20, 3.85f},\n        {"Bob", 21, 3.60f},\n        {"Carol", 19, 3.90f}\n    };\n    save_students(students, 3, "students.bin");\n    \n    Student loaded[10];\n    int count;\n    load_students(loaded, &count, "students.bin");\n    printf("Loaded %d students:\\n", count);\n    for (int i = 0; i < count; i++)\n        printf("%s: %.2f\\n", loaded[i].name, loaded[i].gpa);\n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "File Handling Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does fopen() return if the file cannot be opened?", options: ["0", "-1", "NULL", "false"], correctAnswer: 2 },
                            { question: "What is the correct way to read a line from a file in C?", options: ["scanf()", "gets()", "fgets()", "readline()"], correctAnswer: 2 },
                            { question: "What file mode opens a file for appending?", options: ["'r'", "'w'", "'a'", "'x'"], correctAnswer: 2 },
                            { question: "What must you always do after finishing with a file?", options: ["delete it", "fclose(fp)", "flush it", "rewind it"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Files", order: 2,
                nodes: [
                    {
                        title: "Project: Contact Book in C", type: "lesson", order: 1,
                        content: `## Project: Contact Book with File Storage\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\n\n#define MAX 100\n#define FILE_NAME "contacts.txt"\n\ntypedef struct {\n    char name[50];\n    char phone[15];\n} Contact;\n\nContact contacts[MAX];\nint count = 0;\n\nvoid load() {\n    FILE *f = fopen(FILE_NAME, "r");\n    if (!f) return;\n    while (fscanf(f, "%s %s", contacts[count].name,\n                              contacts[count].phone) == 2)\n        count++;\n    fclose(f);\n}\n\nvoid save() {\n    FILE *f = fopen(FILE_NAME, "w");\n    for (int i = 0; i < count; i++)\n        fprintf(f, "%s %s\\n", contacts[i].name, contacts[i].phone);\n    fclose(f);\n}\n\nvoid add() {\n    printf("Name: "); scanf("%s", contacts[count].name);\n    printf("Phone: "); scanf("%s", contacts[count].phone);\n    count++;\n    save();\n    printf("Saved!\\n");\n}\n\nvoid display() {\n    printf("\\n%-20s %-15s\\n", "Name", "Phone");\n    printf("-------------------------------\\n");\n    for (int i = 0; i < count; i++)\n        printf("%-20s %-15s\\n", contacts[i].name, contacts[i].phone);\n}\n\nint main() {\n    load();\n    int choice;\n    do {\n        printf("\\n1. Add  2. View  3. Exit\\nChoice: ");\n        scanf("%d", &choice);\n        if (choice == 1) add();\n        else if (choice == 2) display();\n    } while (choice != 3);\n    return 0;\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Object-Oriented in C — Structs and Function Pointers", order: 8,
        chapters: [
            {
                title: "OOP Concepts in C", order: 1,
                nodes: [
                    {
                        title: "Simulating OOP with Structs", type: "lesson", order: 1,
                        content: `## OOP-Style Programming in C\n\nC doesn't have classes, but you can simulate OOP using structs and functions.\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>\n#include <math.h>\n\n// "Class" — a struct with data\ntypedef struct {\n    char name[30];\n    float x, y;  // Position\n    float health;\n    float attack;\n} Player;\n\n// "Methods" — functions that take the struct as first argument\nPlayer player_create(char name[], float x, float y) {\n    Player p;\n    strcpy(p.name, name);\n    p.x = x; p.y = y;\n    p.health = 100.0f;\n    p.attack = 15.0f;\n    return p;\n}\n\nvoid player_move(Player *p, float dx, float dy) {\n    p->x += dx;  // Arrow operator for pointer to struct\n    p->y += dy;\n}\n\nfloat player_distance(Player *a, Player *b) {\n    float dx = a->x - b->x;\n    float dy = a->y - b->y;\n    return sqrtf(dx*dx + dy*dy);\n}\n\nvoid player_attack(Player *attacker, Player *target) {\n    target->health -= attacker->attack;\n    printf("%s attacks %s! HP left: %.0f\\n",\n           attacker->name, target->name, target->health);\n}\n\nvoid player_print(Player *p) {\n    printf("Player: %s | Pos(%.0f,%.0f) | HP:%.0f\\n",\n           p->name, p->x, p->y, p->health);\n}\n\nint main() {\n    Player hero = player_create("Arthur", 0, 0);\n    Player enemy = player_create("Goblin", 5, 3);\n    \n    player_print(&hero);\n    player_print(&enemy);\n    \n    float dist = player_distance(&hero, &enemy);\n    printf("Distance: %.2f\\n", dist);\n    \n    player_move(&hero, 3, 2);\n    player_attack(&hero, &enemy);\n    player_attack(&enemy, &hero);\n    \n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "Enumerations in C", type: "lesson", order: 2,
                        content: `## Enumerations in C\n\n\`\`\`c\n#include <stdio.h>\n\n// Define named constants\ntypedef enum {\n    NORTH = 0,\n    SOUTH,\n    EAST,\n    WEST\n} Direction;\n\ntypedef enum {\n    EASY = 1,\n    MEDIUM,\n    HARD\n} Difficulty;\n\ntypedef enum {\n    RED = 1,\n    YELLOW,\n    GREEN\n} TrafficLight;\n\nvoid describe_direction(Direction d) {\n    switch (d) {\n        case NORTH: printf("Moving North\\n"); break;\n        case SOUTH: printf("Moving South\\n"); break;\n        case EAST:  printf("Moving East\\n");  break;\n        case WEST:  printf("Moving West\\n");  break;\n    }\n}\n\nint main() {\n    Direction d = NORTH;\n    describe_direction(d);\n    \n    Difficulty level = HARD;\n    printf("Difficulty: %d\\n", level);  // 3\n    \n    TrafficLight light = RED;\n    if (light == RED) printf("Stop!\\n");\n    else if (light == GREEN) printf("Go!\\n");\n    else printf("Caution!\\n");\n    \n    return 0;\n}\n\`\`\``
                    },
                    {
                        title: "C OOP Concepts Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "How do you access a struct member through a pointer in C?", options: ["(*p).member", "p->member", "Both are correct", "p.member"], correctAnswer: 2 },
                            { question: "What is an enum in C?", options: ["A special array", "A set of named integer constants", "A type of pointer", "A function type"], correctAnswer: 1 },
                            { question: "What is 0 in an enum by default?", options: ["The last value", "The first value", "An error", "Undefined"], correctAnswer: 1 },
                            { question: "How do you simulate OOP in C?", options: ["Use class keyword", "Use structs + functions that take the struct as a parameter", "Use virtual tables only", "C cannot simulate OOP"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Structs and Enums", order: 2,
                nodes: [
                    {
                        title: "Project: Simple Task Manager in C", type: "lesson", order: 1,
                        content: `## Project: Task Manager in C\n\n\`\`\`c\n#include <stdio.h>\n#include <string.h>\n\n#define MAX_TASKS 50\n\ntypedef enum { LOW, MEDIUM, HIGH } Priority;\n\ntypedef struct {\n    int id;\n    char title[100];\n    Priority priority;\n    int done;\n} Task;\n\nTask tasks[MAX_TASKS];\nint task_count = 0;\n\nconst char* priority_str(Priority p) {\n    switch (p) {\n        case HIGH:   return "HIGH";\n        case MEDIUM: return "MEDIUM";\n        default:     return "LOW";\n    }\n}\n\nvoid add_task() {\n    Task t;\n    t.id = task_count + 1;\n    t.done = 0;\n    printf("Title: "); scanf(" %[^\\n]", t.title);\n    int p;\n    printf("Priority (0=Low, 1=Medium, 2=High): ");\n    scanf("%d", &p);\n    t.priority = (Priority)p;\n    tasks[task_count++] = t;\n    printf("Task #%d added!\\n", t.id);\n}\n\nvoid complete_task() {\n    int id;\n    printf("Task ID to complete: ");\n    scanf("%d", &id);\n    for (int i = 0; i < task_count; i++) {\n        if (tasks[i].id == id) {\n            tasks[i].done = 1;\n            printf("Task #%d marked done!\\n", id);\n            return;\n        }\n    }\n    printf("Not found.\\n");\n}\n\nvoid list_tasks() {\n    printf("\\n%-4s %-6s %-8s %s\\n", "ID", "Done", "Priority", "Title");\n    printf("--------------------------------------\\n");\n    for (int i = 0; i < task_count; i++) {\n        Task *t = &tasks[i];\n        printf("%-4d %-6s %-8s %s\\n",\n               t->id,\n               t->done ? "✓" : "○",\n               priority_str(t->priority),\n               t->title);\n    }\n}\n\nint main() {\n    int choice;\n    do {\n        printf("\\n1. Add  2. Complete  3. List  4. Exit\\nChoice: ");\n        scanf("%d", &choice);\n        if (choice == 1) add_task();\n        else if (choice == 2) complete_task();\n        else if (choice == 3) list_tasks();\n    } while (choice != 4);\n    return 0;\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Software Engineering Principles in C", order: 9,
        chapters: [
            {
                title: "Clean C Code and Debugging", order: 1,
                nodes: [
                    {
                        title: "Clean Code in C", type: "lesson", order: 1,
                        content: `## Writing Clean C Code\n\n**1. Use symbolic constants instead of magic numbers:**\n\`\`\`c\n// ❌ Bad\nif (score >= 90) printf("A");\nfor (int i = 0; i < 100; i++) ...\n\n// ✅ Good\n#define GRADE_A_THRESHOLD 90\n#define MAX_STUDENTS 100\n\nif (score >= GRADE_A_THRESHOLD) printf("A");\nfor (int i = 0; i < MAX_STUDENTS; i++) ...\n\`\`\`\n\n**2. One function, one job:**\n\`\`\`c\n// ❌ Bad — one function does everything\nvoid process_student(Student *s) {\n    display(s);\n    save_to_file(s);\n    send_email(s);\n}\n\n// ✅ Good — separate functions\nvoid display_student(Student *s) { ... }\nvoid save_student(Student *s, FILE *f) { ... }\nvoid notify_student(Student *s, char *email) { ... }\n\`\`\`\n\n**3. Use header files for modularity:**\n\`\`\`c\n// math_utils.h\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\n\nint is_prime(int n);\nint factorial(int n);\nfloat average(int arr[], int n);\n\n#endif\n\`\`\`\n\n**4. Always check return values:**\n\`\`\`c\n// ❌ Dangerous\nFILE *fp = fopen("data.txt", "r");\nfgets(line, 100, fp);  // Crashes if fp is NULL!\n\n// ✅ Safe\nFILE *fp = fopen("data.txt", "r");\nif (fp == NULL) {\n    perror("Failed to open file");\n    return EXIT_FAILURE;\n}\n\`\`\``
                    },
                    {
                        title: "Debugging C Programs", type: "lesson", order: 2,
                        content: `## Debugging in C\n\n**Common C bugs:**\n\n**1. Segmentation fault (accessing invalid memory):**\n\`\`\`c\n// ❌ Bug — accessing NULL pointer\nint *p = NULL;\n*p = 5;  // Segfault!\n\n// ❌ Bug — array out of bounds\nint arr[5];\narr[10] = 99;  // Undefined behaviour!\n\n// ❌ Bug — using freed memory\nfree(ptr);\nprintf("%d", *ptr);  // Use-after-free!\n\`\`\`\n\n**2. Using printf for debugging:**\n\`\`\`c\n#define DEBUG 1\n\nvoid calculate(int *arr, int n) {\n    #if DEBUG\n    printf("[DEBUG] n = %d\\n", n);\n    #endif\n    \n    for (int i = 0; i < n; i++) {\n        #if DEBUG\n        printf("[DEBUG] arr[%d] = %d\\n", i, arr[i]);\n        #endif\n        // ... process\n    }\n}\n\`\`\`\n\n**3. GDB — The GNU Debugger:**\n\`\`\`bash\ngcc -g main.c -o myapp   # Compile with debug symbols\ngdb ./myapp               # Start debugger\n(gdb) break main          # Set breakpoint at main\n(gdb) run                 # Run\n(gdb) next                # Next line\n(gdb) print variable_name # Print a variable\n(gdb) backtrace           # Show call stack\n(gdb) quit                # Exit\n\`\`\`\n\n**4. Valgrind — memory leak detector:**\n\`\`\`bash\nvalgrind --leak-check=full ./myapp\n# Reports exactly where you leak memory\n\`\`\``
                    },
                    {
                        title: "Software Engineering Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does a segmentation fault indicate?", options: ["Syntax error", "Accessing invalid/protected memory", "Logic error", "Division by zero"], correctAnswer: 1 },
                            { question: "What is the purpose of the #ifndef guard in a header file?", options: ["Speed up compilation", "Prevent multiple inclusions", "Define constants", "Declare structs"], correctAnswer: 1 },
                            { question: "What flag compiles C code with debug symbols for GDB?", options: ["-debug", "-D", "-g", "-O2"], correctAnswer: 2 },
                            { question: "What does Valgrind help detect?", options: ["Syntax errors", "Logic errors", "Memory leaks", "Compile errors"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — C Engineering", order: 2,
                nodes: [
                    {
                        title: "Project: Modular Student System", type: "lesson", order: 1,
                        content: `## Project: Multi-File Student System\n\nThis project teaches how to properly split C code across files.\n\n**student.h — Interface:**\n\`\`\`c\n#ifndef STUDENT_H\n#define STUDENT_H\n\n#define MAX_NAME 50\n#define MAX_STUDENTS 100\n\ntypedef struct {\n    int id;\n    char name[MAX_NAME];\n    float grades[5];  // 5 subjects\n    int grade_count;\n} Student;\n\nStudent student_create(int id, char name[]);\nvoid student_add_grade(Student *s, float grade);\nfloat student_average(Student *s);\nchar student_letter_grade(Student *s);\nvoid student_print(Student *s);\n\n#endif\n\`\`\`\n\n**student.c — Implementation:**\n\`\`\`c\n#include "student.h"\n#include <stdio.h>\n#include <string.h>\n\nStudent student_create(int id, char name[]) {\n    Student s;\n    s.id = id;\n    strcpy(s.name, name);\n    s.grade_count = 0;\n    return s;\n}\n\nvoid student_add_grade(Student *s, float grade) {\n    if (s->grade_count < 5)\n        s->grades[s->grade_count++] = grade;\n}\n\nfloat student_average(Student *s) {\n    if (s->grade_count == 0) return 0;\n    float sum = 0;\n    for (int i = 0; i < s->grade_count; i++)\n        sum += s->grades[i];\n    return sum / s->grade_count;\n}\n\nchar student_letter_grade(Student *s) {\n    float avg = student_average(s);\n    if (avg >= 90) return 'A';\n    if (avg >= 80) return 'B';\n    if (avg >= 70) return 'C';\n    if (avg >= 60) return 'D';\n    return 'F';\n}\n\nvoid student_print(Student *s) {\n    printf("ID: %d | %-20s | Avg: %5.1f | Grade: %c\\n",\n           s->id, s->name, student_average(s),\n           student_letter_grade(s));\n}\n\`\`\`\n\n**main.c:**\n\`\`\`c\n#include <stdio.h>\n#include "student.h"\n\nint main() {\n    Student s1 = student_create(1, "Alice");\n    student_add_grade(&s1, 90);\n    student_add_grade(&s1, 88);\n    student_add_grade(&s1, 95);\n    student_print(&s1);\n    \n    Student s2 = student_create(2, "Bob");\n    student_add_grade(&s2, 70);\n    student_add_grade(&s2, 65);\n    student_add_grade(&s2, 72);\n    student_print(&s2);\n    \n    return 0;\n}\n\`\`\`\n\n**Compile:**\n\`\`\`bash\ngcc main.c student.c -o student_system\n./student_system\n\`\`\``
                    }
                ]
            }
        ]
    }
];
