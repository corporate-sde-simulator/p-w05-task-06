# PLATFORM-2924: Refactor alert rule evaluation engine

**Status:** In Progress · **Priority:** Medium
**Sprint:** Sprint 27 · **Story Points:** 5
**Reporter:** Suresh Kumar (Observability Lead) · **Assignee:** You (Intern)
**Due:** End of sprint (Friday)
**Labels:** `backend`, `typescript`, `observability`, `alerting`
**Task Type:** Code Maintenance

---

## Description

The alert rule evaluation engine works correctly but has code quality issues flagged in the last review. The code uses magic numbers, has no input validation, and a critical method is too long. Refactor without changing behavior.

Quality issues are marked with `// TODO (code review):` comments.

## Acceptance Criteria

- [ ] All magic numbers replaced with named constants
- [ ] Input validation added for rule configuration
- [ ] `evaluate()` method broken into smaller helper functions
- [ ] Dead code removed
- [ ] No regressions — all unit tests must still pass
