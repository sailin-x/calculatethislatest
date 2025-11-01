import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { saasMetricsCalculator } from './SaaSMetricsCalculator';

export function registerSaaSMetricsCalculator() {
  calculatorRegistry.register(SaaSMetricsCalculator);
}
