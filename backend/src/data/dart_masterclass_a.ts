// Dart Masterclass — Part A (Sections 1-5)
export const dartMasterclassPartA = [
    {
        title: "Introduction to Programming", order: 1,
        chapters: [
            {
                title: "Dart — The UI Optimized Language", order: 1,
                nodes: [
                    {
                        title: "What is Dart?", type: "lesson", order: 1,
                        content: `## Dart — Built for UIs\n\nDart was created by Google in 2011. While it started as a web language, it exploded in popularity because it is the language behind **Flutter** — Google's framework for building iOS, Android, macOS, Windows, and web apps from a single codebase.\n\nDart is an object-oriented, strongly typed language with C-style syntax. It feels very familiar if you know Java, C++, or JavaScript.\n\n**Why learn Dart?**\n- It's the only language you need to build Flutter apps\n- Runs surprisingly fast (compiles to ARM/x64 machine code for mobile)\n- Can also compile to JavaScript for the web\n- Built-in support for async programming (Futures and Streams)\n\n## Your First Dart Program\n\`\`\`dart\n// Every Dart program starts execution from the main() function\nvoid main() {\n  // Print outputs to the console\n  print('Hello, World! 🌍');\n}\n\`\`\`\n\n**Key rules:**\n- \`main()\` is required\n- Every statement must end with a semicolon \`;\`\n- Single quotes \`' '\` are preferred over double quotes \`" "\` for strings`
                    },
                    {
                        title: "Dart Execution and Tools", type: "lesson", order: 2,
                        content: `## How Dart Runs\n\nDart is incredibly flexible because it can be compiled in two different ways:\n\n**1. JIT (Just-In-Time) Compilation:**\nUsed during development. It compiles your code on the fly as it runs. This enables Flutter's famous "Hot Reload" feature — you save your file, and the app updates instantly without losing state.\n\n**2. AOT (Ahead-Of-Time) Compilation:**\nUsed when releasing your app to the App Store or Play Store. It compiles Dart directly into native machine code (ARM/x64). This makes Dart apps start instantly and run at 60 or 120 frames per second.\n\n**Running Dart via Terminal:**\n\`\`\`bash\n# Run a dart file\ndart run myapp.dart\n\n# Or compile it to a native executable!\ndart compile exe myapp.dart\n./myapp.exe\n\`\`\``
                    },
                    {
                        title: "Intro Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What popular UI framework uses Dart?", options: ["React Native", "Flutter", "SwiftUI", "Angular"], correctAnswer: 1 },
                            { question: "What is the entry point of a Dart program?", options: ["app()", "run()", "main()", "start()"], correctAnswer: 2 },
                            { question: "Which feature makes Dart great for rapid development?", options: ["Machine learning", "Hot Reload via JIT", "Pointers", "Manual memory management"], correctAnswer: 1 },
                            { question: "Does Dart require semicolons?", options: ["Yes", "No", "Only on the last line", "Only inside functions"], correctAnswer: 0 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Intro", order: 2,
                nodes: [
                    {
                        title: "Project: Interactive Greeter", type: "lesson", order: 1,
                        content: `## Project: Interactive Greeter\n\n\`\`\`dart\nimport 'dart:io';\n\nvoid main() {\n  print('What is your name?');\n  String? name = stdin.readLineSync(); // Read input\n  \n  print('What year were you born?');\n  String? yearStr = stdin.readLineSync();\n  \n  if (name != null && yearStr != null) {\n    int year = int.parse(yearStr);\n    int age = DateTime.now().year - year;\n    \n    print('\\n========================');\n    print('  Hello, \$name! 👋');\n    print('  You turn \$age this year.');\n    print('========================\\n');\n  }\n}\n\`\`\`\n\n**Key concepts:**\n- \`dart:io\` — required for console input/output\n- \`stdin.readLineSync()\` — reads a line of text (like Python's input())\n- \`String?\` — the \`?\` means the value could be null\n- \`\$name\` — string interpolation to insert variables into text`
                    }
                ]
            }
        ]
    },

    {
        title: "Programming Fundamentals", order: 2,
        chapters: [
            {
                title: "Variables and Sound Null Safety", order: 1,
                nodes: [
                    {
                        title: "Variables and Types", type: "lesson", order: 1,
                        content: `## Dart Variables\n\nDart has strong typing, but you don't always have to write the types. Dart can infer them!\n\n\`\`\`dart\nvoid main() {\n  // Explicit typing (Classic C/Java style)\n  String name = 'Alice';\n  int age = 22;\n  double height = 1.65;\n  bool isEnrolled = true;\n  \n  // Implicit typing using 'var' (Dart infers the type)\n  var city = 'London'; // Automatically typed as String\n  // city = 10;        // Error! Once a String, always a String\n  \n  // 'dynamic' allows the type to change (like Python/JS)\n  // AVOID THIS unless absolutely necessary!\n  dynamic magic = 42;\n  magic = 'Now I am a string'; // Legal, but dangerous\n  \n  // Constants\n  final timeNow = DateTime.now(); // Set once at runtime\n  const pi = 3.14159;             // Set at compile-time (hardcoded)\n}\n\`\`\`\n\n**String Interpolation:**\n\`\`\`dart\nString name = "Bob";\nint score = 45;\n// Use \$ for variables, \${} for expressions\nprint('\$name has \${score * 2} points.'); \n\`\`\``
                    },
                    {
                        title: "Sound Null Safety", type: "lesson", order: 2,
                        content: `## Sound Null Safety in Dart\n\nIn older languages (like Java or C), any variable can secretly be \`null\` (empty), causing the dreaded "Null Pointer Exception" that crashes apps.\n\nDart fixed this with **Sound Null Safety**. By default, variables CANNOT be null!\n\n\`\`\`dart\nvoid main() {\n  int age = 20;     // Must always hold a number. Cannot be null.\n  // age = null;    // Compile OUTRAGE! 🛑\n  \n  // If a variable MIGHT be empty, add a ? to the type\n  String? middleName; // Correct! Defaults to null\n  \n  middleName = "Danger";\n  \n  // To use a nullable variable safely, check if it's null first\n  if (middleName != null) {\n    print('Length: \${middleName.length}');\n  }\n  \n  // Or use the ? operator (returns null if middleName is null)\n  print('Length: \${middleName?.length}');\n  \n  // Using ?? to provide a fallback value\n  String nameToPrint = middleName ?? 'No Middle Name';\n}\n\`\`\``
                    },
                    {
                        title: "Null Safety Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does 'var' do in Dart?", options: ["Creates a dynamic variable", "Infers the type based on the initial value", "Makes a variable constant", "Creates a null variable"], correctAnswer: 1 },
                            { question: "What is the difference between final and const?", options: ["None", "final is set at compile-time, const at runtime", "final is set once at runtime, const must be known at compile-time", "const can be changed, final cannot"], correctAnswer: 2 },
                            { question: "How do you declare a String that is allowed to be null?", options: ["String! name", "String? name", "nullable String name", "String name = null"], correctAnswer: 1 },
                            { question: "What does the ?? operator do?", options: ["Throws an error", "Returns the left side if not null, otherwise the right side", "Checks if both sides are equal", "Makes a variable nullable"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Input and Output", order: 2,
                nodes: [
                    {
                        title: "Input/Output and Operators", type: "lesson", order: 1,
                        content: `## Input, Output, and Operators\n\n**Basic I/O:**\n\`\`\`dart\nimport 'dart:io';\n\nvoid main() {\n  stdout.write('Enter price: '); // write doesn't add a newline\n  String? input = stdin.readLineSync();\n  \n  if (input != null) {\n    double price = double.parse(input); // Convert String to double\n    print('Total with tax: \${price * 1.2}');\n  }\n}\n\`\`\`\n\n**Operators:**\n\`\`\`dart\nvoid main() {\n  int a = 10, b = 3;\n  \n  // Arithmetic\n  print(a + b);   // 13\n  print(a / b);   // 3.333... (division always returns double)\n  print(a ~/ b);  // 3 (integer division, drops the decimal)\n  print(a % b);   // 1 (modulo)\n  \n  // Cascade operator (..) — incredibly useful in Flutter!\n  // Allows calling multiple methods on the same object\n  List<int> list = [1, 2]\n    ..add(3)\n    ..add(4)\n    ..remove(1);\n  print(list); // [2, 3, 4]\n}\n\`\`\``
                    }
                ]
            },
            {
                title: "Mini Projects — Fundamentals", order: 3,
                nodes: [
                    {
                        title: "Project: Bill Splitter in Dart", type: "lesson", order: 1,
                        content: `## Project: Bill Splitter\n\n\`\`\`dart\nimport 'dart:io';\n\nvoid main() {\n  print('--- Bill Splitter ---');\n  \n  stdout.write('Total Bill ($): ');\n  double bill = double.parse(stdin.readLineSync() ?? '0');\n  \n  stdout.write('Tip percentage (e.g. 15): ');\n  double tipPct = double.parse(stdin.readLineSync() ?? '0');\n  \n  stdout.write('Number of people: ');\n  int people = int.parse(stdin.readLineSync() ?? '1');\n  \n  double tipAmount = bill * (tipPct / 100);\n  double total = bill + tipAmount;\n  double perPerson = total / people;\n  \n  print('\\n--- Summary ---');\n  // toStringAsFixed(2) rounds to 2 decimal places\n  print('Bill:        \$\${bill.toStringAsFixed(2)}');\n  print('Tip:         \$\${tipAmount.toStringAsFixed(2)}');\n  print('Total:       \$\${total.toStringAsFixed(2)}');\n  print('Per Person:  \$\${perPerson.toStringAsFixed(2)}');\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Collections and Type Systems", order: 3,
        chapters: [
            {
                title: "Lists, Sets, and Maps", order: 1,
                nodes: [
                    {
                        title: "Collections in Dart", type: "lesson", order: 1,
                        content: `## Dart Collections (Lists, Sets, Maps)\n\n**1. Lists (Ordered Arrays)**\n\`\`\`dart\nvoid main() {\n  List<String> fruits = ['Apple', 'Banana'];  // Fixed type list\n  fruits.add('Mango');\n  print(fruits[0]);    // Apple\n  print(fruits.length); // 3\n  \n  // Collection if & for (Awesome Dart features for UI!)\n  bool addCherry = true;\n  List<String> moreFruits = [\n    'Peach',\n    if (addCherry) 'Cherry',   // Adds conditionally!\n    for (var f in fruits) 'Super \$f', // Spreads another list\n  ];\n  print(moreFruits); // [Peach, Cherry, Super Apple, Super Banana, Super Mango]\n}\n\`\`\`\n\n**2. Sets (Unique items, no order)**\n\`\`\`dart\nSet<int> numbers = {1, 2, 2, 3}; \nprint(numbers); // {1, 2, 3} (duplicates ignored!)\n\`\`\`\n\n**3. Maps (Key-Value pairs, like dicts in Python)**\n\`\`\`dart\nMap<String, int> scores = {\n  'Alice': 95,\n  'Bob': 88\n};\nscores['Carol'] = 92;\nprint(scores['Alice']); // 95\n\`\`\``
                    },
                    {
                        title: "Type Casting and Parsing", type: "lesson", order: 2,
                        content: `## Type Casting and Conversions\n\n\`\`\`dart\nvoid main() {\n  // String to Number\n  int a = int.parse('42');\n  double b = double.parse('3.14');\n  \n  // Safe parsing (returns null if it fails)\n  int? safeAge = int.tryParse('hello'); \n  print(safeAge); // null\n  \n  // Number to String\n  String piStr = 3.14159.toString();\n  String rounded = 3.14159.toStringAsFixed(2); // "3.14"\n  \n  // The 'as' and 'is' operators for types\n  dynamic value = 'Dart';\n  \n  if (value is String) {\n    print('It is a string of length \${value.length}');\n  }\n  \n  // Force casting (will crash if wrong!)\n  String text = value as String; \n}\n\`\`\``
                    },
                    {
                        title: "Collections Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "Which collection type ignores duplicate values?", options: ["List", "Set", "Map", "Array"], correctAnswer: 1 },
                            { question: "What is Dart's Collection 'if' used for?", options: ["If-else statements", "Adding items to a list conditionally during declaration", "Filtering lists after creation", "Checking if a list is empty"], correctAnswer: 1 },
                            { question: "How do you safely parse a string 'abc' to an int so it returns null instead of crashing?", options: ["int.parse('abc')", "int.tryParse('abc')", "(int)'abc'", "parseSafe('abc')"], correctAnswer: 1 },
                            { question: "What does the 'is' operator do?", options: ["Checks equality", "Assigns a variable", "Checks if an object is of a specific type", "Casts a variable to a type"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Collections", order: 2,
                nodes: [
                    {
                        title: "Project: Unique Word Counter", type: "lesson", order: 1,
                        content: `## Project: Unique Word Counter\n\nUsing a Map to count frequencies, and a Set for unique words.\n\n\`\`\`dart\nvoid main() {\n  String text = "the quick brown fox jumps over the lazy dog and the fox respects the dog";\n  \n  List<String> words = text.split(' ');\n  \n  // Map to count occurrences\n  Map<String, int> frequencies = {};\n  \n  for (String word in words) {\n    if (frequencies.containsKey(word)) {\n      frequencies[word] = frequencies[word]! + 1; // ! asserts not null\n    } else {\n      frequencies[word] = 1;\n    }\n  }\n  \n  print('--- Word Frequencies ---');\n  frequencies.forEach((word, count) {\n    print('\$word: \$count');\n  });\n  \n  // Set to get unique words instantly\n  Set<String> uniqueWords = words.toSet();\n  print('\\nTotal words: \${words.length}');\n  print('Unique words: \${uniqueWords.length}');\n}\n\`\`\``
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
                        title: "if/else and switch", type: "lesson", order: 1,
                        content: `## Conditional Statements\n\n\`\`\`dart\nvoid main() {\n  int score = 85;\n  \n  if (score >= 90) {\n    print('A');\n  } else if (score >= 80) {\n    print('B');\n  } else {\n    print('C');\n  }\n  \n  // Dart 3.0 enhanced switch statements (Pattern matching!)\n  String grade = 'B';\n  \n  switch (grade) {\n    case 'A':\n      print('Excellent!');\n      break;\n    case 'B':\n    case 'C':\n      print('Passed!');\n      break;\n    default:\n      print('Failed.');\n  }\n  \n  // Switch Expressions (Dart 3.0+ — Return values directly from switch!)\n  String status = switch (score) {\n    >= 90 => 'Distinction',\n    >= 50 => 'Pass',\n    _ => 'Fail'  // _ means default\n  };\n  print(status);\n}\n\`\`\``
                    },
                    {
                        title: "Loops", type: "lesson", order: 2,
                        content: `## Loops in Dart\n\n\`\`\`dart\nvoid main() {\n  // Standard for loop\n  for (int i = 0; i < 5; i++) {\n    print(i);\n  }\n  \n  // for-in loop (great for Lists)\n  List<String> heroes = ['Batman', 'Superman', 'Flash'];\n  for (String hero in heroes) {\n    print(hero);\n  }\n  \n  // while loop\n  int count = 3;\n  while (count > 0) {\n    print('Countdown: \$count');\n    count--;\n  }\n  \n  // Using break and continue\n  for (int i = 1; i <= 10; i++) {\n    if (i == 5) continue; // Skip 5\n    if (i == 8) break;    // Stop at 8\n    print(i); // Prints 1,2,3,4,6,7\n  }\n}\n\`\`\``
                    },
                    {
                        title: "FizzBuzz Challenge", type: "challenge", order: 3,
                        starterCode: "void fizzbuzz(int n) {\n  // Print 1 to n. \n  // Multiples of 3 = Fizz\n  // Multiples of 5 = Buzz\n  // Both = FizzBuzz\n}",
                        solution: "void fizzbuzz(int n) {\n  for (int i = 1; i <= n; i++) {\n    if (i % 15 == 0) print('FizzBuzz');\n    else if (i % 3 == 0) print('Fizz');\n    else if (i % 5 == 0) print('Buzz');\n    else print(i);\n  }\n}",
                        testCases: [{ input: "15", expectedOutput: "1\\n2\\nFizz\\n...FizzBuzz" }]
                    }
                ]
            },
            {
                title: "Mini Projects — Control Flow", order: 2,
                nodes: [
                    {
                        title: "Project: Number Guessing Game", type: "lesson", order: 1,
                        content: `## Project: Number Guessing Game in Dart\n\n\`\`\`dart\nimport 'dart:io';\nimport 'dart:math';\n\nvoid main() {\n  Random random = Random();\n  int secret = random.nextInt(100) + 1; // 1 to 100\n  int attempts = 0;\n  bool guessed = false;\n  \n  print('=== Guess the Number (1-100) ===');\n  \n  while (!guessed) {\n    stdout.write('Attempt \${attempts + 1} - Guess: ');\n    String? input = stdin.readLineSync();\n    int? guess = int.tryParse(input ?? '');\n    \n    if (guess == null) {\n      print('Please enter a valid number.');\n      continue;\n    }\n    \n    attempts++;\n    \n    if (guess == secret) {\n      print('🎉 Correct! You guessed it in \$attempts attempts.');\n      guessed = true;\n    } else if (guess < secret) {\n      print('Too low! 📉');\n    } else {\n      print('Too high! 📈');\n    }\n  }\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Functions and Modular Programming", order: 5,
        chapters: [
            {
                title: "Dart Functions", order: 1,
                nodes: [
                    {
                        title: "Positional and Named Parameters", type: "lesson", order: 1,
                        content: `## Defining Functions in Dart\n\nDart functions are objects. You can pass them around like variables!\n\n\`\`\`dart\n// Basic function\nint add(int a, int b) {\n  return a + b;\n}\n\n// Arrow syntax (great for single-line functions)\nint multiply(int a, int b) => a * b;\n\n// Named Parameters (crucial for Flutter UI!)\n// Wrap parameters in { } to name them. By default they are optional (nullable)\nvoid createUser({String? name, int? age}) {\n  print('\$name is \$age');\n}\n\n// Required Named Parameters (use 'required' keyword)\nvoid transfer({required String from, required String to, required double amount}) {\n  print('\$\${amount} moved from \$from to \$to');\n}\n\nvoid main() {\n  print(add(5, 3));\n  \n  // Named parameters mean order doesn't matter!\n  transfer(amount: 100.5, to: 'Bob', from: 'Alice');\n}\n\`\`\``
                    },
                    {
                        title: "Anonymous Functions and Closures", type: "lesson", order: 2,
                        content: `## Anonymous Functions (Lambdas)\n\nFunctions without names that you pass directly to other methods.\n\n\`\`\`dart\nvoid main() {\n  List<String> fruits = ['apple', 'banana', 'cherry'];\n  \n  // Using an anonymous function inside forEach\n  fruits.forEach((element) {\n    print('I love \${element.toUpperCase()}');\n  });\n  \n  // Using map to transform data (arrow syntax)\n  List<int> lengths = fruits.map((f) => f.length).toList();\n  print(lengths); // [5, 6, 6]\n  \n  // Filtering a list\n  List<String> bFruits = fruits.where((f) => f.startsWith('b')).toList();\n  print(bFruits); // [banana]\n}\n\`\`\``
                    },
                    {
                        title: "Functions Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does the => syntax do in Dart?", options: ["Greater than or equal to", "Defines a getter", "A shorthand for { return expr; }", "Creates an arrow"], correctAnswer: 2 },
                            { question: "How do you make parameters positional but optional?", options: ["Wrap them in [ ]", "Wrap them in { }", "Use the ? symbol", "Use the 'optional' keyword"], correctAnswer: 0 },
                            { question: "How do you define named parameters?", options: ["Wrap them in [ ]", "Wrap them in { }", "Prefix them with $", "Dart always has named parameters"], correctAnswer: 1 },
                            { question: "What does the required keyword do for named parameters?", options: ["Forces the user to provide that parameter", "Makes it compile-time constant", "Makes it synchronous", "Locks the variable"], correctAnswer: 0 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Functions", order: 2,
                nodes: [
                    {
                        title: "Project: List Processor", type: "lesson", order: 1,
                        content: `## Project: List Processor using Lambdas\n\n\`\`\`dart\nvoid main() {\n  List<int> numbers = [12, 45, 9, 32, 18, 77, 4, 21];\n  \n  // 1. Filter: Keep only numbers > 20\n  var bigNumbers = numbers.where((n) => n > 20).toList();\n  print('Big numbers: \$bigNumbers');\n  \n  // 2. Map: Square all numbers\n  var squares = numbers.map((n) => n * n).toList();\n  print('Squares: \$squares');\n  \n  // 3. Reduce: Find the sum of all numbers\n  var sum = numbers.reduce((value, element) => value + element);\n  print('Sum: \$sum');\n  \n  // 4. Sort: Sort ascending\n  numbers.sort((a, b) => a.compareTo(b));\n  print('Sorted: \$numbers');\n}\n\`\`\``
                    }
                ]
            }
        ]
    }
];
