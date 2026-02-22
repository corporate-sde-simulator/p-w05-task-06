/**
 * Rule Evaluator — parses and validates alert rule definitions from config.
 *
 * Author: Kavitha Rajan (Observability team)
 * Last Modified: 2026-03-05
 */

interface RuleConfig {
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  window: number;
  severity: string;
  cooldown?: number;
}

class RuleEvaluator {
  private validConditions = ['above', 'below', 'equals', 'rate_change'];
  private validSeverities = ['info', 'warning', 'critical', 'fatal'];

  parseConfig(config: RuleConfig): {
    valid: boolean;
    rule?: any;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!config.name || config.name.trim() === '') {
      errors.push('Rule name is required');
    }

    if (!config.metric || config.metric.trim() === '') {
      errors.push('Metric name is required');
    }

    if (!this.validConditions.includes(config.condition)) {
      errors.push(Invalid condition: . Must be one of: );
    }

    if (typeof config.threshold !== 'number' || isNaN(config.threshold)) {
      errors.push('Threshold must be a valid number');
    }

    if (typeof config.window !== 'number' || config.window <= 0) {
      errors.push('Window must be a positive number (seconds)');
    }

    if (!this.validSeverities.includes(config.severity)) {
      errors.push(Invalid severity: . Must be one of: );
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      rule: {
        name: config.name.trim(),
        metricName: config.metric.trim(),
        condition: config.condition,
        threshold: config.threshold,
        windowSeconds: config.window,
        severity: config.severity,
        cooldownSeconds: config.cooldown || 300,
      },
      errors: [],
    };
  }

  parseMultiple(configs: RuleConfig[]): {
    rules: any[];
    errors: Map<string, string[]>;
  } {
    const rules: any[] = [];
    const errors = new Map<string, string[]>();

    for (const config of configs) {
      const result = this.parseConfig(config);
      if (result.valid && result.rule) {
        rules.push(result.rule);
      } else {
        errors.set(config.name || 'unnamed', result.errors);
      }
    }

    return { rules, errors };
  }
}

export { RuleEvaluator, RuleConfig };
