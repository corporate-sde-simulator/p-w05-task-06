# PR Review - Alert rule evaluation engine (by Ananya)

## Reviewer: Nisha Gupta
---

**Overall:** Good foundation but critical bugs need fixing before merge.

### `alertEngine.ts`

> **Bug #1:** Threshold comparison for greater_than rule uses less-than instead of greater-than
> This is the higher priority fix. Check the logic carefully and compare against the design doc.

### `ruleEvaluator.ts`

> **Bug #2:** Alert cooldown period check allows re-firing immediately because timestamp comparison is wrong
> This is more subtle but will cause issues in production. Make sure to add a test case for this.

---

**Ananya**
> Acknowledged. I have documented the issues for whoever picks this up.
