# Learning Guide - TypeScript

> **Welcome to Product-Track Week 5, Task 6!**
> This is a **learning task**. This guide teaches you the TypeScript concepts you need and tells you exactly where to look and what to fix. Take your time and read carefully.

---

## What You Need To Do (Summary)

1. **Read** `TICKET.md` to understand the task
2. **Read** this guide to learn the TypeScript syntax you'll need
3. **Find the bugs** in the `src/` files (look for `// BUG:` or `# BUG:` comments)
4. **Fix the bugs** using what you learned
5. **Run the tests** to verify your fix: `npx jest tests/ --verbose`
6. **Add new tests** in the `tests/` folder to prove your fix works

---

## TypeScript Quick Reference

TypeScript is JavaScript with **types** added. If you know JavaScript, you know 90% of TypeScript.

### Variables and Types
```typescript
const name: string = "Alice";        // string type
let count: number = 42;              // number type
const items: number[] = [1, 2, 3];   // array of numbers
const isActive: boolean = true;      // boolean type

// TypeScript can also infer types (you don't always need to write them):
const name = "Alice";                // TS knows this is a string
```

### Interfaces (Define the shape of an object)
```typescript
interface User {
    name: string;
    age: number;
    email?: string;     // ? means optional
}

const user: User = { name: "Alice", age: 25 };
```

### Functions
```typescript
function greet(name: string, greeting: string = "Hello"): string {
    return ${greeting}, !;
}

// Arrow function with types:
const add = (a: number, b: number): number => a + b;
```

### Classes
```typescript
class Calculator {
    private history: number[] = [];     // private = only accessible inside class

    add(a: number, b: number): number {
        const result = a + b;
        this.history.push(result);
        return result;
    }

    getHistory(): number[] {
        return [...this.history];
    }
}

// Using it:
const calc = new Calculator();
calc.add(2, 3);

// Exporting:
export { Calculator };

// Importing:
import { Calculator } from './Calculator';
```

### Common Types
```typescript
// Record (typed dictionary)
const config: Record<string, any> = { key: "value" };

// Union types (can be one of several types)
let status: "active" | "inactive" | "pending" = "active";

// any (disables type checking - avoid when possible)
let data: any = "could be anything";

// null checks
function process(input: string | null): string {
    if (!input) return "empty";
    return input.toUpperCase();
}
```

### Error Handling
```typescript
try {
    const result = riskyOperation();
} catch (error) {
    console.error(Error: );
}
```

### How to Run Tests
```bash
# From the task folder:
npx jest tests/ --verbose

# Or:
npm test
```

### How to Add a Test
```typescript
test('should do something specific', () => {
    const obj = new MyClass();
    const result = obj.process({ key: 'value' });
    expect(result).not.toBeNull();
    expect(result?.success).toBe(true);
});
```

---

## Project Structure

| File | Purpose |
|------|---------|
| `TICKET.md` | Your task assignment - **read this first!** |
| `src/alertEngine.ts` | Main source code - **has bugs to fix** |
| `src/ruleEvaluator.ts` | Supporting code - **may also have bugs** |
| `tests/alertEngine.test.ts` | Test file - **add your tests here** |
| `docs/DESIGN.md` | Architecture decisions (background reading) |
| `docs/GUIDE.md` | This learning guide |
| `.context/` | Meeting notes and PR comments (background context) |

---

## Where to Look and What to Fix


---

## Step-by-Step Workflow

1. Open a terminal and navigate to this task folder
2. Read `TICKET.md` completely
3. Open `src/` files and find the `BUG:` comments
4. Fix each bug (the comment tells you what's wrong)
5. Run the tests:
   ```bash
   npx jest tests/ --verbose
   ```
6. If tests pass, you're done with the fix
7. **Bonus:** Add a new test to `tests/` that specifically tests the bug you fixed

---

## Common Mistakes to Avoid

- Don't change the function signatures (method names, parameters) - only fix the logic inside
- Don't delete the `BUG:` comments - they help reviewers understand what you changed
- Make sure all existing tests still pass after your changes
- If you're stuck, re-read the `TICKET.md` requirements section carefully
