// Python Masterclass — Part B (Sections 6-9)
export const pythonMasterclassPartB = [
    {
        title: "Memory and References", order: 6,
        chapters: [
            {
                title: "How Python Manages Memory", order: 1,
                nodes: [
                    {
                        title: "References and Mutability", type: "lesson", order: 1,
                        content: `## Python References and Mutability\n\nIn Python, variables don't store values directly — they store **references** (pointers) to objects in memory.\n\n\`\`\`python\n# Immutable types (int, str, float, tuple)\n# A new object is created when value changes\na = 10\nb = a       # b points to the same object as a\nb = 20      # b now points to a NEW object; a is unchanged\nprint(a)    # 10 — unchanged!\n\n# Mutable types (list, dict, set)\n# Changes affect the same object\nlist1 = [1, 2, 3]\nlist2 = list1   # SAME object!\nlist2.append(4)\nprint(list1)    # [1, 2, 3, 4] — list1 changed too!\n\n# To copy:\nlist3 = list1.copy()    # Shallow copy\nlist3.append(99)\nprint(list1)  # [1, 2, 3, 4] — unaffected\n\`\`\`\n\n**Checking identity vs equality:**\n\`\`\`python\na = [1, 2, 3]\nb = a\nc = [1, 2, 3]\n\nprint(a == c)   # True — same values\nprint(a is c)   # False — different objects\nprint(a is b)   # True — same object!\n\`\`\``
                    },
                    {
                        title: "Garbage Collection", type: "lesson", order: 2,
                        content: `## Python's Automatic Memory Management\n\nUnlike C, Python handles memory automatically through a **garbage collector**. You never call \`free()\`.\n\n**How it works:**\n\`\`\`python\nimport sys\n\n# Python tracks how many variables point to each object\na = [1, 2, 3]\nprint(sys.getrefcount(a))  # 2 (a + the getrefcount call itself)\n\nb = a\nprint(sys.getrefcount(a))  # 3 — one more reference\n\ndel b  # Remove reference\nprint(sys.getrefcount(a))  # 2 — back to 2\n# When reference count hits 0, memory is auto-freed!\n\`\`\`\n\n**The \`del\` statement:**\n\`\`\`python\nx = [1, 2, 3]\nprint(x)     # [1, 2, 3]\n\ndel x        # Removes the reference\n# print(x)  # NameError: name 'x' is not defined\n\`\`\`\n\n**Memory efficiency tips:**\n\`\`\`python\n# For large data, use generators instead of lists\n# List: creates all 1M numbers in memory at once\nbig_list = [x**2 for x in range(1_000_000)]\n\n# Generator: creates one number at a time — uses almost no memory!\nbig_gen = (x**2 for x in range(1_000_000))\n\`\`\``
                    },
                    {
                        title: "Dataclasses", type: "lesson", order: 3,
                        content: `## Dataclasses — Python Structs\n\nDataclasses let you create clean data containers without writing boilerplate \`__init__\` code.\n\n\`\`\`python\nfrom dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass\nclass Student:\n    name: str\n    age: int\n    gpa: float = 0.0         # Default value\n    courses: List[str] = field(default_factory=list)\n    \n    def is_honor_roll(self) -> bool:\n        return self.gpa >= 3.5\n\n# Creation — no need to write __init__!\ns1 = Student("Alice", 20, 3.85)\ns2 = Student("Bob", 21, 3.2, ["Python", "Math"])\n\nprint(s1)                    # Student(name='Alice', age=20, gpa=3.85, courses=[])\nprint(s1.is_honor_roll())    # True\ns1.courses.append("Physics")\nprint(s1.courses)            # ['Physics']\n\n# Dataclasses also give you\nprint(s1 == Student("Alice", 20, 3.85))  # True — equality comparison\n\`\`\``
                    },
                    {
                        title: "Memory Quiz", type: "quiz", order: 4,
                        questions: [
                            { question: "What happens when you do list2 = list1 in Python?", options: ["A copy is made", "Both variables point to the same list", "list2 becomes empty", "An error occurs"], correctAnswer: 1 },
                            { question: "How do you make a shallow copy of a list?", options: ["list2 = list1", "list2 = list1.copy()", "list2 = copy(list1)", "list2 = list1[:]"], correctAnswer: 1 },
                            { question: "What is Python's strategy for managing memory?", options: ["Manual free()", "Garbage collection with reference counting", "Stack-only allocation", "No memory management"], correctAnswer: 1 },
                            { question: "What does 'del x' do to variable x?", options: ["Sets it to None", "Clears its value", "Removes the reference (may free memory)", "Crashes the program"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Memory", order: 2,
                nodes: [
                    {
                        title: "Project: Student Record System", type: "lesson", order: 1,
                        content: `## Project: Student Record System\n\n\`\`\`python\nfrom dataclasses import dataclass, field\nfrom typing import List\n\n@dataclass\nclass Student:\n    name: str\n    roll: int\n    grades: List[float] = field(default_factory=list)\n    \n    @property\n    def average(self):\n        return sum(self.grades) / len(self.grades) if self.grades else 0.0\n    \n    @property\n    def grade_letter(self):\n        avg = self.average\n        if avg >= 90: return 'A'\n        if avg >= 80: return 'B'\n        if avg >= 70: return 'C'\n        return 'F'\n\nclass Classroom:\n    def __init__(self):\n        self.students: List[Student] = []\n    \n    def add(self, name, roll, grades):\n        self.students.append(Student(name, roll, grades))\n    \n    def top_student(self):\n        return max(self.students, key=lambda s: s.average)\n    \n    def report(self):\n        print(f"\\n{'Name':<15} {'Roll':>5} {'Avg':>6} {'Grade':>6}")\n        print("-" * 35)\n        for s in sorted(self.students, key=lambda s: s.average, reverse=True):\n            print(f"{s.name:<15} {s.roll:>5} {s.average:>6.1f} {s.grade_letter:>6}")\n\ncls = Classroom()\ncls.add("Alice", 1, [95, 88, 92])\ncls.add("Bob", 2, [72, 68, 75])\ncls.add("Carol", 3, [88, 91, 85])\ncls.report()\nprint(f"\\n🏆 Top: {cls.top_student().name}")\n\`\`\``
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
                        title: "File Operations in Python", type: "lesson", order: 1,
                        content: `## File Operations in Python\n\n\`\`\`python\n# Writing — 'w' overwrites, 'a' appends\nwith open("notes.txt", "w") as f:\n    f.write("Line 1\\n")\n    f.write("Line 2\\n")\n\n# Always use 'with' — it auto-closes the file!\n\n# Reading — several methods\nwith open("notes.txt", "r") as f:\n    content = f.read()          # Entire file as one string\n\nwith open("notes.txt", "r") as f:\n    lines = f.readlines()       # List of lines (includes \\n)\n\nwith open("notes.txt", "r") as f:\n    for line in f:              # Memory-efficient for large files\n        print(line.strip())     # strip() removes trailing \\n\n\n# Appending\nwith open("notes.txt", "a") as f:\n    f.write("Line 3\\n")  # Added to end, not overwritten\n\`\`\`\n\n**File modes:**\n| Mode | Meaning |\n|------|---------|\n| \`"r"\` | Read (must exist) |\n| \`"w"\` | Write (creates/overwrites) |\n| \`"a"\` | Append (adds to end) |\n| \`"x"\` | Create (fails if exists) |\n| \`"r+"\` | Read and write |`
                    },
                    {
                        title: "Error Handling and JSON", type: "lesson", order: 2,
                        content: `## File Error Handling and JSON\n\n**Safe file reading with try-except:**\n\`\`\`python\nimport os\n\ndef read_file(filename):\n    try:\n        with open(filename, "r") as f:\n            return f.read()\n    except FileNotFoundError:\n        print(f"'{filename}' not found.")\n        return None\n    except PermissionError:\n        print("No permission to read this file.")\n        return None\n\ncontent = read_file("data.txt")\nif content:\n    print(content)\n\`\`\`\n\n**Working with JSON (the most common data format):**\n\`\`\`python\nimport json\n\n# Writing JSON\ndata = {\n    "name": "Alice",\n    "age": 20,\n    "courses": ["Python", "Math"]\n}\nwith open("user.json", "w") as f:\n    json.dump(data, f, indent=2)\n\n# Reading JSON\nwith open("user.json", "r") as f:\n    loaded = json.load(f)\n\nprint(loaded["name"])     # Alice\nprint(loaded["courses"])  # ['Python', 'Math']\n\`\`\``
                    },
                    {
                        title: "File Handling Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What file mode adds to existing content without deleting it?", options: ["'r'", "'w'", "'a'", "'x'"], correctAnswer: 2 },
                            { question: "What does the 'with' statement do in file operations?", options: ["Opens the file", "Automatically closes the file when done", "Creates the file", "Reads the file"], correctAnswer: 1 },
                            { question: "What exception is raised when a file doesn't exist?", options: ["IOError", "FileNotFoundError", "OSError", "MissingFileError"], correctAnswer: 1 },
                            { question: "What Python module handles JSON files?", options: ["csv", "os", "json", "data"], correctAnswer: 2 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Files", order: 2,
                nodes: [
                    {
                        title: "Project: Personal Diary App", type: "lesson", order: 1,
                        content: `## Project: Personal Diary App\n\n\`\`\`python\nimport json, os\nfrom datetime import datetime\n\nFILE = "diary.json"\n\ndef load():\n    if os.path.exists(FILE):\n        with open(FILE) as f:\n            return json.load(f)\n    return []\n\ndef save(entries):\n    with open(FILE, "w") as f:\n        json.dump(entries, f, indent=2)\n\ndef write_entry(entries):\n    text = input("Write your entry:\\n> ")\n    entries.append({\n        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),\n        "entry": text\n    })\n    save(entries)\n    print("✅ Saved!")\n\ndef read_entries(entries):\n    if not entries:\n        print("No entries yet!")\n        return\n    for e in entries:\n        print(f"\\n📅 {e['date']}\\n{e['entry']}")\n\nentries = load()\nwhile True:\n    print("\\n1. Write  2. Read  3. Quit")\n    c = input("Choice: ")\n    if c == "1": write_entry(entries)\n    elif c == "2": read_entries(entries)\n    elif c == "3": break\n\`\`\`\n\n**Extensions:**\n- 🔥 Add search by date or keyword\n- 🔥 Delete the last entry`
                    },
                    {
                        title: "Project: CSV Grade Manager", type: "lesson", order: 2,
                        content: `## Project: CSV Grade Manager\n\n\`\`\`python\nimport csv, os\n\nFILE = "grades.csv"\nFIELDS = ["name", "math", "science", "english"]\n\ndef load():\n    if not os.path.exists(FILE): return []\n    with open(FILE) as f:\n        return list(csv.DictReader(f))\n\ndef save(rows):\n    with open(FILE, "w", newline="") as f:\n        w = csv.DictWriter(f, fieldnames=FIELDS)\n        w.writeheader()\n        w.writerows(rows)\n\ndef add(rows):\n    name = input("Name: ")\n    m = float(input("Math: "))\n    s = float(input("Science: "))\n    e = float(input("English: "))\n    rows.append({"name":name,"math":m,"science":s,"english":e})\n    save(rows)\n    print("✅ Added!")\n\ndef report(rows):\n    if not rows: print("No records."); return\n    print(f"\\n{'Name':<15}{'Math':>7}{'Sci':>7}{'Eng':>7}{'Avg':>7}")\n    print("-"*43)\n    for r in rows:\n        avg=(float(r['math'])+float(r['science'])+float(r['english']))/3\n        print(f"{r['name']:<15}{r['math']:>7}{r['science']:>7}{r['english']:>7}{avg:>7.1f}")\n\nrows = load()\nwhile True:\n    print("\\n1. Add  2. Report  3. Exit")\n    c = input("Choice: ")\n    if c=="1": add(rows)\n    elif c=="2": report(rows)\n    elif c=="3": break\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Object-Oriented Programming", order: 8,
        chapters: [
            {
                title: "Classes and OOP Pillars", order: 1,
                nodes: [
                    {
                        title: "Classes, Encapsulation, Inheritance", type: "lesson", order: 1,
                        content: `## OOP in Python — Classes & Encapsulation\n\n**Class basics:**\n\`\`\`python\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.__balance = balance  # __ = private\n    \n    # Getter using @property\n    @property\n    def balance(self):\n        return self.__balance\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    \n    def withdraw(self, amount):\n        if 0 < amount <= self.__balance:\n            self.__balance -= amount\n        else:\n            print("Invalid withdrawal.")\n    \n    def __str__(self):  # How to print the object\n        return f"{self.owner}'s account: Rs.{self.__balance}"\n\nacc = BankAccount("Alice", 1000)\nacc.deposit(500)\nacc.withdraw(200)\nprint(acc)           # Alice's account: Rs.1300\nprint(acc.balance)   # 1300\n# acc.__balance = 0  # Won't work as expected!\n\`\`\``
                    },
                    {
                        title: "Inheritance and Polymorphism", type: "lesson", order: 2,
                        content: `## Inheritance and Polymorphism in Python\n\n\`\`\`python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):   # To be overridden\n        return f"{self.name} makes a sound.\"\n    \n    def eat(self):\n        print(f"{self.name} is eating.")\n\nclass Dog(Animal):\n    def speak(self):   # Override\n        return f"{self.name} says Woof!"\n    \n    def fetch(self):\n        print(f"{self.name} fetches the ball!")\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says Meow!"\n\n# Polymorphism in action\nanimals = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy")]\nfor animal in animals:\n    print(animal.speak())  # Each calls its OWN version\n\n# isinstance() check\nrex = Dog("Rex")\nprint(isinstance(rex, Dog))     # True\nprint(isinstance(rex, Animal))  # True — Dog IS an Animal!\n\n# super() — call parent method\nclass TrainedDog(Dog):\n    def speak(self):\n        parent_speak = super().speak()  # Dog's speak\n        return parent_speak + " (And sits on command!)"\n\`\`\``
                    },
                    {
                        title: "OOP Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "What does 'self' refer to in a Python class method?", options: ["The class", "The current object instance", "The parent class", "The program"], correctAnswer: 1 },
                            { question: "What prefix makes an attribute private in Python?", options: ["_", "__", "#", "@"], correctAnswer: 1 },
                            { question: "What keyword inherits from another class in Python?", options: ["extends", "implements", "inherits", "ChildClass(ParentClass)"], correctAnswer: 3 },
                            { question: "What does super().__init__() do?", options: ["Creates a new object", "Calls the parent class constructor", "Deletes the object", "Calls a sibling method"], correctAnswer: 1 }
                        ]
                    },
                    {
                        title: "OOP Challenge", type: "challenge", order: 4,
                        starterCode: "class Shape:\n    def area(self):\n        return 0\n    def perimeter(self):\n        return 0\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        pass\n    def area(self):\n        pass\n    def perimeter(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        pass\n    def area(self):\n        pass  # use 3.14159 for pi\n    def perimeter(self):\n        pass  # circumference = 2 * pi * r",
                        solution: "class Shape:\n    def area(self): return 0\n    def perimeter(self): return 0\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self): return self.w * self.h\n    def perimeter(self): return 2 * (self.w + self.h)\n\nclass Circle(Shape):\n    PI = 3.14159\n    def __init__(self, r):\n        self.r = r\n    def area(self): return self.PI * self.r ** 2\n    def perimeter(self): return 2 * self.PI * self.r",
                        testCases: [
                            { input: "Rectangle(4,5).area()", expectedOutput: "20" },
                            { input: "Rectangle(4,5).perimeter()", expectedOutput: "18" },
                            { input: "Circle(7).area()", expectedOutput: "153.93791" }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — OOP", order: 2,
                nodes: [
                    {
                        title: "Project: Library System", type: "lesson", order: 1,
                        content: `## Project: Library Management System\n\n\`\`\`python\nclass Book:\n    def __init__(self, title, author, isbn):\n        self.title = title\n        self.author = author\n        self.isbn = isbn\n        self.borrowed = False\n    def __str__(self):\n        status = "📕 Borrowed" if self.borrowed else "📗 Available"\n        return f"'{self.title}' by {self.author} [{status}]"\n\nclass Library:\n    def __init__(self):\n        self.books = []\n    \n    def add_book(self, *args):\n        self.books.append(Book(*args))\n    \n    def borrow(self, isbn, borrower):\n        for b in self.books:\n            if b.isbn == isbn:\n                if b.borrowed:\n                    print(f"'{b.title}' is already borrowed.")\n                else:\n                    b.borrowed = True\n                    print(f"✅ {borrower} borrowed '{b.title}'")\n                return\n        print("Book not found.")\n    \n    def return_book(self, isbn):\n        for b in self.books:\n            if b.isbn == isbn and b.borrowed:\n                b.borrowed = False\n                print(f"✅ '{b.title}' returned.")\n                return\n        print("Book not borrowed or not found.")\n    \n    def catalog(self):\n        print("\\n=== Library Catalog ===")\n        for b in self.books: print(f"  {b}")\n\nlib = Library()\nlib.add_book("Clean Code", "Robert Martin", "001")\nlib.add_book("Python Crash Course", "Eric Matthes", "002")\nlib.catalog()\nlib.borrow("001", "Alice")\nlib.borrow("001", "Bob")  # Already borrowed\nlib.catalog()\nlib.return_book("001")\n\`\`\``
                    },
                    {
                        title: "Project: RPG Battle System", type: "lesson", order: 2,
                        content: `## Project: Simple RPG Battle System\n\n\`\`\`python\nimport random\n\nclass Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.max_hp = hp\n        self.hp = hp\n        self.attack = attack\n    \n    def is_alive(self): return self.hp > 0\n    \n    def take_damage(self, dmg):\n        self.hp = max(0, self.hp - dmg)\n        print(f"  💔 {self.name}: {self.hp}/{self.max_hp} HP")\n    \n    def attack_target(self, target):\n        dmg = random.randint(self.attack - 3, self.attack + 3)\n        print(f"⚔️ {self.name} attacks {target.name} for {dmg}!")\n        target.take_damage(dmg)\n\nclass Warrior(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=120, attack=15)\n\nclass Mage(Character):\n    def __init__(self, name):\n        super().__init__(name, hp=80, attack=25)\n        self.mana = 50\n    \n    def fireball(self, target):\n        if self.mana >= 20:\n            self.mana -= 20\n            dmg = self.attack * 2\n            print(f"🔥 {self.name} casts Fireball for {dmg}!")\n            target.take_damage(dmg)\n        else:\n            self.attack_target(target)\n\nhero = Warrior("Arthur")\nboss = Mage("Dark Wizard")\n\nprint("=== BATTLE START ===")\nrnd = 1\nwhile hero.is_alive() and boss.is_alive():\n    print(f"\\n--- Round {rnd} ---")\n    hero.attack_target(boss)\n    if boss.is_alive():\n        boss.fireball(hero)\n    rnd += 1\n\nwinner = hero if hero.is_alive() else boss\nprint(f"\\n🏆 {winner.name} wins!")\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Software Engineering Principles", order: 9,
        chapters: [
            {
                title: "Clean Code and Design Patterns", order: 1,
                nodes: [
                    {
                        title: "Clean Code in Python", type: "lesson", order: 1,
                        content: `## Writing Clean Python Code\n\n**1. Meaningful names:**\n\`\`\`python\n# ❌ Bad\ndef calc(x, y, z):\n    return x * y * (1 - z/100)\n\n# ✅ Good\ndef calculate_discounted_price(price, quantity, discount_pct):\n    return price * quantity * (1 - discount_pct / 100)\n\`\`\`\n\n**2. Functions do ONE thing:**\n\`\`\`python\n# ❌ Bad — one function does everything\ndef process(user):\n    print(user['name'])\n    user['email'] = user['email'].lower()\n    with open('log.txt','a') as f: f.write(str(user))\n\n# ✅ Good — each concern is separate\ndef display(user): print(user['name'])\ndef normalize(user): user['email'] = user['email'].lower()\ndef log(user, path): ...\n\`\`\`\n\n**3. List comprehensions and generators:**\n\`\`\`python\n# ❌ Verbose\nresults = []\nfor x in range(100):\n    if x % 2 == 0:\n        results.append(x ** 2)\n\n# ✅ Pythonic\nresults = [x**2 for x in range(100) if x % 2 == 0]\n\n# ✅ Even better for large data — use a generator\nresults_gen = (x**2 for x in range(100) if x % 2 == 0)\n\`\`\`\n\n**4. Type hints (Python 3.5+):**\n\`\`\`python\ndef calculate_bmi(weight_kg: float, height_m: float) -> float:\n    return weight_kg / (height_m ** 2)\n\`\`\``
                    },
                    {
                        title: "Design Patterns in Python", type: "lesson", order: 2,
                        content: `## Key Design Patterns in Python\n\n**Singleton — only one instance:**\n\`\`\`python\nclass Config:\n    _instance = None\n    \n    @classmethod\n    def get(cls):\n        if cls._instance is None:\n            cls._instance = cls()\n        return cls._instance\n    \n    def __init__(self):\n        self.debug = False\n        self.db_url = "localhost:5432"\n\nc1 = Config.get()\nc2 = Config.get()\nprint(c1 is c2)  # True — same object!\n\`\`\`\n\n**Factory — centralise object creation:**\n\`\`\`python\nclass DatabaseFactory:\n    @staticmethod\n    def create(db_type: str):\n        if db_type == "postgres": return PostgresDB()\n        if db_type == "mongo":    return MongoDB()\n        if db_type == "sqlite":   return SQLiteDB()\n        raise ValueError(f"Unknown: {db_type}")\n\ndb = DatabaseFactory.create("postgres")\n\`\`\`\n\n**Observer — event system:**\n\`\`\`python\nclass EventBus:\n    def __init__(self):\n        self._handlers = {}\n    \n    def on(self, event, handler):\n        self._handlers.setdefault(event, []).append(handler)\n    \n    def emit(self, event, data=None):\n        for h in self._handlers.get(event, []):\n            h(data)\n\nbus = EventBus()\nbus.on("login", lambda u: print(f"Welcome, {u}!"))\nbus.on("login", lambda u: print(f"Logging {u}'s access..."))\nbus.emit("login", "Alice")\n\`\`\``
                    },
                    {
                        title: "Debugging in Python", type: "lesson", order: 3,
                        content: `## Debugging Python Programs\n\n**Types of errors:**\n\`\`\`python\n# Syntax Error — code won't run\nprint("hi"   # Missing )\n\n# Runtime Error — crashes while running\nnums = [1,2,3]\nprint(nums[10])  # IndexError\n\n# Logic Error — runs but wrong answer\ndef avg(a, b):\n    return a + b / 2  # Bug! Should be (a+b)/2\n\`\`\`\n\n**Structured error handling:**\n\`\`\`python\ndef safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("Cannot divide by zero!")\n        return None\n    except TypeError as e:\n        print(f"Type error: {e}")\n        return None\n    finally:\n        print("Division attempted.")  # Always runs\n\n# Custom exceptions\nclass InsufficientFundsError(Exception):\n    def __init__(self, amount, balance):\n        super().__init__(f"Need Rs.{amount}, have Rs.{balance}")\n        self.amount = amount\n        self.balance = balance\n\nraise InsufficientFundsError(500, 200)  # Custom error!\n\`\`\`\n\n**The pdb debugger:**\n\`\`\`python\nimport pdb\ndef buggy(data):\n    pdb.set_trace()  # Program pauses here\n    # Type 'n' for next line, 'p var' to print, 'q' to quit\n    return sum(data) / len(data)\n\`\`\``
                    },
                    {
                        title: "Software Engineering Quiz", type: "quiz", order: 4,
                        questions: [
                            { question: "What does DRY stand for?", options: ["Do Run Yourself", "Don't Repeat Yourself", "Data Ready Yesterday", "Define Reusable Yield"], correctAnswer: 1 },
                            { question: "What is the Singleton pattern used for?", options: ["Creating many objects quickly", "Ensuring only one instance of a class exists", "Inheriting from multiple classes", "Sorting data"], correctAnswer: 1 },
                            { question: "What does the 'finally' block do in try-except?", options: ["Runs only if no error", "Runs only if there's an error", "Always runs, error or not", "Catches all errors"], correctAnswer: 2 },
                            { question: "What are type hints in Python used for?", options: ["Enforce types at runtime", "Document expected types for developers and tools", "Replace the type() function", "Create custom types"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Software Engineering", order: 2,
                nodes: [
                    {
                        title: "Project: Task Manager with OOP + Files", type: "lesson", order: 1,
                        content: `## Project: Full Task Manager\n\nThis project combines OOP, file handling, and clean code.\n\n\`\`\`python\nimport json, os\nfrom dataclasses import dataclass, asdict, field\nfrom datetime import date\n\n@dataclass\nclass Task:\n    id: int\n    title: str\n    priority: str  # high / medium / low\n    done: bool = False\n    due: str = field(default_factory=lambda: str(date.today()))\n\nclass TaskManager:\n    FILE = "tasks.json"\n    \n    def __init__(self):\n        self.tasks = []\n        self._load()\n    \n    def _load(self):\n        if os.path.exists(self.FILE):\n            with open(self.FILE) as f:\n                self.tasks = [Task(**t) for t in json.load(f)]\n    \n    def _save(self):\n        with open(self.FILE, "w") as f:\n            json.dump([asdict(t) for t in self.tasks], f, indent=2)\n    \n    def add(self, title, priority="medium", due=None):\n        new_id = max((t.id for t in self.tasks), default=0) + 1\n        t = Task(new_id, title, priority, due=due or str(date.today()))\n        self.tasks.append(t)\n        self._save()\n        print(f"✅ Added #{new_id}: '{title}'")\n    \n    def complete(self, task_id):\n        for t in self.tasks:\n            if t.id == task_id:\n                t.done = True\n                self._save()\n                return print(f"✅ #{task_id} done!")\n        print("Not found.")\n    \n    def show(self):\n        icons = {"high":"🔴","medium":"🟡","low":"🟢"}\n        print(f"\\n{'#':<4}{'✓':<4}{'Pri':<5}{'Due':<12}Title")\n        print("-"*50)\n        for t in sorted(self.tasks, key=lambda t: t.done):\n            status = "✅" if t.done else "⏳"\n            print(f"{t.id:<4}{status:<4}{icons.get(t.priority,'⚪'):<5}{t.due:<12}{t.title}")\n\ntm = TaskManager()\ntm.add("Learn Python OOP", "high", "2025-04-10")\ntm.add("Build portfolio", "high", "2025-04-20")\ntm.add("Read Clean Code", "medium")\ntm.complete(1)\ntm.show()\n\`\`\``
                    }
                ]
            }
        ]
    }
];
