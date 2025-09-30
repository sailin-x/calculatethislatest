import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RevenueCalculator } from './RevenueCalculator';

export function registerRevenueCalculator(): void {
  calculatorRegistry.register(RevenueCalculator);
}

export { RevenueCalculator };
