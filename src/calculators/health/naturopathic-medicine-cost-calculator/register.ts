import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NaturopathicMedicineCostCalculator } from './NaturopathicMedicineCostCalculator';

export function registerNaturopathicMedicineCostCalculator(): void {
  calculatorRegistry.register(NaturopathicMedicineCostCalculator);
}

export { NaturopathicMedicineCostCalculator };
