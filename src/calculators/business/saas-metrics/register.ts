import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SaaSMetricsCalculator } from './SaaSMetricsCalculator';

export function registerSaaSMetricsCalculator() {
  calculatorRegistry.register(SaaSMetricsCalculator);
}
