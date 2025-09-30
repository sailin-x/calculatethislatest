import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AnalyticsCostCalculator } from './AnalyticsCostCalculator';

export function registerAnalyticsCostCalculator(): void {
  calculatorRegistry.register(AnalyticsCostCalculator);
}

export { AnalyticsCostCalculator };
