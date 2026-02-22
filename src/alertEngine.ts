/**
 * Alert Engine — evaluates metric values against configured alert rules.
 *
 * Supports threshold, rate-of-change, and anomaly detection alert types.
 *
 * Author: Kavitha Rajan (Observability team)
 * Last Modified: 2026-03-05
 */

interface AlertRule {
  name: string;
  metricName: string;
  condition: 'above' | 'below' | 'equals' | 'rate_change';
  threshold: number;
  windowSeconds: number;
  severity: 'info' | 'warning' | 'critical' | 'fatal';
  cooldownSeconds: number;
}

interface AlertEvent {
  ruleName: string;
  metricName: string;
  currentValue: number;
  threshold: number;
  severity: string;
  triggeredAt: Date;
  message: string;
}

class AlertEngine {
  private rules: AlertRule[] = [];
  private activeAlerts: Map<string, AlertEvent> = new Map();
  private alertHistory: AlertEvent[] = [];
  private lastTriggered: Map<string, number> = new Map();

  addRule(rule: AlertRule): void {
    this.rules.push(rule);
  }

  removeRule(name: string): void {
    this.rules = this.rules.filter(r => r.name !== name);
    this.activeAlerts.delete(name);
  }

  // TODO (code review): This method is 60+ lines. Break into smaller helpers:
  // one for threshold check, one for cooldown check, one for alert creation.
  evaluate(metricName: string, currentValue: number, timestamp: number): AlertEvent[] {
    const triggered: AlertEvent[] = [];

    for (const rule of this.rules) {
      if (rule.metricName !== metricName) continue;

      // TODO (code review): Magic number 1000 — what unit is this?
      // Replace with a named constant like MS_PER_SECOND
      const lastTime = this.lastTriggered.get(rule.name) || 0;
      if (timestamp - lastTime < rule.cooldownSeconds * 1000) continue;

      let shouldFire = false;

      if (rule.condition === 'above') {
        shouldFire = currentValue > rule.threshold;
      } else if (rule.condition === 'below') {
        shouldFire = currentValue < rule.threshold;
      } else if (rule.condition === 'equals') {
        // TODO (code review): Floating point equality check — use epsilon comparison
        // e.g., Math.abs(currentValue - rule.threshold) < 0.001
        shouldFire = currentValue === rule.threshold;
      } else if (rule.condition === 'rate_change') {
        // TODO (code review): Magic number 100 — this is a percentage calculation
        // Extract to a named constant PERCENTAGE_MULTIPLIER = 100
        const percentChange = ((currentValue - rule.threshold) / rule.threshold) * 100;
        shouldFire = Math.abs(percentChange) > 10; // TODO (code review): magic number 10 — extract to RATE_CHANGE_THRESHOLD_PERCENT
      }

      if (shouldFire) {
        const alert: AlertEvent = {
          ruleName: rule.name,
          metricName: metricName,
          currentValue: currentValue,
          threshold: rule.threshold,
          severity: rule.severity,
          triggeredAt: new Date(timestamp),
          message: Alert:  —  is  (threshold: ),
        };

        this.activeAlerts.set(rule.name, alert);
        this.alertHistory.push(alert);
        this.lastTriggered.set(rule.name, timestamp);
        triggered.push(alert);
      } else {
        // Auto-resolve
        if (this.activeAlerts.has(rule.name)) {
          this.activeAlerts.delete(rule.name);
        }
      }
    }

    return triggered;
  }

  getActiveAlerts(): AlertEvent[] {
    return Array.from(this.activeAlerts.values());
  }

  getAlertHistory(): AlertEvent[] {
    return [...this.alertHistory];
  }

  // TODO (code review): This dead code is unreachable — the severity priorities
  // are never used anywhere. Either implement priority-based sorting or remove.
  private getSeverityPriority(severity: string): number {
    const priorities: Record<string, number> = { info: 1, warning: 2, critical: 3, fatal: 4 };
    return priorities[severity] || 0;
  }
}

export { AlertEngine, AlertRule, AlertEvent };
