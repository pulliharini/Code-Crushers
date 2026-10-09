const questionsDB = [
    // Variables
    {
        id: 'v1',
        topic: 'Variables',
        text: 'What will be the output of `let x = 5; x = x + 2; console.log(x);`?',
        options: ['5', '7', 'x2', 'Error'],
        correctAnswer: 1,
        explanation: 'Variables declared with `let` can be reassigned. The initial value is 5, and 2 is added to it, making it 7.'
    },
    {
        id: 'v2',
        topic: 'Variables',
        text: 'Which keyword is used to declare a constant variable that cannot be reassigned?',
        options: ['let', 'var', 'const', 'static'],
        correctAnswer: 2,
        explanation: 'The `const` keyword declares a constant whose value cannot be reassigned after initialization.'
    },
    // Conditions
    {
        id: 'c1',
        topic: 'Conditions',
        text: 'If `score = 85`, what will `score > 90 ? "A" : "B"` evaluate to?',
        options: ['A', 'B', 'True', 'False'],
        correctAnswer: 1,
        explanation: 'The condition 85 > 90 is false, so the ternary operator returns the second value, "B".'
    },
    {
        id: 'c2',
        topic: 'Conditions',
        text: 'Which operator is used to check if two values are equal in both value and type?',
        options: ['=', '==', '===', '!='],
        correctAnswer: 2,
        explanation: 'The strict equality operator `===` checks both value and type without performing type conversion.'
    },
    // Loops
    {
        id: 'l1',
        topic: 'Loops',
        text: 'How many times will this loop run? `for(let i=0; i<3; i++) {}`',
        options: ['0', '2', '3', '4'],
        correctAnswer: 2,
        explanation: 'The loop starts at 0 and runs for i=0, i=1, and i=2. That is 3 times total.'
    },
    {
        id: 'l2',
        topic: 'Loops',
        text: 'Which loop is guaranteed to execute at least once, even if the condition is false initially?',
        options: ['for loop', 'while loop', 'do-while loop', 'for-each loop'],
        correctAnswer: 2,
        explanation: 'A `do-while` loop executes its block of code once before checking the condition.'
    },
    // Arrays
    {
        id: 'a1',
        topic: 'Arrays',
        text: 'Given `let arr = [10, 20, 30]`, how do you access the value 20?',
        options: ['arr[0]', 'arr[1]', 'arr[2]', 'arr.20'],
        correctAnswer: 1,
        explanation: 'Arrays are zero-indexed. The first item is at index 0, so the second item (20) is at index 1.'
    },
    {
        id: 'a2',
        topic: 'Arrays',
        text: 'Which method adds one or more elements to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        explanation: 'The `push()` method appends elements to the end of an array.'
    }
];

const learningModules = {
    'Variables': {
        explanation: 'Think of a variable as a labeled box where you can store data. You can put something in the box, look inside it later, or swap its contents for something else.',
        example: 'let score = 0;\nscore = score + 10; // score is now 10',
        hint: 'Use `let` when the value might change, and `const` when it will never change.',
        practice: {
            text: 'We want to store a player\'s name that will never change. What should we use?',
            options: ['const name = "Alice";', 'let name = "Alice";', 'var name = "Alice";', 'name = "Alice";'],
            correctAnswer: 0,
            explanation: 'Because the name will never change, `const` is the correct choice.'
        }
    },
    'Conditions': {
        explanation: 'Conditions are like crossroads. They allow your program to make decisions and run different code based on whether a statement is true or false.',
        example: 'if (health <= 0) {\n  console.log("Game Over");\n} else {\n  console.log("Keep playing!");\n}',
        hint: '`===` checks if things are exactly the same. `!==` checks if they are different.',
        practice: {
            text: 'Which statement correctly checks if `age` is exactly 18?',
            options: ['if (age = 18)', 'if (age == 18)', 'if (age === 18)', 'if (age > 18)'],
            correctAnswer: 2,
            explanation: 'The `===` operator strictly checks both the value and the type.'
        }
    },
    'Loops': {
        explanation: 'Loops let you repeat a block of code multiple times without having to copy and paste it over and over. They are great for tasks like counting or going through lists.',
        example: 'for (let i = 0; i < 5; i++) {\n  console.log("Hello! Number " + i);\n}',
        hint: 'A `for` loop has 3 parts: start condition, stop condition, and step (like i++).',
        practice: {
            text: 'What is missing in this loop? `for(let i=0; i<10; ____) { }` to make it count up by 1?',
            options: ['i--', 'i+1', 'i++', 'next i'],
            correctAnswer: 2,
            explanation: '`i++` is the standard way to increment `i` by 1 after each loop iteration.'
        }
    },
    'Arrays': {
        explanation: 'An array is a special variable that can hold more than one value at a time. It\'s like a numbered list. Remember, counting starts at 0, not 1!',
        example: 'let colors = ["red", "green", "blue"];\nconsole.log(colors[0]); // Output: "red"',
        hint: 'The first item is always at index [0]. The last item is at index [array.length - 1].',
        practice: {
            text: 'If `let fruits = ["apple", "banana", "cherry"]`, what is `fruits[2]`?',
            options: ['apple', 'banana', 'cherry', 'undefined'],
            correctAnswer: 2,
            explanation: 'Index 0 is apple, index 1 is banana, and index 2 is cherry.'
        }
    }
};

const retestDB = [
    {
        id: 'r_v1',
        topic: 'Variables',
        text: 'What happens when you run `const pi = 3.14; pi = 3;`?',
        options: ['pi becomes 3', 'pi remains 3.14', 'An error occurs', 'pi becomes undefined'],
        correctAnswer: 2,
        explanation: 'Constants (`const`) cannot be reassigned. Attempting to do so throws an error.'
    },
    {
        id: 'r_c1',
        topic: 'Conditions',
        text: 'What does `if(false)` do?',
        options: ['Runs the code block', 'Skips the code block', 'Throws an error', 'Makes it true'],
        correctAnswer: 1,
        explanation: 'The code block inside an `if` statement only runs if the condition evaluates to true.'
    },
    {
        id: 'r_l1',
        topic: 'Loops',
        text: 'Which loop runs as long as a condition is true?',
        options: ['for', 'while', 'if', 'switch'],
        correctAnswer: 1,
        explanation: 'A `while` loop continues to execute its block as long as its specified condition remains true.'
    },
    {
        id: 'r_a1',
        topic: 'Arrays',
        text: 'How do you remove the LAST element from an array?',
        options: ['shift()', 'pop()', 'delete', 'remove()'],
        correctAnswer: 1,
        explanation: 'The `pop()` method removes the last element from an array.'
    }
];
