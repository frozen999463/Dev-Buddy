export const pythonCourse = {
    course: {
        title: "Python Masterclass: Beginner to Advanced",
        slug: "python-masterclass",
        description: "A comprehensive journey from Python basics to advanced object-oriented programming, designed by expert instructors.",
        status: "published"
    },
    sections: [
        {
            title: "Introduction to Programming", order: 1,
            chapters: [
                {
                    title: "Welcome to Python", order: 1,
                    nodes: [
                        {
                            title: "What is Programming?", type: "lesson", order: 1,
                            content: "### Welcome to the World of Coding!\\n\\nImagine you have a very obedient robot. It does *exactly* what you tell it to do, but it doesn't speak English. Programming is simply learning the language that the robot understands so you can give it instructions.\\n\\nPython is one of the most popular programming languages in the world because it looks a lot like plain English. It's used by scientists, web developers, data analysts, and even people making video games!\\n\\nIn this course, we will take you from absolute beginner to writing complex applications."
                        },
                        {
                            title: "How Computers Execute Code", type: "lesson", order: 2,
                            content: "### Compilers vs Interpreters\\n\\nComputers only truly understand 1s and 0s (binary or 'machine code'). When we write Python, we are writing in a 'high-level language'. How does it get translated?\\n\\n- **Compilers** (used in C/C++) read your entire code and translate it into a single executable file all at once.\\n- **Interpreters** (used in Python) read your code **line by line** and execute it immediately.\\n\\nThis makes Python very easy to test and debug because you get instant feedback!"
                        },
                        {
                            title: "Your First Program", type: "lesson", order: 3,
                            content: "### Hello, World!\\n\\nThe tradition for every new programmer is to make the computer say 'Hello, World!'. Let's do exactly that.\\n\\n```python\\n# This is a comment. The computer ignores lines starting with #\\nprint('Hello, World!')\\n```\\n\\n**Explanation:**\\n- `print()` is a built-in *function* in Python. Its job is to display text on the screen.\\n- `'Hello, World!'` is the text we want to display. Notice how it's wrapped in quotes! This tells Python it's a piece of text (a String)."
                        },
                        {
                            title: "Intro Quiz", type: "quiz", order: 4,
                            questions: [
                                { question: "Does Python use a Compiler or an Interpreter?", options: ["Compiler", "Interpreter", "Both", "Neither"], correctAnswer: 1 },
                                { question: "What symbol is used for comments in Python?", options: ["//", "/*", "#", "--"], correctAnswer: 2 }
                            ]
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
                            title: "Storing Information", type: "lesson", order: 1,
                            content: "### Think of Variables as Boxes\\n\\nWhen you play a game, the game remembers your score. How? It stores it in the computer's memory using a **variable**.\\n\\n```python\\nscore = 100\\nplayer_name = 'Alice'\\nis_game_over = False\\n```\\n\\nNotice we didn't have to define the type! Python is smart enough to know:\\n- `100` is an Integer (whole number)\\n- `'Alice'` is a String (text)\\n- `False` is a Boolean (True/False)\\n\\nTry changing the score and printing it!"
                        },
                        {
                            title: "Basic Math Operators", type: "lesson", order: 2,
                            content: "### Python as a Calculator\\n\\nPython can do math out of the box:\\n\\n```python\\nx = 10\\ny = 3\\n\\nprint(x + y)  # Addition: 13\\nprint(x - y)  # Subtraction: 7\\nprint(x * y)  # Multiplication: 30\\nprint(x / y)  # Division: 3.333\\nprint(x // y) # Floor Division (removes decimals): 3\\nprint(x % y)  # Modulus (gives the remainder): 1\\n```"
                        }
                    ]
                },
                {
                    title: "Control Flow", order: 2,
                    nodes: [
                        {
                            title: "Conditional Statements (If/Else)", type: "lesson", order: 1,
                            content: "### Making Decisions\\n\\nPrograms need to make choices based on rules.\\n\\n```python\\nage = 18\\n\\nif age >= 18:\\n    print('You are an adult.')\\nelif age >= 13:\\n    print('You are a teenager.')\\nelse:\\n    print('You are a child.')\\n```\\n\\n**Important:** Notice the indentation (the spaces before `print`). Python uses spacing to know which code belongs inside the `if` statement! Missing a space will cause an error."
                        },
                        {
                            title: "Loops (While & For)", type: "lesson", order: 2,
                            content: "### Repeating Tasks\\n\\nIf you want to say hello 5 times, you shouldn't write `print()` 5 times. You use a loop!\\n\\n**For Loop:** Excellent when you know *exactly* how many times to repeat.\\n```python\\nfor i in range(5):\\n    print(f'Hello {i}') # Prints 0 to 4\\n```\\n\\n**While Loop:** Better when you want to repeat *until* a condition is met.\\n```python\\ncount = 0\\nwhile count < 3:\\n    print('Counting...', count)\\n    count = count + 1\\n```"
                        },
                        {
                            title: "Control Flow Challenge", type: "challenge", order: 3,
                            starterCode: "def is_even(number):\\n    # Write code to return True if the number is even, False otherwise\\n    pass",
                            solution: "def is_even(number):\\n    return number % 2 == 0",
                            testCases: [{ input: "4", expectedOutput: "True" }, { input: "7", expectedOutput: "False" }]
                        }
                    ]
                }
            ]
        },
        {
            title: "Functions and Modular Programming", order: 3,
            chapters: [
                {
                    title: "Reusable Code Blocks", order: 1,
                    nodes: [
                        {
                            title: "Defining Functions", type: "lesson", order: 1,
                            content: "### Don't Repeat Yourself (DRY)\\n\\nA function is a named block of code that performs a specific task. We define it once and use it many times!\\n\\n```python\\ndef greet(name):\\n    # The 'name' here is a parameter\\n    print(f'Hello, {name}! Welcome to the class.')\\n\\n# Now we 'call' the function\\ngreet('Sarah')\\ngreet('John')\\n```\\n\\nNotice the `def` keyword! It stands for *define*."
                        },
                        {
                            title: "Return Values & Scope", type: "lesson", order: 2,
                            content: "### Giving Data Back\\n\\nSometimes a function calculates something and needs to hand it back to you. We use the `return` keyword.\\n\\n```python\\ndef multiply(a, b):\\n    result = a * b\\n    return result\\n\\nanswer = multiply(5, 4)\\nprint(answer) # 20\\n```\\n\\n**Scope Note:** The variable `result` only exists *inside* the function. If you try to print `result` outside, Python will throw an error. This is called Local Scope!"
                        }
                    ]
                }
            ]
        },
        {
            title: "Data Structures Fundamentals", order: 4,
            chapters: [
                {
                    title: "Structuring Your Data", order: 1,
                    nodes: [
                        {
                            title: "Lists (Arrays)", type: "lesson", order: 1,
                            content: "### Storing Multiple Items\\n\\nA List is like a train holding multiple passengers. You create it using square brackets `[]`.\\n\\n```python\\nfruits = ['Apple', 'Banana', 'Cherry']\\nprint(fruits[0]) # 'Apple' (Counting starts at 0!)\\n\\nfruits.append('Orange') # Adds to the end\\nfruits.remove('Banana') # Removes the item\\n```\\nLists are incredibly versatile and allow duplicate values."
                        },
                        {
                            title: "Dictionaries (Maps)", type: "lesson", order: 2,
                            content: "### Key-Value Pairs\\n\\nWhat if you want to store a student's grades? A list isn't great. We use a Dictionary `{}` instead.\\n\\n```python\\nstudent = {\\n    'name': 'Alex',\\n    'age': 20,\\n    'grade': 'A'\\n}\\n\\nprint(student['name']) # Outputs 'Alex'\\nstudent['age'] = 21 # Updating a value\\n```"
                        },
                        {
                            title: "Data Structures Quiz", type: "quiz", order: 3,
                            questions: [
                                { question: "What index does Python start counting at in Lists?", options: ["1", "0", "-1", "Depends on the list"], correctAnswer: 1 },
                                { question: "Which brackets are used to create a Dictionary?", options: ["()", "[]", "{}", "<>"], correctAnswer: 2 }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "Object-Oriented Programming (OOP)", order: 5,
            chapters: [
                {
                    title: "Classes and Objects", order: 1,
                    nodes: [
                        {
                            title: "The Blueprint", type: "lesson", order: 1,
                            content: "### Modeling the Real World\\n\\nOOP is a paradigm (a way of thinking). You model your code around 'Objects' rather than just actions. Think of a `Class` as a blueprint for a house, and an `Object` as the actual house.\\n\\n```python\\nclass Dog:\\n    # The constructor method (called automatically)\\n    def __init__(self, name, breed):\\n        self.name = name\\n        self.breed = breed\\n\\n    # A method (a function belonging to the class)\\n    def bark(self):\\n        print(f'{self.name} says Woof!')\\n\\n# Creating an object (an instance)\\nmy_dog = Dog('Buddy', 'Golden Retriever')\\nmy_dog.bark()\\n```\\n\\nThe `self` keyword is tricky! It simply refers to the *current object* being created or used."
                        },
                        {
                            title: "Inheritance", type: "lesson", order: 2,
                            content: "### Passing Down Traits\\n\\nClasses can inherit from other classes using Inheritance.\\n\\n```python\\nclass Animal:\\n    def eat(self):\\n        print('Munch munch')\\n\\nclass Cat(Animal):\\n    def meow(self):\\n        print('Meow!')\\n\\nluna = Cat()\\nluna.eat()  # Inherited from Animal!\\nluna.meow() # Specific to Cat\\n```"
                        }
                    ]
                }
            ]
        },
        {
            title: "Advanced Programming Concepts", order: 6,
            chapters: [
                {
                    title: "Leveling Up Your Code", order: 1,
                    nodes: [
                        {
                            title: "Error Handling (Try/Except)", type: "lesson", order: 1,
                            content: "### Don't Crash!\\n\\nWhat happens if your code asks a user for a number, but they type 'hello'? It crashes!\\n\\n```python\\ntry:\\n    num = int(input('Enter a number: '))\\n    print(10 / num)\\nexcept ValueError:\\n    print('That is not a valid number!')\\nexcept ZeroDivisionError:\\n    print('You cannot divide by zero!')\\n```\\nUsing `try-except` blocks keeps your program running even when bad things happen."
                        },
                        {
                            title: "File Handling", type: "lesson", order: 2,
                            content: "### Saving and Reading Data\\n\\nYou can write data directly to text files on your computer.\\n\\n```python\\n# Writing to a file\\nwith open('notes.txt', 'w') as file:\\n    file.write('This is my saved note.')\\n\\n# Reading from a file\\nwith open('notes.txt', 'r') as file:\\n    content = file.read()\\n    print(content)\\n```\\nThe `with` keyword is safe because it automatically closes the file for us."
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
                            title: "Project 1: Command Line Calculator", type: "lesson", order: 1,
                            content: "### Build a CLI Calculator\\n\\n**Description:** Build a program that takes two numbers and an operator (+, -, *, /) and prints the result.\\n\\n**Requirements:**\\n1. Use a `while` loop so the user can keep calculating until they type 'exit'.\\n2. Use a function for each operation (add, subtract, etc).\\n3. Handle division by zero using `try/except`.\\n\\n**Suggested Approach:** Start by writing the user input logic, then plug in the math functions."
                        },
                        {
                            title: "Project 2: To-Do List Manager", type: "lesson", order: 2,
                            content: "### Build a To-Do App\\n\\n**Description:** A script to maintain tasks.\\n\\n**Requirements:**\\n1. An empty list `tasks = []`.\\n2. A menu that prints: '1. Add Task', '2. View Tasks', '3. Remove Task'.\\n3. Use `input()` to get the user choice.\\n4. Optional: Save the list to `tasks.txt` so it persists between runs."
                        }
                    ]
                }
            ]
        }
    ]
};
