import { calculatorRegistry } from '../../data/calculatorRegistry';
import { saas_metricsCalculatorCalculator } from './saas_metricsCalculatorCalculator';

export function registersaas_metricsCalculatorCalculator(): void {
  calculatorRegistry.register(new saas_metricsCalculatorCalculator());
}
