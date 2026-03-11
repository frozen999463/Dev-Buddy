// Python Masterclass — Part A (Sections 1-5)
export const pythonMasterclassPartA = [
    {
        title: "Introduction to Programming", order: 1,
        chapters: [
            {
                title: "What is Programming?", order: 1,
                nodes: [
                    {
                        title: "Programming Basics", type: "lesson", order: 1,
                        content: `## What is Programming?\n\nProgramming is giving precise instructions to a computer. Computers can't understand English — they need code. Python is one of the most popular languages in the world because it reads almost like plain English.\n\nPython was created by Guido van Rossum in 1991. Today it powers Google, Instagram, Netflix, NASA, and countless machine learning systems.\n\n**Python is an interpreted language** — it runs your code line by line, giving you instant feedback.\n\n## Your First Program\n\n\`\`\`python\n# This is a comment — the computer ignores it\nprint("Hello, World!")\n\`\`\`\n\nThat's it! No setup, no boilerplate. Python's simplicity is its superpower.\n\n## Why Python?\n- Beginner-friendly syntax\n- Enormous standard library\n- Used for web development, data science, AI, automation\n- Fastest-growing language in the world`
                    },
                    {
                        title: "How Python Executes Code", type: "lesson", order: 2,
                        content: `## How Python Executes Code\n\nUnlike C, Python doesn't need a compilation step. The Python **interpreter** reads your \`.py\` file line by line and executes it immediately.\n\n\`\`\`\nYour code (.py file)\n       ↓\n  Python Interpreter\n       ↓\n   Bytecode (.pyc)\n       ↓\n  Python Virtual Machine\n       ↓\n  Output on screen\n\`\`\`\n\nThis makes Python great for learning — you see errors immediately and can fix them fast.\n\n**Running Python:**\n\`\`\`bash\n# In a terminal:\npython3 hello.py\n\n# Or interactively:\npython3\n>>> print("Hello")\nHello\n\`\`\`\n\nThe interactive mode (REPL) lets you type one line at a time — perfect for experimenting!`
                    },
                    {
                        title: "Algorithms and Pseudocode", type: "lesson", order: 3,
                        content: `## Algorithms and Pseudocode\n\nBefore writing code, great programmers write an **algorithm** — a step-by-step plan to solve a problem.\n\n**Pseudocode** is algorithm writing in plain English. No syntax rules!\n\n**Problem:** Find the largest number in a list.\n\n**Pseudocode:**\n\`\`\`\nSET largest = first item\nFOR each item in the list:\n    IF item > largest:\n        SET largest = item\nPRINT largest\n\`\`\`\n\n**Python code from the pseudocode:**\n\`\`\`python\nnumbers = [3, 7, 1, 9, 4]\nlargest = numbers[0]\nfor num in numbers:\n    if num > largest:\n        largest = num\nprint(largest)  # 9\n\`\`\`\n\nNotice how natural the translation is — Python pseudocode and Python code look almost the same!`
                    },
                    {
                        title: "Intro Quiz", type: "quiz", order: 4,
                        questions: [
                            { question: "Python is what type of language?", options: ["Compiled", "Interpreted", "Assembly", "Binary"], correctAnswer: 1 },
                            { question: "What symbol starts a comment in Python?", options: ["//", "/*", "#", "--"], correctAnswer: 2 },
                            { question: "What function displays output in Python?", options: ["display()", "echo()", "console.log()", "print()"], correctAnswer: 3 },
                            { question: "Who created Python?", options: ["Dennis Ritchie", "Linus Torvalds", "Guido van Rossum", "James Gosling"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Intro", order: 2,
                nodes: [
                    {
                        title: "Project: Greeting Card", type: "lesson", order: 1,
                        content: `## Project: Personal Greeting Card\n\n**Goal:** Ask the user for their name and print a decorated greeting.\n\n\`\`\`python\nname = input("What is your name? ")\nprint("=" * 30)\nprint(f"  🎉 Hello, {name}!")\nprint(f"  Welcome to Python!")\nprint("=" * 30)\n\`\`\`\n\n**What you practiced:**\n- \`input()\` — reads text from the user\n- \`f-strings\` — format strings with variables\n- \`print()\` — output to the console\n\n**Extensions:**\n- 🔥 Ask for their age and print "You'll be X next year!"\n- 🔥 Ask for their favourite colour and say "Great choice!"\n- 🔥 Make the border dynamic based on name length`
                    },
                    {
                        title: "Project: Mad Libs", type: "lesson", order: 2,
                        content: `## Project: Mad Libs Story Generator\n\n**Goal:** Ask for a few words, then insert them into a funny story.\n\n\`\`\`python\nprint("=== Mad Libs ===")\nnoun = input("Enter a noun: ")\nverb = input("Enter a verb: ")\nadjective = input("Enter an adjective: ")\nplace = input("Enter a place: ")\n\nstory = f"""\nOne day, a {adjective} {noun} decided to {verb}\nall the way to {place}. Nobody expected it.\nThe end!\n"""\nprint(story)\n\`\`\`\n\n**Extensions:**\n- 🔥 Create 3 different story templates and let user pick one\n- 🔥 Save the final story to a \`story.txt\` file`
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
                        title: "Variables in Python", type: "lesson", order: 1,
                        content: `## Variables in Python\n\nA variable is a named container that stores data. In Python, you don't declare a type — Python figures it out automatically.\n\n\`\`\`python\n# Creating variables\nname = "Alice"        # str (string / text)\nage = 20              # int (whole number)\ngpa = 3.85            # float (decimal)\nis_enrolled = True    # bool (True or False)\n\n# Changing a variable's value\nage = age + 1\nprint(age)  # 21\n\n# Multiple assignment\nx, y, z = 1, 2, 3\nprint(x, y, z)  # 1 2 3\n\n# Constants (by convention, use ALL_CAPS)\nMAX_SCORE = 100\nPI = 3.14159\n\`\`\`\n\n**Naming rules:**\n- No spaces (\`player_score\`, not \`player score\`)\n- Start with a letter or underscore\n- Use \`snake_case\` for Python variables`
                    },
                    {
                        title: "Strings In Depth", type: "lesson", order: 2,
                        content: `## Python Strings In Depth\n\nStrings are sequences of characters. Python has the richest string operations of any language.\n\n\`\`\`python\ntext = "Hello, World!"\n\n# Basic operations\nprint(len(text))          # 13 — length\nprint(text.upper())       # HELLO, WORLD!\nprint(text.lower())       # hello, world!\nprint(text.replace("World", "Python"))  # Hello, Python!\nprint(text[0])            # H — indexing\nprint(text[0:5])          # Hello — slicing\nprint("World" in text)    # True — contains check\n\n# f-strings (best way to format)\nname = "Alice"\nage = 20\nprint(f"{name} is {age} years old")\nprint(f"Pi is approximately {3.14159:.2f}")  # 2 decimal places\n\n# Multiline strings\npoem = """\nRoses are red,\nPython is great!\n"""\n\`\`\``
                    },
                    {
                        title: "Data Types Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What type is the value True in Python?", options: ["str", "int", "bool", "none"], correctAnswer: 2 },
                            { question: "What does len('hello') return?", options: ["4", "5", "6", "Error"], correctAnswer: 1 },
                            { question: "Which is the correct way to declare a constant by convention?", options: ["const pi = 3.14", "PI = 3.14", "@pi = 3.14", "final pi = 3.14"], correctAnswer: 1 },
                            { question: "What naming style does Python use for variables?", options: ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Input, Output and Operators", order: 2,
                nodes: [
                    {
                        title: "Input and Output", type: "lesson", order: 1,
                        content: `## Input and Output in Python\n\n\`\`\`python\n# Output — print() is flexible\nprint("Hello!")                      # simple\nprint("Score:", 100)                 # multiple values\nprint(f"PI ≈ {3.14159:.4f}")         # formatted\nprint("a", "b", "c", sep="-")       # a-b-c\nprint("Loading", end="...")          # no newline\n\n# Input — always returns a string!\nname = input("Enter your name: ")\nage = int(input("Enter your age: "))     # convert to int\nprice = float(input("Enter price: "))   # convert to float\n\nprint(f"Hello {name}, you are {age} years old")\n\`\`\`\n\n**⚠️ Common mistake:** \`input()\` always returns a string. If you need a number, you MUST convert it:\n\`\`\`python\n# Wrong!\nnum = input("Enter a number: ")\nresult = num + 5  # TypeError! Can't add str + int\n\n# Correct!\nnum = int(input("Enter a number: "))\nresult = num + 5  # Works!\n\`\`\``
                    },
                    {
                        title: "Operators", type: "lesson", order: 2,
                        content: `## Python Operators\n\n\`\`\`python\n# Arithmetic\nx, y = 17, 5\nprint(x + y)   # 22 — addition\nprint(x - y)   # 12 — subtraction\nprint(x * y)   # 85 — multiplication\nprint(x / y)   # 3.4 — division (always float)\nprint(x // y)  # 3 — floor division (drops decimal)\nprint(x % y)   # 2 — modulo (remainder)\nprint(x ** y)  # 1419857 — exponentiation (17^5)\n\n# Comparison (always returns bool)\nprint(10 == 10)   # True\nprint(10 != 5)    # True\nprint(10 > 5)     # True\nprint(10 <= 10)   # True\n\n# Logical\nprint(True and False)  # False\nprint(True or False)   # True\nprint(not True)        # False\n\n# Assignment shortcuts\nscore = 10\nscore += 5   # score = 15\nscore *= 2   # score = 30\nscore //= 4  # score = 7\n\`\`\`\n\n**Tip:** The \`%\` (modulo) operator is incredibly useful for checking if a number is even (\`n % 2 == 0\`), cycling through values, and much more.`
                    },
                    {
                        title: "Operators Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does 17 % 5 return?", options: ["3", "2", "3.4", "0"], correctAnswer: 1 },
                            { question: "What does 10 // 3 return?", options: ["3.33", "3", "4", "1"], correctAnswer: 1 },
                            { question: "What does 'not True' evaluate to?", options: ["True", "False", "None", "Error"], correctAnswer: 1 },
                            { question: "What does input() always return?", options: ["int", "float", "str", "Depends on what's typed"], correctAnswer: 2 }
                        ]
                    },
                    {
                        title: "Calculator Challenge", type: "challenge", order: 4,
                        starterCode: "def calculate(a, operator, b):\n    # Return the result of a operator b\n    # Operators: '+', '-', '*', '/'\n    # Return None for division by zero or unknown operator\n    pass",
                        solution: "def calculate(a, operator, b):\n    if operator == '+':\n        return a + b\n    elif operator == '-':\n        return a - b\n    elif operator == '*':\n        return a * b\n    elif operator == '/':\n        if b == 0:\n            return None\n        return a / b\n    return None",
                        testCases: [
                            { input: "10, '+', 5", expectedOutput: "15" },
                            { input: "10, '/', 2", expectedOutput: "5.0" },
                            { input: "8, '*', 3", expectedOutput: "24" }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Fundamentals", order: 3,
                nodes: [
                    {
                        title: "Project: Simple Calculator", type: "lesson", order: 1,
                        content: `## Project: Simple Calculator\n\n\`\`\`python\nprint("=== Python Calculator ===")\n\nwhile True:\n    try:\n        a = float(input("\\nFirst number (or 'q' to quit): "))\n    except ValueError:\n        print("Goodbye!")\n        break\n\n    op = input("Operator (+, -, *, /): ")\n    b = float(input("Second number: "))\n\n    if op == '+':\n        print(f"Result: {a + b}")\n    elif op == '-':\n        print(f"Result: {a - b}")\n    elif op == '*':\n        print(f"Result: {a * b}")\n    elif op == '/':\n        if b == 0:\n            print("Error: Cannot divide by zero!")\n        else:\n            print(f"Result: {a / b:.4f}")\n    else:\n        print("Unknown operator.")\n\`\`\`\n\n**Extensions:**\n- 🔥 Add \`**\` (power) and \`%\` (modulo) operations\n- 🔥 Show calculation history at the end\n- 🔥 Add a running total`
                    },
                    {
                        title: "Project: BMI Calculator", type: "lesson", order: 2,
                        content: `## Project: BMI Calculator\n\nBMI = weight(kg) / height(m)²\n\n\`\`\`python\nprint("=== BMI Calculator ===")\nweight = float(input("Weight in kg: "))\nheight = float(input("Height in meters: "))\n\nbmi = weight / (height ** 2)\n\nprint(f"\\nYour BMI: {bmi:.1f}")\n\nif bmi < 18.5:\n    category = "Underweight"\nelif bmi < 25:\n    category = "Normal weight ✅"\nelif bmi < 30:\n    category = "Overweight"\nelse:\n    category = "Obese"\n\nprint(f"Category: {category}")\n\`\`\`\n\n**Extensions:**\n- 🔥 Also accept pounds/feet and convert before calculation\n- 🔥 Suggest a healthy weight range for their height`
                    }
                ]
            }
        ]
    },

    {
        title: "Type Systems and Conversions", order: 3,
        chapters: [
            {
                title: "Type Conversion", order: 1,
                nodes: [
                    {
                        title: "Implicit and Explicit Conversion", type: "lesson", order: 1,
                        content: `## Type Conversion in Python\n\n**Explicit conversion** — you manually convert using built-in functions:\n\n\`\`\`python\n# String → Number\nage_str = "25"\nage = int(age_str)        # "25" → 25\nprice = float("9.99")    # "9.99" → 9.99\n\n# Number → String\nmessage = "Score: " + str(100)  # Must convert 100 to str!\n\n# Float → Int (TRUNCATES, does not round!)\nn = int(9.99)   # → 9, not 10!\nm = int(-3.7)   # → -3, not -4!\n\n# String → Bool (non-empty = True, empty = False)\nbool("hello")   # True\nbool("")        # False\nbool("False")   # True! (non-empty string!)\n\`\`\`\n\n**Implicit conversion** — Python does it automatically:\n\`\`\`python\nresult = 10 + 3.5   # int + float → float (13.5)\nprint(type(result)) # <class 'float'>\n\`\`\`\n\n**⚠️ What fails:**\n\`\`\`python\nint("hello")    # ValueError!\nint("3.14")     # ValueError! Use float() first\nfloat("abc")    # ValueError!\n\`\`\``
                    },
                    {
                        title: "Floating Point and Precision", type: "lesson", order: 2,
                        content: `## Floating Point Precision\n\nComputers store decimals in binary, which can't represent all fractions exactly.\n\n\`\`\`python\nprint(0.1 + 0.2)        # 0.30000000000000004 ← Surprise!\nprint(0.1 + 0.2 == 0.3) # False ← This trips up beginners!\n\n# Fixes:\nprint(round(0.1 + 0.2, 2))        # 0.3\nprint(abs(0.1 + 0.2 - 0.3) < 1e-9) # True — safe comparison\n\n# For financial calculations, use the Decimal module:\nfrom decimal import Decimal\nresult = Decimal("0.1") + Decimal("0.2")\nprint(result)  # 0.3 — exact!\n\`\`\`\n\n**Python integers are unlimited:**\n\`\`\`python\nbig = 2 ** 100\nprint(big)  # 1267650600228229401496703205376 — no overflow!\n\`\`\`\n\nUnlike C/Java where integers have limits, Python integers grow as large as needed.`
                    },
                    {
                        title: "Type Conversion Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does int(9.99) return?", options: ["10", "9", "9.99", "Error"], correctAnswer: 1 },
                            { question: "What does int('hello') raise?", options: ["TypeError", "ValueError", "AttributeError", "NameError"], correctAnswer: 1 },
                            { question: "What does bool('') return?", options: ["True", "False", "None", "Error"], correctAnswer: 1 },
                            { question: "What is 0.1 + 0.2 in Python?", options: ["0.3", "0.30000000000000004", "0.30", "Error"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Types", order: 2,
                nodes: [
                    {
                        title: "Project: Tip & Bill Splitter", type: "lesson", order: 1,
                        content: `## Project: Tip & Bill Splitter\n\n\`\`\`python\nprint("=== Tip & Bill Splitter ===")\n\nbill = float(input("Total bill (Rs): "))\ntip_pct = float(input("Tip % (e.g. 15): "))\npeople = int(input("Split among how many people? "))\n\ntip = bill * (tip_pct / 100)\ntotal = bill + tip\nper_person = total / people\n\nprint(f"\\n{'Bill:':<15} Rs. {bill:.2f}")\nprint(f"{'Tip ({tip_pct}%):':<15} Rs. {tip:.2f}")\nprint(f"{'Total:':<15} Rs. {total:.2f}")\nprint(f"{'Per person:':<15} Rs. {per_person:.2f}")\n\`\`\`\n\n**Extensions:**\n- 🔥 Round per-person share up to nearest rupee (use \`math.ceil()\`)\n- 🔥 Let user choose between 10%, 15%, 20% tip options`
                    }
                ]
            }
        ]
    },

    {
        title: "Control Flow", order: 4,
        chapters: [
            {
                title: "Conditional Statements", order: 1,
                nodes: [
                    {
                        title: "if, elif, else", type: "lesson", order: 1,
                        content: `## Conditional Statements in Python\n\nPython uses **indentation** (spaces) to define code blocks — no curly braces needed!\n\n\`\`\`python\nscore = 85\n\nif score >= 90:\n    print("Grade: A — Excellent!")\nelif score >= 80:\n    print("Grade: B — Good work!")\nelif score >= 70:\n    print("Grade: C")\nelse:\n    print("Grade: F")\n\n# Nested if\nage = 20\nhas_id = True\n\nif age >= 18:\n    if has_id:\n        print("Welcome!")\n    else:\n        print("Show your ID.")\nelse:\n    print("You must be 18+")\n\n# Ternary expression (one-liner)\nstatus = "Adult" if age >= 18 else "Minor"\nprint(status)\n\`\`\`\n\n**Match statement (Python 3.10+):**\n\`\`\`python\ncommand = "start"\nmatch command:\n    case "start":\n        print("Starting!")\n    case "stop":\n        print("Stopping!")\n    case _:  # default\n        print("Unknown command")\n\`\`\``
                    },
                    {
                        title: "Conditionals Challenge", type: "challenge", order: 2,
                        starterCode: "def classify_triangle(a, b, c):\n    # Return 'equilateral', 'isosceles', or 'scalene'\n    # Also return 'invalid' if sides don't form a triangle\n    pass",
                        solution: "def classify_triangle(a, b, c):\n    if a + b <= c or a + c <= b or b + c <= a:\n        return 'invalid'\n    if a == b == c:\n        return 'equilateral'\n    elif a == b or b == c or a == c:\n        return 'isosceles'\n    else:\n        return 'scalene'",
                        testCases: [
                            { input: "3, 3, 3", expectedOutput: "equilateral" },
                            { input: "3, 3, 5", expectedOutput: "isosceles" },
                            { input: "3, 4, 5", expectedOutput: "scalene" }
                        ]
                    }
                ]
            },
            {
                title: "Loops", order: 2,
                nodes: [
                    {
                        title: "for and while Loops", type: "lesson", order: 1,
                        content: `## Loops in Python\n\n**for loop** — when you know the count:\n\`\`\`python\n# range(start, stop, step)\nfor i in range(5):       # 0 1 2 3 4\n    print(i, end=" ")\n\nfor i in range(1, 11):   # 1 to 10\n    print(i, end=" ")\n\nfor i in range(10, 0, -2):  # 10 8 6 4 2\n    print(i, end=" ")\n\n# Looping a list directly\nfruits = ["Apple", "Banana", "Cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate() gives index AND value\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\`\`\`\n\n**while loop** — when you don't know the count:\n\`\`\`python\nimport random\nsecret = random.randint(1, 10)\nguess = 0\n\nwhile guess != secret:\n    guess = int(input("Guess (1-10): "))\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n\nprint("Correct! 🎉")\n\`\`\``
                    },
                    {
                        title: "break, continue, and Loop Tricks", type: "lesson", order: 2,
                        content: `## Loop Control in Python\n\n\`\`\`python\n# break — exit the loop immediately\nfor i in range(100):\n    if i == 5:\n        break\nprint(i)  # 5\n\n# continue — skip the rest of this iteration\nfor i in range(10):\n    if i % 2 == 0:\n        continue  # skip even numbers\n    print(i, end=" ")  # 1 3 5 7 9\n\n# for-else — runs if loop completes without break\nfor i in range(5):\n    if i == 10:\n        break\nelse:\n    print("Loop finished normally")\n\n# List comprehension — powerful Python shortcut!\nsquares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]\nprint(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\nprint(evens)    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\`\`\``
                    },
                    {
                        title: "Loops Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does range(2, 10, 2) produce?", options: ["[2,4,6,8,10]", "[2,4,6,8]", "[0,2,4,6,8]", "[2,3,4,5,6,7,8,9]"], correctAnswer: 1 },
                            { question: "What does 'continue' do in a loop?", options: ["Exits the loop", "Skips to the next iteration", "Restarts the loop", "Pauses the loop"], correctAnswer: 1 },
                            { question: "What is [x**2 for x in range(3)] equivalent to?", options: ["[1,4,9]", "[0,1,4]", "[0,1,2]", "[1,2,3]"], correctAnswer: 1 },
                            { question: "When does the 'else' clause of a for loop run?", options: ["Always", "Never", "When break is called", "When the loop completes without break"], correctAnswer: 3 }
                        ]
                    },
                    {
                        title: "FizzBuzz Challenge", type: "challenge", order: 4,
                        starterCode: "def fizzbuzz(n):\n    # Return a list of FizzBuzz results from 1 to n\n    # Multiples of 3: 'Fizz', multiples of 5: 'Buzz', both: 'FizzBuzz'\n    pass",
                        solution: "def fizzbuzz(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            result.append('FizzBuzz')\n        elif i % 3 == 0:\n            result.append('Fizz')\n        elif i % 5 == 0:\n            result.append('Buzz')\n        else:\n            result.append(str(i))\n    return result",
                        testCases: [
                            { input: "15", expectedOutput: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']" }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Control Flow", order: 3,
                nodes: [
                    {
                        title: "Project: Number Guessing Game", type: "lesson", order: 1,
                        content: `## Project: Number Guessing Game\n\n\`\`\`python\nimport random\n\nprint("=== Number Guessing Game ===")\nsecret = random.randint(1, 100)\nattempts = 0\nmax_tries = 7\n\nfor _ in range(max_tries):\n    try:\n        guess = int(input(f"\\nGuess ({max_tries - attempts} left): "))\n    except ValueError:\n        print("Please enter a number!")\n        continue\n    attempts += 1\n    if guess == secret:\n        print(f"🎉 Correct in {attempts} attempts!")\n        break\n    elif guess < secret:\n        print("Too low! 📉")\n    else:\n        print("Too high! 📈")\nelse:\n    print(f"😢 Game over! It was {secret}.")\n\`\`\`\n\n**Extensions:**\n- 🔥 Add difficulty: Easy=10 tries, Medium=7, Hard=5\n- 🔥 Show a hint: "You're very close!" if within 5`
                    },
                    {
                        title: "Project: Pattern Printer", type: "lesson", order: 2,
                        content: `## Project: Star Pattern Printer\n\n\`\`\`python\ndef triangle(n):\n    for i in range(1, n + 1):\n        print("* " * i)\n\ndef pyramid(n):\n    for i in range(1, n + 1):\n        print(" " * (n - i) + "* " * i)\n\ndef diamond(n):\n    for i in range(1, n + 1):\n        print(" " * (n - i) + "* " * i)\n    for i in range(n - 1, 0, -1):\n        print(" " * (n - i) + "* " * i)\n\nrows = int(input("How many rows? "))\nprint("\\n--- Triangle ---")\ntriangle(rows)\nprint("\\n--- Pyramid ---")\npyramid(rows)\nprint("\\n--- Diamond ---")\ndiamond(rows)\n\`\`\`\n\n**Extensions:**\n- 🔥 Let user choose the character (*, #, @)\n- 🔥 Add inverted triangle option`
                    }
                ]
            }
        ]
    },

    {
        title: "Functions and Modular Programming", order: 5,
        chapters: [
            {
                title: "Defining and Using Functions", order: 1,
                nodes: [
                    {
                        title: "Functions in Python", type: "lesson", order: 1,
                        content: `## Functions in Python\n\nA function is a named, reusable block of code. Define once, use many times.\n\n\`\`\`python\n# Basic function\ndef greet(name):\n    print(f"Hello, {name}! 👋")\n\ngreet("Alice")  # Hello, Alice! 👋\ngreet("Bob")    # Hello, Bob! 👋\n\n# Function with return value\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)  # 8\n\n# Default parameters\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Alice"))          # Hello, Alice!\nprint(greet("Bob", "Hi"))     # Hi, Bob!\n\n# Keyword arguments\ndef describe(name, age, city):\n    return f"{name}, {age}, from {city}"\n\nprint(describe(age=25, city="Mumbai", name="Alice"))\n\n# *args — variable number of arguments\ndef total(*numbers):\n    return sum(numbers)\n\nprint(total(1, 2, 3, 4, 5))  # 15\n\`\`\``
                    },
                    {
                        title: "Recursion", type: "lesson", order: 2,
                        content: `## Recursion in Python\n\nRecursion is when a function calls itself. Every recursive function needs:\n1. A **base case** to stop\n2. A **recursive case** that moves toward the base case\n\n**Factorial:**\n\`\`\`python\ndef factorial(n):\n    if n <= 1:              # Base case\n        return 1\n    return n * factorial(n - 1)  # Recursive case\n\nprint(factorial(5))   # 120\nprint(factorial(10))  # 3628800\n\`\`\`\n\n**Fibonacci:**\n\`\`\`python\ndef fibonacci(n):\n    if n <= 0: return 0\n    if n == 1: return 1\n    return fibonacci(n-1) + fibonacci(n-2)\n\nfor i in range(10):\n    print(fibonacci(i), end=" ")  # 0 1 1 2 3 5 8 13 21 34\n\`\`\`\n\n**Palindrome checker (recursive):**\n\`\`\`python\ndef is_palindrome(s):\n    s = s.lower().replace(" ", "")\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_palindrome(s[1:-1])\n\nprint(is_palindrome("racecar"))  # True\nprint(is_palindrome("hello"))    # False\n\`\`\``
                    },
                    {
                        title: "Functions Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What keyword defines a function in Python?", options: ["function", "fun", "def", "fn"], correctAnswer: 2 },
                            { question: "What does *args allow in a function?", options: ["Keyword-only arguments", "A variable number of positional arguments", "Default values", "Type hints"], correctAnswer: 1 },
                            { question: "What is the base case in recursion?", options: ["The first call", "The condition where recursion stops", "The return statement", "The recursive call"], correctAnswer: 1 },
                            { question: "What is factorial(0) in a correctly implemented factorial?", options: ["0", "1", "undefined", "Error"], correctAnswer: 1 }
                        ]
                    },
                    {
                        title: "Recursion Challenge", type: "challenge", order: 4,
                        starterCode: "def power(base, exp):\n    # Calculate base^exp using recursion\n    # Do NOT use the ** operator\n    pass",
                        solution: "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)",
                        testCases: [
                            { input: "2, 10", expectedOutput: "1024" },
                            { input: "3, 4", expectedOutput: "81" },
                            { input: "5, 0", expectedOutput: "1" }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Functions", order: 2,
                nodes: [
                    {
                        title: "Project: Palindrome & Prime Checker", type: "lesson", order: 1,
                        content: `## Project: Word & Number Analyzer\n\n\`\`\`python\nimport math\n\ndef is_palindrome(text):\n    clean = text.lower().replace(" ", "")\n    return clean == clean[::-1]\n\ndef is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(math.sqrt(n)) + 1):\n        if n % i == 0: return False\n    return True\n\ndef find_primes(limit):\n    return [n for n in range(2, limit + 1) if is_prime(n)]\n\n# Interactive menu\nwhile True:\n    print("\\n1. Check palindrome  2. Check prime  3. Find primes  4. Quit")\n    choice = input("Choice: ")\n    if choice == "1":\n        w = input("Enter word/phrase: ")\n        print("✅ Palindrome!" if is_palindrome(w) else "❌ Not a palindrome")\n    elif choice == "2":\n        n = int(input("Enter number: "))\n        print(f"{'✅ Prime!' if is_prime(n) else '❌ Not prime'}")\n    elif choice == "3":\n        limit = int(input("Find primes up to: "))\n        print(find_primes(limit))\n    elif choice == "4":\n        break\n\`\`\`\n\n**Extensions:**\n- 🔥 Add a \`fibonacci(n)\` option to the menu\n- 🔥 Check if a number is a "perfect number" (sum of divisors equals the number)`
                    },
                    {
                        title: "Project: Personal Math Library", type: "lesson", order: 2,
                        content: `## Project: Build Your Own Math Library\n\nCreate \`mymath.py\` with useful functions, then import it.\n\n**mymath.py:**\n\`\`\`python\nimport math as _math\n\ndef power(base, exp):\n    result = 1\n    for _ in range(abs(exp)):\n        result *= base\n    return result if exp >= 0 else 1/result\n\ndef factorial(n):\n    if n < 0: raise ValueError("No factorial for negatives")\n    if n <= 1: return 1\n    return n * factorial(n - 1)\n\ndef is_prime(n):\n    if n < 2: return False\n    return all(n % i != 0 for i in range(2, int(_math.sqrt(n)) + 1))\n\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\ndef lcm(a, b):\n    return abs(a * b) // gcd(a, b)\n\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\`\`\`\n\n**main.py:**\n\`\`\`python\nimport mymath\nprint(mymath.power(2, 10))     # 1024\nprint(mymath.factorial(10))    # 3628800\nprint(mymath.is_prime(97))     # True\nprint(mymath.gcd(48, 18))      # 6\nprint(list(mymath.fibonacci(10)))  # [0,1,1,2,3,5,8,13,21,34]\n\`\`\``
                    }
                ]
            }
        ]
    }
];
