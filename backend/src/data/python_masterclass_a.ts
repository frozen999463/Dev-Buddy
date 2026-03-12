// Python Masterclass — Part A (Sections 1-5)
export const pythonMasterclassPartA = [
    {
        title: "Introduction to Programming", order: 1,
        chapters: [
            {
                title: "Python 101 — The Friendly Giant", order: 1,
                nodes: [
                    {
                        title: "What is Python and Why Learn It?", type: "lesson", order: 1,
                        content: `## What is Python?

Python is a high-level, interpreted programming language created by Guido van Rossum and first released in 1991. The design philosophy of Python emphasizes code readability. It uses significant indentation (whitespace) to structure code rather than curly braces or keywords like \`end\`.

### Why is Python so Popular?
If you ask 100 developers why they like Python, you'll hear the same things:
1. **It reads like English.** You don't have to decipher cryptic symbols.
2. **"Batteries Included."** Python comes with a massive standard library, meaning you can do complex things like reading CSV files, making HTTP requests, or doing advanced math without downloading third-party tools.
3. **Versatility.** Python is the undisputed king of Data Science and Artificial Intelligence. It's heavily used in backend web development (Django, FastAPI), automation, cybersecurity, and financial analysis.

### How Does Python Work Under the Hood?
Python is an **interpreted** language. 
When you write a Python script (e.g., \`app.py\`), you don't need to compile it beforehand like you would with C or Java. Instead, the Python interpreter reads your code line-by-line, converts it into an intermediate form called 'bytecode', and then executes it via the Python Virtual Machine (PVM).

*Analogy:* Imagine a compiler as a translator who translates an entire book into a new language before giving it to you. An interpreter is like a live translator sitting next to you, translating sentence by sentence as someone speaks.

### Your First Program
Let's look at the classic first program in any language:
\`\`\`python
# This is a comment. Python ignores lines starting with a hashtag.
print("Hello, World!")
\`\`\`
The \`print()\` function is your way of telling Python: "Hey, display this text on the screen."
Functions in Python always use parentheses \`()\` to hold the data you are passing to them.

### What You Just Learned
- Python prioritizes readability.
- It is an interpreted language.
- \`print()\` is used to output data to the user.`
                    },
                    {
                        title: "Setting Up Your Mindset", type: "lesson", order: 2,
                        content: `## Thinking Like a Programmer

Learning the syntax (the rules) of Python is the easy part. The hard part is learning how to think like a software engineer.

### The Algorithm
Before you write code, you must define an **algorithm**. An algorithm is just a fancy word for "a step-by-step recipe to solve a problem."

Imagine you want to program a robot to make a cup of tea. If you say "Make tea", the robot crashes. It doesn't know what tea is. Instead, you need an algorithm:
1. Open the cupboard.
2. Grab a mug.
3. Place mug on the counter.
4. Boil water in the kettle.
5. Place a tea bag in the mug.
6. Pour boiling water into the mug.

### Decomposition
When faced with a massive project (like "Build Facebook"), beginners panic. Experts use **decomposition**, which means breaking a massive problem into tiny, solvable sub-problems.
- Can I make a screen that takes user input? Yes.
- Can I save that input to a database? Yes.
- Can I display data from a database on a feed? Yes.

### Debugging is Normal
In movies, hackers type at 200 words per minute and never make mistakes. In reality, programmers spend 20% of their time writing code and 80% discovering why it doesn't work.
When you see a big red error message on your screen:
1. **Don't panic.** This is normal.
2. **Read the error.** Python errors are usually very descriptive. They tell you exactly which line failed and why.
3. **Google it.** 99% of the problems you will face as a beginner have been faced, solved, and documented online.

### Summary
Programming is about logic and problem-solving, not just memorizing syntax. Plan your programs on paper before you type. Embrace errors as learning opportunities.`
                    },
                    {
                        title: "Intro Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What is the primary design philosophy of Python?", options: ["Maximum execution speed", "Code readability and simplicity", "Manual memory management", "Complex syntax for better security"], correctAnswer: 1 },
                            { question: "Since Python is interpreted, what does that mean?", options: ["It reads and executes code line-by-line", "It translates the entire file to binary before running", "It only runs on web browsers", "It cannot have errors"], correctAnswer: 0 },
                            { question: "What is an algorithm?", options: ["A complex math equation", "A type of database", "A step-by-step set of instructions to solve a problem", "A server component"], correctAnswer: 2 },
                            { question: "What should you do when you encounter an error message?", options: ["Delete the file and start over", "Ignore it and run the code again", "Read the message to find the line number and cause", "Assume the computer is broken"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Getting Started", order: 2,
                nodes: [
                    {
                        title: "Project Guide: Interactive Story Teller", type: "lesson", order: 1,
                        content: `## Project Guide: Interactive Story Teller

### Introduction
Welcome to your first project! Instead of giving you the solution, we are going to guide you on how to build it yourself. 
In this project, you will build an interactive Mad Libs style story generator. The program will prompt the user for some words, and then weave those words into a funny story.

### Goal
Create a Python script that asks the user for a noun, a verb, an adjective, and a place. Then, it should print out a custom story using those inputs.

### Requirements
1. The program must print a welcome message.
2. It must ask the user for at least 4 different words using the \`input()\` function.
3. It must store each word in a sensibly named variable (e.g., \`user_noun\`, \`user_verb\`).
4. It must use string formatting (like f-strings) to inject the variables into a multi-line string.
5. It must print the final story to the screen.

### Step-by-Step Guide

**Step 1: Welcome the user**
Use the \`print()\` function to display a title for your game. Make it look nice with some ASCII borders, like \`print("=== Mad Libs ===")\`.

**Step 2: Collect data**
To get data from the user, use the \`input()\` function. 
*Hint:* Remember that \`input()\` takes a prompt string to show the user, and it returns what the user typed. You must capture that returned value in a variable. 
For example: \`animal = input("Enter an animal limit: ")\`
Repeat this 4 times for different word types.

**Step 3: Construct the story**
Create a multi-line string. In Python, you can create strings that span multiple lines using triple quotes \`"""\`. 
To inject your user variables into the string, place an \`f\` before the opening quotes to make it an f-string. Then, put your variables inside curly braces \`{}\`.

Example boilerplate:
\`\`\`
story = f"""
Once upon a time, there was a {adjective} {noun}.
It loved to {verb} all the time at {place}.
"""
\`\`\`

**Step 4: Display the result**
Finally, print the \`story\` variable to the console.

### Challenge Yourself
Once you have the basics working, try adding:
- A prompt that asks the user for their name, and make the story about them.
- Use string methods like \`.upper()\` on some of the injected words to make it look like the story is shouting them.`
                    },
                    {
                        title: "Project Guide: ASCII Art Generator", type: "lesson", order: 2,
                        content: `## Project Guide: ASCII Art Generator

### Introduction
ASCII art uses text characters to create images. In this project, you will use Python's built-in string multiplication feature to build a program that generates a customized ASCII text banner.

### Goal
The user will input a symbol (like \`*\` or \`#\`) and a message. Your program will print the message surrounded by a beautiful border made entirely out of the user's chosen symbol.

### Requirements
1. Ask the user for a single character symbol.
2. Ask the user for a short message.
3. Calculate the length of the string to determine how wide the border should be.
4. Print a top border, the message with side borders, and a bottom border.

### Step-by-Step Guide

**Step 1: Get the inputs**
Use \`input()\` to get the \`symbol\` and the \`message\`.

**Step 2: Calculate the width**
If the message is "Hello" (length 5), and you want 2 spaces of padding on each side plus the borders, the top border needs to be longer than the message.
*Hint:* Use the \`len()\` function. \`message_length = len(message)\`. 
Decide on your total width. For example, \`total_width = message_length + 6\`.

**Step 3: String Multiplication**
In Python, if you multiply a string by a number, it repeats the string! 
Try testing this: \`print("*" * 10)\`. It prints 10 asterisks.
Use this trick to create a \`top_border\` variable: \`top_border = symbol * total_width\`.

**Step 4: Print the banner**
1. Print the top border.
2. Print the middle line. It should look something like: \`print(f"{symbol}  {message}  {symbol}")\`
3. Print the bottom border (which is exactly the same as the top border).

### Challenge Yourself
- Try adding multiple lines of text to your banner.
- Make the program check if the user entered more than 1 character for the symbol, and use an \`if\` statement to warn them if they did (we will cover \`if\` statements later, but feel free to look them up!).`
                    }
                ]
            }
        ]
    },

    {
        title: "Programming Fundamentals", order: 2,
        chapters: [
            {
                title: "Variables, Constants, and Memory", order: 1,
                nodes: [
                    {
                        title: "The Anatomy of a Variable", type: "lesson", order: 1,
                        content: `## The Anatomy of a Variable

### What is a Variable?
A variable is a named location in the computer's memory (RAM) where you can store data. 
Because programs are dynamic, the data they work with changes. A video game needs to track your health. Every time you take damage, your health value changes. We store that value in a variable because a variable can *vary*.

### How Python Handles Variables
In many older languages, you have to explicitly tell the computer exactly how much memory to reserve.
In C, you would write: \`int health = 100;\` (Reserves 4 bytes for an integer).

Python is **dynamically typed**. You don't tell Python the type; Python figures it out based on the data you provide.

\`\`\`python
# Creating variables
player_health = 100
player_name = "Arthas"
is_poisoned = False

# Reassigning variables
player_health = player_health - 15  # Took some damage!
print(player_health)  # Output: 85
\`\`\`

### Deep Dive: References and Objects
When you write \`player_name = "Arthas"\`, Python does three things:
1. It creates an object in memory representing the string "Arthas".
2. It allocates memory for it.
3. It binds the name \`player_name\` to that memory location.

\`player_name\` is just a sticky note attached to the data. If you later write \`player_name = "Uther"\`, Python creates a NEW string "Uther" in memory, and moves the sticky note to the new string. The old "Arthas" string is cleaned up automatically by a system called the **Garbage Collector**.

### Naming Conventions in Python
You cannot name variables arbitrarily. 
**Strict Rules (will cause errors):**
- Cannot start with a number (\`1st_player = "Bob"\` ❌)
- Cannot contain spaces (\`player name = "Bob"\` ❌)
- Cannot use reserved keywords like \`if\`, \`while\`, \`class\`.

**Community Guidelines (PEP 8):**
Python developers agreed on a stylistic guideline called PEP 8. For variables, you should use **snake_case**.
- All lowercase.
- Words separated by underscores.
- Examples: \`max_inventory_size\`, \`current_weapon_damage\`.

### Constants
Sometimes you have a value that should *never* change, like the value of Pi, or the maximum number of players allowed on a server.
Python does not enforce constants strictly, but by convention, we use **ALL_CAPS_SNAKE_CASE** to signal to other developers: "Do not touch this!"

\`\`\`python
MAX_PLAYERS = 64
PI = 3.1415926535
\`\`\``
                    },
                    {
                        title: "Understanding Data Types", type: "lesson", order: 2,
                        content: `## Understanding Data Types

Everything in Python is an object, and every object has a **type**. The type dictates what you can and cannot do with that data. You can't perform math on text, and you can't capitalize a number.

### 1. Integers (\`int\`)
Whole numbers, positive or negative, without decimals.
Features: In Python, integers have arbitrary precision. They can be as large as your computer's RAM allows. They won't "overflow" like they do in languages like Java or C.
\`\`\`python
population = 8000000000
temperature = -15
\`\`\`

### 2. Floating Point Numbers (\`float\`)
Numbers with a fractional part.
Features: Floats are subject to the limitations of computer architecture (IEEE 754). This means they can suffer from minor precision loss.
\`\`\`python
# Precision quirk!
print(0.1 + 0.2)  # Output: 0.30000000000000004
\`\`\`
*(For precise financial calculations, developers use the \`decimal\` module instead of standard floats).*

### 3. Strings (\`str\`)
Sequences of characters used to store text.
Strings can be wrapped in single quotes \`'\`, double quotes \`"\`, or triple quotes \`"""\` for multi-line strings.
\`\`\`python
greeting = "Hello"
letter = 'A'
multiline = """This is a string
that spans multiple lines!"""
\`\`\`

### 4. Booleans (\`bool\`)
Represents the concept of truth. Only two possible values: \`True\` or \`False\` (Must be capitalized in Python!).
Under the hood, Python treats \`True\` as 1 and \`False\` as 0.
\`\`\`python
is_admin = True
has_errors = False
\`\`\`

### The \`type()\` Function
If you are ever unsure what type a variable is holding, Python provides the built-in \`type()\` function.
\`\`\`python
mystery_variable = "123.45"
print(type(mystery_variable))  # Output: <class 'str'>
\`\`\``
                    },
                    {
                        title: "Data Types Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "Which of the following is an invalid Python variable name?", options: ["player_1_health", "playerLocation", "2nd_weapon", "_hidden_score"], correctAnswer: 2 },
                            { question: "What casing convention is recommended for Python variables?", options: ["camelCase", "PascalCase", "snake_case", "kebab-case"], correctAnswer: 2 },
                            { question: "Why might 0.1 + 0.2 result in 0.30000000000000004?", options: ["It is a bug in the Python compiler", "Python floats represent decimal approximations using binary architecture which causes precision loss", "You must import the math module first", "The variables were not cast to floats"], correctAnswer: 1 },
                            { question: "How does Python handle constants?", options: ["Using the 'const' keyword", "Using the 'final' keyword", "Constants don't exist in Python; it relies on an ALL_CAPS naming convention", "By locking the variable in memory"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Input, Output, and String Interactions", order: 2,
                nodes: [
                    {
                        title: "Deep Dive: print() and input()", type: "lesson", order: 1,
                        content: `## Deep Dive: The Gateway to the User

### Input: Reading from the Outside World
The \`input()\` function pauses the execution of your program and waits for the user to type something and press ENTER.

**The Golden Rule of Input:**
\`input()\` ALWAYS returns a string (\`str\`). Even if the user types "42", Python receives it as the text string "42", not the integer 42.

\`\`\`python
age = input("Enter your age: ")
# If the user types 20, age is "20".
# If you try to do math: age + 5, Python will crash with a TypeError.
\`\`\`

### Output: Displaying Data to the World
We already know \`print()\` displays text. But it can do much more.

**Multiple Arguments:**
You can pass multiple items to \`print()\`, separated by commas. By default, Python will insert a space between them.
\`\`\`python
name = "Sarah"
score = 88
print("Player", name, "achieved a score of", score) 
# Output: Player Sarah achieved a score of 88
\`\`\`

**Customizing end and sep:**
By default, \`print()\` ends with a newline character (\`\\n\`), moving the cursor to the next line. You can change this using the \`end\` parameter.
You can also change the separator using the \`sep\` parameter.
\`\`\`python
print("Loading", end="...")
print("Complete!")
# Output: Loading...Complete!

print("A", "B", "C", sep=" | ")
# Output: A | B | C
\`\`\``
                    },
                    {
                        title: "String Formatting Masterclass", type: "lesson", order: 2,
                        content: `## String Formatting Masterclass

When building applications, you constantly need to mix static text with dynamic variable data. Python gives you several ways to do this, but the modern standard is the **f-string** (formatted string literal), introduced in Python 3.6.

### F-Strings
Place an \`f\` or \`F\` immediately before your opening quote. Then, any variable inside curly braces \`{}\` will be evaluated and converted to a string automatically.

\`\`\`python
item = "Sword"
durability = 85.5
print(f"Your {item} has {durability}% durability remaining.")
\`\`\`

### Advanced F-String Capabilities

**1. Inline Math and Expressions**
You can execute Python code directly inside the curly braces.
\`\`\`python
quantity = 5
price = 2.50
print(f"Total cost: \${quantity * price}")  # Output: Total cost: $12.5
\`\`\`

**2. Number Formatting (Precision)**
You can format how numbers display by adding a colon \`:\` followed by a format specifier. For monetary values, we often want exactly 2 decimal places. Use \`:.2f\` (2 floating point digits).
\`\`\`python
pi = 3.14159265
print(f"Pi rounded is roughly {pi:.2f}")  # Output: Pi rounded is roughly 3.14
\`\`\`

**3. Alignment and Padding**
Need to print a neat table? You can pad strings with spaces.
- \`:<10\` Left align within character width 10.
- \`:>10\` Right align within character width 10.
- \`:^10\` Center align.

\`\`\`python
print(f"|{'Name':<10}|{'Score':>5}|")
print(f"|{'Alice':<10}|{95:>5}|")
print(f"|{'Bob':<10}|{8:>5}|")
\`\`\`
Output:
\`\`\`
|Name      |Score|
|Alice     |   95|
|Bob       |    8|
\`\`\``
                    }
                ]
            },
            {
                title: "Mini Projects — String Mastery", order: 3,
                nodes: [
                    {
                        title: "Project Guide: Receipt Generator", type: "lesson", order: 1,
                        content: `## Project Guide: Receipt Generator

### Introduction
Businesses generate receipts dynamically based on purchases. In this project, you will prompt the user for purchase information and generate a beautifully formatted, aligned text receipt using f-strings.

### Goal
Ask the user for a company name, an item name, an item price, and a quantity. Calculate the total cost, and print out a formatted receipt box where prices are properly aligned and rounded to 2 decimal places.

### Requirements
1. Use \`input()\` to collect: Company Name, Item Name, Item Price (needs conversion to float), and Quantity (needs conversion to int).
2. Calculate the total price.
3. Print a dashed top border.
4. Print the Company Name centered.
5. Print the item details and total aligned neatly using f-string padding.

### Step-by-Step Guide

**Step 1: Collect Inputs**
Ask the user for the relevant data.
*Hint: Remember to wrap your inputs in \`float()\` or \`int()\` right away so you can do math on them later!*
\`\`\`python
price = float(input("Enter item price: "))
\`\`\`

**Step 2: Math Calculations**
Calculate \`total = price * quantity\`.

**Step 3: Print the Border & Header**
Decide on a width for your receipt, e.g., 30 characters.
Print 30 asterisks or dashes. 
Then, use f-string centering to center the company name across 30 characters.
*Hint:* \`print(f"{company_name:^30}")\`

**Step 4: Print the Rows**
Now you need to print the item details. You have 30 characters of width to play with.
If you left-align the item name to 20 characters, you have 10 characters left to right-align the price.
*Hint:* \`print(f"{item_name:<20}\${price:> 9.2f}")\` (Note: the $ takes 1 character, so 20 + 1 + 9 = 30 width!).

### Challenge Yourself
            - Add sales tax(e.g., 8 %) to the total.Calculate the tax amount and the grand total, and list them separately on the receipt.
- Add a timestamp to the bottom of the receipt.You can look up the \`datetime\` module in Python to figure out how to get the current date and time!`
          }
]
      }
    ]
  },

{
    title: "Type Systems and Conversions", order: 3,
        chapters: [
            {
                title: "Operators, Expressions, and Conversions", order: 1,
                nodes: [
                    {
                        title: "The Mechanics of Operators", type: "lesson", order: 1,
                        content: `## The Mechanics of Operators

An **expression** is a combination of values, variables, and operators that evaluates to a single new value.
\`5 + 3\` is an expression that evaluates to \`8\`. 
To define logical and mathematical expressions, Python uses **operators**.

### Arithmetic Operators
- Addition \`+\`
- Subtraction \`-\`
- Multiplication \`*\`
- Division \`/\`: **Always** returns a float, even if it divides perfectly. (\`10 / 2\` evaluates to \`5.0\`).
- Floor Division \`//\`: Divides and chops off the decimal entirely (no rounding). (\`10 // 3\` evaluates to \`3\`).
- Modulo \`%\`: Returns the remainder of division. Extremely useful for finding if numbers are even/odd or looping arrays. (\`10 % 3\` evaluates to \`1\`).
- Exponentiation \`**\`: Power operator. (\`2 ** 3\` is 2 cubed, evaluating to \`8\`).

### Comparison Operators
These compare two values and **always return a Boolean** (\`True\` or \`False\`).
- \`==\` Equal to. *(Notice it is two equals signs! A single \`=\` is for assignment).*
- \`!=\` Not equal to.
- \`>\` Greater than.
- \`<\` Less than.
- \`>=\` Greater than or equal to.
- \`<=\` Less than or equal to.

### Logical Operators
Used to combine multiple Boolean conditions together.
- \`and\`: Returns \`True\` if BOTH sides are \`True\`.
- \`or\`: Returns \`True\` if AT LEAST ONE side is \`True\`.
- \`not\`: Reverses the Boolean value.

\`\`\`python
temperature = 25
is_raining = False

if temperature > 20 and not is_raining:
    print("It's a perfect day for a walk!")
\`\`\`

### Assignment Operators
Shorthand ways to update a variable based on its current value.
Instead of writing \`score = score + 10\`, you can write:
- \`+=\`: Add and assign (\`score += 10\`)
- \`-=\`: Subtract and assign (\`health -= 20\`)
- \`*=\`: Multiply and assign
- \`/=\`: Divide and assign`
                    },
                    {
                        title: "Type Conversions (Casting)", type: "lesson", order: 2,
                        content: `## Type Conversions (Casting)

Python protects you from doing nonsensical things, like adding a word to a number.
\`"Alice" + 5\` throws a \`TypeError\`.
But what if you really need to combine them? You use **Type Conversion** (also known as casting).

### Explicit Casting
You manually tell Python to convert a value using built-in functions.

**1. Converting to String: \`str()\`**
To combine strings with numbers, you must cast the numbers to strings first.
*(Note: f-strings do this automatically for you, which is why they are preferred, but \`str()\` is still useful!)*
\`\`\`python
age = 25
message = "I am " + str(age) + " years old."
\`\`\`

**2. Converting to Integer: \`int()\`**
Essential when receiving numbers from the \`input()\` function.
\`\`\`python
# "50" -> 50
players = int("50")

# 4.99 -> 4 (Warning: float to int drops the decimal, it does NOT round!)
rounded_down = int(4.99)
\`\`\`

**3. Converting to Float: \`float()\`**
\`\`\`python
# "9.99" -> 9.99
price = float("9.99")
\`\`\`

### Implicit Casting (Type Coercion)
Sometimes, Python automatically converts types for you to prevent data loss. 
If you mix an integer and a float in a math operation, Python silently promotes the integer to a float before doing the math.

\`\`\`python
a = 10     # integer
b = 3.5    # float
c = a + b  # c becomes 13.5 (float)
\`\`\`

### ValueError
What happens if you try to cast text into a number, but the text isn't a valid number?
\`\`\`python
int("hello") # Crashes the program!
\`\`\`
This throws a \`ValueError\`. Dealing with bad user input requires Error Handling (\`try/except\`), which we'll cover later. For now, assume your users provide perfectly typed inputs.`
                    },
                    {
                        title: "Operators Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does the expression `15 // 4` evaluate to in Python?", options: ["3.75", "4", "3", "15"], correctAnswer: 2 },
                            { question: "What is the result of `10 % 3`?", options: ["3.33", "0", "1", "3"], correctAnswer: 2 },
                            { question: "Which comparison operator checks if two values are equal?", options: ["=", "==", "===", "=>"], correctAnswer: 1 },
                            { question: "What happens if you run `int('5.5')`?", options: ["It returns 5", "It returns 6", "It throws a ValueError", "It returns '5'"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Logic and Math", order: 2,
                nodes: [
                    {
                        title: "Project Guide: Currency Converter", type: "lesson", order: 1,
                        content: `## Project Guide: Currency Exchange Calculator

### Introduction
In this project, you will build an application that asks the user for a monetary amount in USD, and then converts it to three different currencies: Euros, British Pounds, and Japanese Yen.

### Goal
Prompt the user for an amount in USD. Perform the math to map that amount to three foreign exchange rates. Output a sleek summary displaying the converted amounts, rounded accurately.

### Requirements
1. Define 3 separate variables at the top of your file to hold the exchange rates (e.g., \`EUR_RATE = 0.85\`). Use ALL_CAPS to signal they are constants.
2. Ask the user for the USD amount and ensure it is stored as a \`float\`.
3. Create 3 new variables to calculate the exchanged totals.
4. Output the results using f-strings, ensuring the Euros and Pounds are formatted to 2 decimal places, while the Yen should have NO decimal places (as Yen is generally exchanged in whole numbers).

### Step-by-Step Guide

**Step 1: Set up constraints:**
Research or invent current exchange rates.
\`\`\`python
EUR_RATE = 0.93
GBP_RATE = 0.79
JPY_RATE = 149.50
\`\`\`

**Step 2: Take Input:**
Use \`input()\`. Wrap the \`input()\` call immediately inside a \`float()\` call to cast the result in one line.

**Step 3: Calculate:**
For each currency, multiply the user's USD input by the constant exchange rate.

**Step 4: Format and Print:**
Use f-strings to align the outputs.
*Hint for the Yen:* To ensure it prints without decimals, use the format specifier \`:.0f\` (zero floating digits) inside the f-string curly braces.

### Challenge Yourself
- Provide an option at the start: Ask the user IF they are providing USD, EUR, or GBP, and then dynamically convert to the other currencies based on their choice. (You will need to construct an \`if/elif/else\` statement for this).`
                    },
                    {
                        title: "Project Guide: Geometry Master", type: "lesson", order: 2,
                        content: `## Project Guide: Geometry Master

### Introduction
Math and programming go hand-in-hand. You will implement formulas to calculate the area and perimeter of a circle and a rectangle based on user dimensions.

### Goal
Calculate and display the Area and Perimeter/Circumference for a Rectangle and a Circle.

### Formulas
*Rectangle:*
- Area = Length * Width
- Perimeter = 2 * (Length + Width)

*Circle:*
- Area = Pi * Radius^2
- Circumference = 2 * Pi * Radius

### Requirements
1. Import the \`math\` module at the very top of your file (\`import math\`). You will use \`math.pi\` to get a highly accurate value of Pi.
2. Ask the user for the \`length\` and \`width\` of a rectangle.
3. Ask the user for the \`radius\` of a circle.
4. Use the exponentiation operator \`**\` to square the radius.
5. Display all 4 calculated results beautifully formatted to 2 decimal places.

### Step-by-Step Guide

**Step 1:**
Begin your file with \`import math\`. This grants you access to mathematical constants and functions.

**Step 2:**
Collect \`length\`, \`width\`, and \`radius\` from the user as floats.

**Step 3:**
Perform the rectangle calculations. Remember the Order of Operations! You must use parentheses for the perimeter calculation: \`2 * (length + width)\`. If you write \`2 * length + width\`, Python will multiply length by 2, and then add width, which is mathematically incorrect for a perimeter.

**Step 4:**
Perform the circle calculations.
Area = \`math.pi * (radius ** 2)\`
Circumference = \`2 * math.pi * radius\`

**Step 5:**
Print out a nice report. 
\`print("--- Rectangle Stats ---")\`
Then print the results.

### Challenge Yourself
- Build a Cylinder volume calculator. Formula: Volume = Area of Circle Base * Height. Ask the user for the cylinder height in addition to the radius!
- If the user enters a negative number for a dimension, use the \`abs()\` absolute value function to silently convert it to a positive number before doing the math.`
                    }
                ]
            }
        ]
}
];
