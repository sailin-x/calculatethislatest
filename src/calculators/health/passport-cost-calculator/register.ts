import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PassportCostCalculator } from './PassportCostCalculator';

export function registerPassportCostCalculator(): void {
  calculatorRegistry.register(PassportCostCalculator);
}

export { PassportCostCalculator };
