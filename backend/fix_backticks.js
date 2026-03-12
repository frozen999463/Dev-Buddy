const fs = require('fs');
const path = require('path');

const files = [
    'src/data/python_masterclass_a.ts',
    'src/data/python_masterclass_a2.ts',
    'src/data/python_masterclass_b.ts',
    'src/data/python_masterclass_b2.ts',
    'src/data/c_masterclass_a.ts',
    'src/data/c_masterclass_a2.ts',
    'src/data/c_masterclass_b.ts',
    'src/data/c_masterclass_b2.ts',
    'src/data/dart_masterclass_a.ts',
    'src/data/dart_masterclass_a2.ts',
    'src/data/dart_masterclass_b.ts',
    'src/data/dart_masterclass_b2.ts'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.log("Skipping missing file:", file);
        return;
    }

    let text = fs.readFileSync(filePath, 'utf8');

    // Robust replacement using a regex that matches from 'content: `' to a closing '`' followed by '}' or ','
    // We use a non-greedy match (.*?) across multiple lines.
    // The [^]* pattern matches any character including newlines.
    text = text.replace(/content:\s*`([^]*?)`(\r?\n\s*[}\]])/g, (match, inner, suffix) => {
        // Now clean the inner content
        let cleaned = inner
            .replace(/\\`/g, '`')           // Unescape all backticks first
            .replace(/\\\$\{/g, '${')      // Unescape all ${ first
            .replace(/`/g, '\\`')           // Escape all backticks
            .replace(/\$\{/g, '\\${');     // Escape all ${

        return `content: \`${cleaned}\`${suffix}`;
    });

    fs.writeFileSync(filePath, text, 'utf8');
    console.log("Successfully processed", file);
});

console.log("Refining Course definitions...");
const dartCoursePath = 'src/data/dart_masterclass_course.ts';
if (fs.existsSync(dartCoursePath)) {
    let dartText = fs.readFileSync(dartCoursePath, 'utf8');
    if (!dartText.includes('slug:')) {
        dartText = dartText.replace('title: "Dart Programming Masterclass",', 'title: "Dart & Flutter Foundations Masterclass",\n        slug: "dart-masterclass",');
        dartText = dartText.replace('level: "Beginner to Advanced",', 'status: "published"');
        fs.writeFileSync(dartCoursePath, dartText, 'utf8');
        console.log("Patched dart_masterclass_course.ts metadata.");
    }
}
