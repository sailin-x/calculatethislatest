import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EconomicValueAddedCalculator } from './EconomicValueAddedCalculator';

export function registerEconomicValueAddedCalculator(): void {
  calculatorRegistry.register(EconomicValueAddedCalculator);
}