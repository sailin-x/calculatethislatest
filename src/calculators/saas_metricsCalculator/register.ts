import { calculatorRegistry } from '../../data/calculatorRegistry';
import { saas_metricsCalculator } from './saas_metricsCalculator';

export function registersaas_metricsCalculator(): void {
  calculatorRegistry.register(new saas_metricsCalculator());
}
