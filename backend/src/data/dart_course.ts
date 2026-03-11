export const dartCourse = {
    course: {
        title: "Dart: The Language of Flutter",
        slug: "dart-language-of-flutter",
        description: "Master Dart, the modern, scalable language created by Google. Build the foundation needed to create stunning mobile apps with Flutter.",
        status: "published"
    },
    sections: [
        {
            title: "Introduction to Programming", order: 1,
            chapters: [
                {
                    title: "Welcome to Dart", order: 1,
                    nodes: [
                        {
                            title: "What is Dart?", type: "lesson", order: 1,
                            content: "### The Language Built for UI\\n\\nDart is a modern, object-oriented language developed by Google. Why does it exist? Google wanted a language that was incredibly fast at painting user interfaces on screens (like your phone!).\\n\\nDart is the language that powers **Flutter**, the framework used to build apps for iOS, Android, Web, and Desktop all from a single codebase!\\n\\nIf you know JavaScript, Java, or C#, Dart will feel very familiar."
                        },
                        {
                            title: "Hello Dart", type: "lesson", order: 2,
                            content: "### Your First Dart App\\n\\nLike C, Dart needs a `main()` function to know where to start running your code.\\n\\n```dart\\nvoid main() {\\n  // This is a comment in Dart.\\n  print('Hello, Dart!');\\n}\\n```\\n\\n- `void` means the function doesn't return any data back to the system.\\n- `print()` displays text on the screen.\\n- Don't forget the semicolon `;` at the end of the line! Dart is strict about them."
                        }
                    ]
                }
            ]
        },
        {
            title: "Programming Basics", order: 2,
            chapters: [
                {
                    title: "Variables & Types", order: 1,
                    nodes: [
                        {
                            title: "Type Safety", type: "lesson", order: 1,
                            content: "### Safe and Sound Types\\n\\nDart is 'type-safe'. It wants to guarantee that a number is always a number. You have two ways to declare variables: statically or using inference.\\n\\n```dart\\n// Option 1: Explicit Typing\\nint age = 30;\\nString name = 'Google';\\nbool isAwesome = true;\\n\\n// Option 2: Inference (Let Dart figure it out)\\nvar score = 100; // Dart knows this is an int!\\n```\\nIf you use `var`, you *cannot* change it to a String later! Dart locks the type."
                        },
                        {
                            title: "final vs const", type: "lesson", order: 2,
                            content: "### Constants\\n\\nIf a value never changes, you shouldn't use `var`. Use `final` or `const`.\\n\\n```dart\\nfinal currentTime = DateTime.now(); // Calculated when the app runs\\nconst pi = 3.14159; // Calculated when the developer writes the code\\n```"
                        }
                    ]
                },
                {
                    title: "Control Flow", order: 2,
                    nodes: [
                        {
                            title: "Conditionals", type: "lesson", order: 1,
                            content: "### If-Else Statements\\n\\nDart looks just like C and JavaScript here.\\n\\n```dart\\nvar isRaining = true;\\n\\nif (isRaining) {\\n  print('Bring an umbrella!');\\n} else {\\n  print('Enjoy the sun!');\\n}\\n```"
                        },
                        {
                            title: "Loops", type: "lesson", order: 2,
                            content: "### Repeating Tasks\\n\\n**For Loop:**\\n```dart\\nfor (int i = 0; i < 3; i++) {\\n  print('Loop $i');\\n}\\n```\\n\\n**For-In Loop (Great for lists!):**\\n```dart\\nvar fruits = ['Apple', 'Banana'];\\nfor (var fruit in fruits) {\\n  print(fruit);\\n}\\n```"
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
                            content: "### Reusable Tasks\\n\\nFunctions in Dart are first-class citizens. You can even pass them around like variables!\\n\\n```dart\\nString greet(String name) {\\n  return 'Hello $name';\\n}\\n\\n// The arrow syntax (a shortcut for tiny functions!)\\nString greetShort(String name) => 'Hello $name';\\n\\nvoid main() {\\n  print(greetShort('Alice'));\\n}\\n```"
                        }
                    ]
                }
            ]
        },
        {
            title: "Data Structures Fundamentals", order: 4,
            chapters: [
                {
                    title: "Collections", order: 1,
                    nodes: [
                        {
                            title: "Lists and Maps", type: "lesson", order: 1,
                            content: "### Storing Data\\n\\nDart has built-in support for Lists (Arrays) and Maps (Dictionaries).\\n\\n```dart\\n// A List of Strings\\nList<String> colors = ['Red', 'Green', 'Blue'];\\ncolors.add('Yellow');\\n\\n// A Map of String Keys to Int Values\\nMap<String, int> ages = {\\n  'Alice': 25,\\n  'Bob': 30\\n};\\nages['Charlie'] = 35; // Adding a new entry\\n```"
                        }
                    ]
                }
            ]
        },
        {
            title: "Object-Oriented Programming Patterns", order: 5,
            chapters: [
                {
                    title: "Classes and Objects", order: 1,
                    nodes: [
                        {
                            title: "Modeling the World", type: "lesson", order: 1,
                            content: "### Everything is an Object\\n\\nIn Dart, *everything* (even numbers!) is an object derived from a Class.\\n\\n```dart\\nclass Car {\\n  String make;\\n  int year;\\n\\n  // The constructor\\n  Car(this.make, this.year);\\n\\n  void drive() {\\n    print('$make is driving!');\\n  }\\n}\\n\\nvoid main() {\\n  var myCar = Car('Toyota', 2022);\\n  myCar.drive();\\n}\\n```\\nNotice the shortcut `Car(this.make, this.year);`! Dart saves you from typing extra code in the constructor."
                        }
                    ]
                }
            ]
        },
        {
            title: "Advanced Programming Concepts", order: 6,
            chapters: [
                {
                    title: "Asynchronous Coding", order: 1,
                    nodes: [
                        {
                            title: "Futures and Async/Await", type: "lesson", order: 1,
                            content: "### Don't Freeze the UI!\\n\\nIf your app takes 3 seconds to download a picture, you shouldn't freeze the whole app while waiting! That's what `Future` is for.\\n\\n```dart\\n// Simulating a network request\\nFuture<String> fetchUser() async {\\n  // Wait 2 seconds\\n  await Future.delayed(Duration(seconds: 2));\\n  return 'John Doe';\\n}\\n\\nvoid main() async {\\n  print('Fetching...');\\n  String user = await fetchUser(); // The code pauses here until it finishes\\n  print('Got user: $user');\\n}\\n```\\nThis is the secret sauce to smooth mobile apps!"
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
                            title: "Project: CLI Quiz App", type: "lesson", order: 1,
                            content: "### Build a Dart Console App\\n\\n**Description:** Write a command-line script that asks the user 3 multiple choice questions and tallies their score.\\n\\n**Requirements:**\\n1. Use `import 'dart:io';` for terminal input.\\n2. Create a `Question` class with `text`, `options`, and `correctAnswerIndex`.\\n3. Store 3 questions in a `List<Question>`.\\n4. Loop through them, use `stdin.readLineSync()` to get the answer, and print the final score!"
                        }
                    ]
                }
            ]
        }
    ]
};
