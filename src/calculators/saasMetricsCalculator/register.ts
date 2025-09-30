import { calculatorRegistry } from '../../data/calculatorRegistry';
import { saasMetricsCalculatorCalculator } from './saasMetricsCalculatorCalculator';

export function registersaasMetricsCalculatorCalculator(): void {
  calculatorRegistry.register(new saasMetricsCalculatorCalculator());
}
