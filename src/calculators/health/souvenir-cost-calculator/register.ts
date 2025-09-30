import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SouvenirCostCalculator } from './SouvenirCostCalculator';

export function registerSouvenirCostCalculator(): void {
  calculatorRegistry.register(SouvenirCostCalculator);
}

export { SouvenirCostCalculator };
