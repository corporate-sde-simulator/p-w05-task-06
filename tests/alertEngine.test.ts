import { AlertEngine } from "../src/alertEngine";
import { RuleEvaluator } from "../src/ruleEvaluator";

describe("Alert rule evaluation engine", () => {
    test("should process valid input", () => {
        const obj = new AlertEngine();
        expect(obj.process({ key: "val" })).not.toBeNull();
    });
    test("should handle null", () => {
        const obj = new AlertEngine();
        expect(obj.process(null)).toBeNull();
    });
    test("should track stats", () => {
        const obj = new AlertEngine();
        obj.process({ x: 1 });
        expect(obj.getStats().processed).toBe(1);
    });
    test("support should work", () => {
        const obj = new RuleEvaluator();
        expect(obj.process({ data: "test" })).not.toBeNull();
    });
});
