// Q1. Write a program to find all pairs of an integer array whose sum is equal to a given number?
const findPair = (targetValue, arrayInput = [] ) => {
  const pairs = [];
  for (let i = 0; i < arrayInput.length; i += 1) {
    for (let j = i + 1; j < arrayInput.length; j += 1) {
      if (arrayInput[i] + arrayInput[j] === targetValue) {
        pairs.push({
          num1: arrayInput[i],
          num2: arrayInput[j]
        });
      }
    }
  }
  console.log(pairs);
};

const input = [1, 4, 5, 7, 4, 6, 2, 10];
findPair(input, 10);

// Q2. Write a program to reverse an array in place? In place means you cannot create a new array. You have to update the original array.
const reverseArray = (arr = []) => {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start += 1;
    end -= 1;
  }
  return arr;
};
const array = [1, 5, 7, 2, 3, 10, 4];
console.log("Reverse of is ", reverseArray(array));

// Q3. Write a program to check if two strings are a rotation of each other?
const isSameAfterRotate = (str1 = "", str2 = "") => {
  if (str1.length !== str2.length) return false;
  let newStr2 = "";
  for (let i = str2.length - 1; i >= 0; i--) {
    newStr2 += str2[i];
  }
  return str1 === newStr2;
};
const str1 = "ABCDE";
const str2 = "EDCBA";
const str3 = "ABDCE";
console.log(str1, str2, "is same", isSameAfterRotate(str1, str2));
console.log(str1, str3, "is same", isSameAfterRotate(str1, str3));

// Q4. Write a program to print the first non-repeated character from a string?

const findFirstNotRepeatingChar = (str) => {
  const countObj = {};
  for (let i = 0; i < str.length; i++) {
    countObj[str[i]] ? countObj[str[i]]++ : (countObj[str[i]] = 1);
  }
  const singleEntry = Object.keys(countObj).find((key) => countObj[key] === 1);
  return singleEntry;
};
const str = "asdasdacdfshdfnsdfhsd";
console.log(
  "First non-repeated character from ",
  str,
  " is ",
  findFirstNotRepeatingChar(str)
);

// Q5. Read about the Tower of Hanoi algorithm. Write a program to implement it.

const towerOfHanoi = (disk, source, dest, aux) => {
  if (disk === 1)
    console.log("Move disk from source ", source, " to destination ", dest);
  else {
    towerOfHanoi(disk - 1, source, aux, dest);
    console.log("Move disk from source ", source, " to destination ", dest);
    towerOfHanoi(disk - 1, aux, dest, source);
  }
};
towerOfHanoi(4, "A", "B", "C");

// Basic Stack
function Stack() {
  this.items = [];

  // push function
  this.push = (element) => {
    // push element into the items
    this.items.push(element);
  };
  // pop function
  this.pop = () => {
    if (this.items.length > 0) return this.items.pop();
  };

  // peek function
  this.peek = () => {
    return this.items[this.items.length - 1];
  };

  // isEmpty function
  this.isEmpty = () => {
    return this.items.length === 0;
  };
}

function isOperator(x) {
  switch (x) {
    case "+":
    case "-":
    case "/":
    case "*":
      return true;
  }
  return false;
}

//   Q6. Read about infix, prefix, and postfix expressions. Write a program to convert postfix to prefix expression.
function postToPre(post_exp) {
  let stack = new Stack();
  let length = post_exp.length;
  for (let i = 0; i < length; i += 1) {
    if (isOperator(post_exp[i])) {
      let op1 = stack.pop();
      let op2 = stack.pop();
      let temp = post_exp[i] + op2 + op1;
      stack.push(temp);
    } else {
      stack.push(post_exp[i] + "");
    }
  }
  let ans = "";
  while (stack.items.length > 0) ans += stack.pop();
  return ans;
}

let post_exp = "abc/+xy*k-/";
console.log("Prefix : " + postToPre(post_exp));

//   Q7. Write a program to convert prefix expression to infix expression.
function convertPrefixToInfix(str) {
  let stack = new Stack();
  let length = str.length;
  for (let i = length - 1; i >= 0; i -= 1) {
    let c = str[i];
    if (isOperator(c)) {
      let op1 = stack.pop();
      let op2 = stack.pop();
      let temp = "(" + op1 + c + op2 + ")";
      stack.push(temp);
    } else {
      stack.push(c + "");
    }
  }
  return stack.pop();
}

let exp = "/-x*yz+/abc";
console.log("Infix : " + convertPrefixToInfix(exp));

//   Q8. Write a program to check if all the brackets are closed in a given code snippet.
function checkBrackets(expr) {
  let stack = new Stack();
  for (let i = 0; i < expr.length; i++) {
    let x = expr[i];

    if (x === "(" || x === "[" || x === "{") {
      stack.push(x);
      continue;
    }
    if (stack.isEmpty()) return false;

    let arg;
    switch (x) {
      case ")":
        arg = stack.pop();
        if (arg === "{" || arg === "[") return false;
        break;
      case "}":
        arg = stack.pop();
        if (arg === "(" || arg === "[") return false;
        break;
      case "]":
        arg = stack.pop();
        if (arg === "(" || arg === "{") return false;
        break;
    }
  }
  return stack.isEmpty();
}

let expr = "([{}])]}";

if (checkBrackets(expr)) console.log("Balanced ");
else console.log("Not Balanced ");

// Q9. Write a program to reverse a stack.
let stack = new Stack();

function insertAtBottom(x) {
  if (stack.isEmpty()) stack.push(x);
  else {
    let a = stack.pop();
    insertAtBottom(x);
    stack.push(a);
  }
}
function reverseStack() {
  if (stack.items.length > 0) {
    let x = stack.pop();
    reverseStack();
    insertAtBottom(x);
  }
}
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
stack.push(6);
stack.push(7);
stack.push(8);

console.log("Original Stack");

console.log(stack.items);

reverseStack();

console.log("Reversed Stack");

console.log(stack.items);

// Q10. Write a program to find the smallest number using a stack.

function getMinimum() {
  const stack2 = new Stack();
  stack2.push(1);
  stack2.push(10);
  stack2.push(5);
  stack2.push(3);
  stack2.push(2);
  stack2.push(9);
  let first = stack2.pop();

  for (i = 0; i < stack2.items.length; i++) {
    if (!stack2.isEmpty()) {
      if (stack2.items[i] < first) {
        first = stack2.items[i];
      }
    }
  }
  console.log("Minimum value is ", first);
}
getMinimum();
