// Dart Masterclass — Part B (Sections 6-9)
export const dartMasterclassPartB = [
    {
        title: "Asynchronous Programming (Replaces Memory section)", order: 6,
        chapters: [
            {
                title: "Futures and Async/Await", order: 1,
                nodes: [
                    {
                        title: "Why Asynchronous?", type: "lesson", order: 1,
                        content: `## Asynchronous Programming in Dart\n\nUnlike C where you manage memory, Dart manages memory for you. But as a UI language, Dart has a much bigger challenge: **keeping the UI responsive**.\n\nImagine dragging a screen while waiting for a photo to download. If the download blocks the main thread, the app freezes (Frame Drop). Dart uses an **Event Loop** to run code without blocking.\n\n**The Future Object:**\nA \`Future<T>\` represents a value that will be available... in the future! (Like a Promise in JavaScript).\n\n\`\`\`dart\n// This function takes 2 seconds to complete\nFuture<String> fetchUserData() {\n  return Future.delayed(\n    Duration(seconds: 2),\n    () => 'Alice Smith',\n  );\n}\n\nvoid main() {\n  print('Fetching user...');\n  \n  // .then runs WHEN the future completes\n  fetchUserData().then((String user) {\n    print('Got user: \$user');\n  });\n  \n  print('This prints IMMEDIATELY. The app is not frozen!');\n}\n\`\`\``
                    },
                    {
                        title: "Async / Await Syntax", type: "lesson", order: 2,
                        content: `## Async and Await\n\nUsing \`.then()\` gets messy fast (Callback Hell). Dart provides the \`async\` and \`await\` keywords so you can write asynchronous code that *looks* synchronous!\n\n\`\`\`dart\nFuture<String> fetchUser() async {\n  await Future.delayed(Duration(seconds: 2));\n  return 'Bob Jones';\n}\n\nFuture<int> fetchAge() async {\n  await Future.delayed(Duration(seconds: 1));\n  return 25;\n}\n\n// Any function using 'await' MUST be marked 'async' \nvoid main() async {\n  print('1. Starting...');\n  \n  // Execution PAUSES here, but the rest of the app (UI) stays responsive!\n  String name = await fetchUser();\n  print('2. User: \$name');\n  \n  int age = await fetchAge();\n  print('3. Age: \$age');\n  \n  print('4. Done!');\n}\n\`\`\`\n\n**Handling Errors (try/catch):**\n\`\`\`dart\nFuture<void> login() async {\n  try {\n    print(await fetchUser());\n  } catch (e) {\n    print('Network error: \$e');\n  }\n}\n\`\`\``
                    },
                    {
                        title: "Streams (Continuous Data)", type: "lesson", order: 3,
                        content: `## Streams — A River of Data\n\nA \`Future\` gives you a single value in the future. A \`Stream\` gives you a sequence of values over time! (Perfect for live data like GPS coordinates or Firebase updates).\n\n\`\`\`dart\n// This stream yields a highly every second, up to 'max'\nStream<int> counterStream(int max) async* {\n  for (int i = 1; i <= max; i++) {\n    await Future.delayed(Duration(seconds: 1));\n    yield i; // yield pushes a value into the stream\n  }\n}\n\nvoid main() async {\n  print('Listening to stream...');\n  \n  // await for loop listens to the entire stream!\n  await for (int number in counterStream(3)) {\n    print('Got: \$number');\n  }\n  \n  print('Stream finished!');\n}\n\`\`\`\n\n**Common Stream uses in Flutter:** Subscribing to database updates, sensing device orientation, reading WebSockets.`
                    },
                    {
                        title: "Async Quiz", type: "quiz", order: 4,
                        questions: [
                            { question: "What object represents a value that will be provided later?", options: ["Future", "Stream", "Async", "Later"], correctAnswer: 0 },
                            { question: "What keyword must you use on a function if you want to use 'await' inside it?", options: ["future", "wait", "async", "sync"], correctAnswer: 2 },
                            { question: "What is the difference between Future and Stream?", options: ["Future is fast, stream is slow", "Stream is for UI, Future is for backend", "Future returns one value, Stream yields multiple values over time", "None"], correctAnswer: 2 },
                            { question: "What happens to the main thread when it hits an 'await'?", options: ["The whole app freezes until it's done", "The function pauses, but the main thread is free to do other work", "The function crashes", "It runs synchronously"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — Async", order: 2,
                nodes: [
                    {
                        title: "Project: Simulated Weather App", type: "lesson", order: 1,
                        content: `## Project: Weather API Simulator\n\n\`\`\`dart\nimport 'dart:math';\nimport 'dart:async';\n\nclass WeatherService {\n  Future<String> fetchCity() async {\n    print('Requesting city data... 📡');\n    await Future.delayed(Duration(seconds: 1));\n    return 'London';\n  }\n\n  Future<double> fetchTemp(String city) async {\n    print('Parsing weather for \$city... 🌦️');\n    await Future.delayed(Duration(seconds: 2));\n    \n    // Simulate random network failure\n    if (Random().nextInt(10) > 8) {\n      throw Exception('Server Timeout!');\n    }\n    \n    return 15.5;\n  }\n}\n\nvoid main() async {\n  var api = WeatherService();\n  \n  try {\n    print('--- Weather App Started ---');\n    String city = await api.fetchCity();\n    double temp = await api.fetchTemp(city);\n    print('\\n✅ Success: \$city is \${temp}°C');\n  } catch (e) {\n    print('\\n❌ Error: \$e');\n  } finally {\n    print('--- App Ready ---');\n  }\n}\n\`\`\``
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
                        title: "Asynchronous File I/O", type: "lesson", order: 1,
                        content: `## File Handling in Dart\n\nFile operations happen on the hard drive, which is slow! Therefore, File I/O in Dart is fully asynchronous using Futures.\n\n\`\`\`dart\nimport 'dart:io';\n\nvoid main() async {\n  File file = File('data.txt');\n  \n  // Writing (overwrites)\n  await file.writeAsString('Line 1\\n');\n  \n  // Appending\n  await file.writeAsString('Line 2\\n', mode: FileMode.append);\n  \n  // Reading the entire file\n  print('Reading file:');\n  String content = await file.readAsString();\n  print(content);\n  \n  // Reading line by line (great for huge files)\n  List<String> lines = await file.readAsLines();\n  print('File has \${lines.length} lines.');\n  \n  // Deleting\n  if (await file.exists()) {\n    await file.delete();\n    print('File deleted.');\n  }\n}\n\`\`\``
                    },
                    {
                        title: "JSON Serialization", type: "lesson", order: 2,
                        content: `## JSON Encoding and Decoding\n\nJSON (JavaScript Object Notation) is the language of the internet. You'll convert Dart Maps to JSON to send to an API, and JSON strings back to Maps when receiving data.\n\n\`\`\`dart\nimport 'dart:convert';\n\nvoid main() {\n  // 1. Map to JSON String (Encoding)\n  Map<String, dynamic> user = {\n    'name': 'Alice',\n    'age': 25,\n    'isAdmin': true,\n    'scores': [100, 95]\n  };\n  \n  String jsonString = jsonEncode(user);\n  print(jsonString);\n  // {"name":"Alice","age":25,"isAdmin":true,"scores":[100,95]}\n  \n  // 2. JSON String to Map (Decoding)\n  String responseBody = '{"user_id": 42, "status": "active"}';\n  \n  // decode always returns dynamic (usually Map<String, dynamic>)\n  Map<String, dynamic> data = jsonDecode(responseBody);\n  \n  print(data['user_id']); // 42\n  print(data['status']);  // active\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Object-Oriented Programming (Dart Style)", order: 8,
        chapters: [
            {
                title: "Dart Classes and Constructors", order: 1,
                nodes: [
                    {
                        title: "Classes, Properties, and Methods", type: "lesson", order: 1,
                        content: `## Classes in Dart\n\n\`\`\`dart\nclass Person {\n  // Instance variables\n  String name;\n  int age;\n  \n  // Private variable (Starts with _)\n  double _money;\n\n  // Syntactic Sugar Constructor! (Initializes automatically)\n  Person(this.name, this.age, this._money);\n  \n  // Named Constructor (Dart doesn't support overloading!)\n  Person.newborn(this.name) : age = 0, _money = 0.0;\n  \n  // Getters and Setters\n  double get balance => _money;\n  \n  set addMoney(double amount) {\n    if (amount > 0) _money += amount;\n  }\n  \n  // Methods\n  void introduce() {\n    print('Hi, I am \$name and I am \$age years old.');\n  }\n}\n\nvoid main() {\n  var p1 = Person('Alice', 25, 1000.0);\n  p1.introduce();\n  \n  var p2 = Person.newborn('Baby Bob');\n  p2.introduce();\n  \n  // Accessing Getters and Setters (looks like a normal variable!)\n  p1.addMoney = 500.0;     // Uses setter\n  print(p1.balance);       // Uses getter\n}\n\`\`\``
                    },
                    {
                        title: "Inheritance, Mixins, and Interfaces", type: "lesson", order: 2,
                        content: `## Advanced OOP Features\n\n**1. Inheritance (\`extends\`) — Is-A relationship:**\n\`\`\`dart\nclass Animal { void breathe() => print('Breathing'); }\n\nclass Dog extends Animal {\n  void bark() => print('Woof');\n}\n\`\`\`\n\n**2. Implicit Interfaces (\`implements\`) — Acts-Like relationship:**\nEvery class in Dart is secretly an interface! If you implement it, you must rewrite ALL its methods.\n\`\`\`dart\nclass Flyer {\n  void fly() => print('Flying...');\n}\n\n// Must completely rewrite fly()\nclass Airplane implements Flyer {\n  @override\n  void fly() => print('Engine running, takeoff!');\n}\n\`\`\`\n\n**3. Mixins (\`with\`) — Has-A-Skill relationship (Dart's superpower!):**\nAllows you to share code across multiple class hierarchies without inheritance.\n\`\`\`dart\nmixin Swimmer {\n  void swim() => print('Swimming in the water 🏊‍♂️');\n}\n\nmixin Runner {\n  void run() => print('Running fast! 🏃‍♂️');\n}\n\n// A dog extends Animal, but MIXES IN Swimmer and Runner!\nclass AthleteDog extends Animal with Swimmer, Runner {}\n\nvoid main() {\n  var myDog = AthleteDog();\n  myDog.breathe(); // From Animal\n  myDog.swim();    // From Swimmer Mixin\n  myDog.run();     // From Runner Mixin\n}\n\`\`\``
                    },
                    {
                        title: "OOP Quiz", type: "quiz", order: 3,
                        questions: [
                            { question: "How do you make a variable private in a Dart class?", options: ["Use the 'private' keyword", "Use the '@private' decorator", "Start the variable name with an underscore (_)", "Dart has no private variables"], correctAnswer: 2 },
                            { question: "What is Person.newborn(this.name) an example of?", options: ["A static method", "A named constructor", "A factory constructor", "A mixin"], correctAnswer: 1 },
                            { question: "What keyword lets you share behavior across classes without inheritance?", options: ["mixin", "shares", "interface", "factory"], correctAnswer: 0 },
                            { question: "What happens if a class 'implements' another class?", options: ["It inherits its code", "It must provide its own code for ALL methods of that class", "It becomes a mixin", "It crashes compiler"], correctAnswer: 1 }
                        ]
                    }
                ]
            },
            {
                title: "Mini Projects — OOP", order: 2,
                nodes: [
                    {
                        title: "Project: Smart Home Simulator", type: "lesson", order: 1,
                        content: `## Project: Smart Home OOP Simulator\n\n\`\`\`dart\n// Abstract base class\nabstract class Device {\n  String name;\n  bool isOn = false;\n  Device(this.name);\n  \n  void turnOn() { isOn = true; print('\$name is ON'); }\n  void turnOff() { isOn = false; print('\$name is OFF'); }\n}\n\n// Mixin\nmixin InternetCapable {\n  bool isConnected = false;\n  void connectToWifi() {\n    isConnected = true;\n    print('Wi-Fi Connected 📶');\n  }\n}\n\nclass SmartLight extends Device {\n  int brightness = 50;\n  SmartLight(String name) : super(name);\n  \n  void setBrightness(int level) {\n    brightness = level;\n    print('\$name brightness set to \$level%');\n  }\n}\n\nclass SmartTV extends Device with InternetCapable {\n  SmartTV(String name) : super(name);\n  \n  void playNetflix() {\n    if (isOn && isConnected) print('Playing Stranger Things 📺');\n    else print('Must be ON and CONNECTED to play!');\n  }\n}\n\nvoid main() {\n  var light = SmartLight('Living Room Light');\n  light.turnOn();\n  light.setBrightness(80);\n  \n  var tv = SmartTV('Bedroom TV');\n  tv.turnOn();\n  tv.playNetflix(); // Fails, no Wi-Fi\n  tv.connectToWifi();\n  tv.playNetflix(); // Works!\n}\n\`\`\``
                    }
                ]
            }
        ]
    },

    {
        title: "Software Engineering & Dart Principles", order: 9,
        chapters: [
            {
                title: "Factory Constructors and Patterns", order: 1,
                nodes: [
                    {
                        title: "Factory Constructors", type: "lesson", order: 1,
                        content: `## The Factory Keyword (Singleton Pattern)\n\nDart has a unique constructor type called a **factory**. It is used when you *don't* always want to create a brand new object (e.g. returning an existing database connection, or returning a subclass based on input).\n\n\`\`\`dart\nclass Database {\n  String url;\n  \n  // Private internal constructor\n  Database._internal(this.url);\n  \n  // Static variable holding the ONLY instance\n  static final Database _instance = Database._internal('localhost:5432');\n  \n  // The factory returns the exact same instance every time!\n  factory Database() {\n    return _instance;\n  }\n}\n\nvoid main() {\n  var db1 = Database();\n  var db2 = Database();\n  \n  print(identical(db1, db2)); // TRUE! They are the exact same object in memory.\n}\n\`\`\``
                    },
                    {
                        title: "Parsing JSON to Objects", type: "lesson", order: 2,
                        content: `## Data Modeling (JSON to Dart Classes)\n\nIn real apps, you never leave data as \`Map<String, dynamic>\` because you lose auto-complete and type safety! You always convert Maps into Classes using a \`fromJson\` factory.\n\n\`\`\`dart\nimport 'dart:convert';\n\nclass User {\n  final String username;\n  final int xp;\n  \n  User({required this.username, required this.xp});\n  \n  // Factory to convert JSON Map into a User object\n  factory User.fromJson(Map<String, dynamic> json) {\n    return User(\n      username: json['username'] as String,\n      xp: json['xp'] as int,\n    );\n  }\n  \n  void display() => print('\$username | Level: \${xp ~/ 100}');\n}\n\nvoid main() {\n  String apiResponse = '{"username": "FlutterDev", "xp": 450}';\n  \n  // 1. Decode JSON string to Map\n  Map<String, dynamic> map = jsonDecode(apiResponse);\n  \n  // 2. Convert Map to User object\n  User myUser = User.fromJson(map);\n  \n  // 3. Now we have type safety and methods!\n  myUser.display();\n}\n\`\`\``
                    }
                ]
            }
        ]
    }
];
