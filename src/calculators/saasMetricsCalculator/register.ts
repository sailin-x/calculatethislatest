import { calculatorRegistry } from '../../data/calculatorRegistry';
import { saasMetricsCalculator } from './saasMetricsCalculator';

export function registersaasMetricsCalculator(): void {
  calculatorRegistry.register(new saasMetricsCalculator());
}
