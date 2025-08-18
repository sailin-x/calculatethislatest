import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { GrossRentMultiplierCalculator } from './GrossRentMultiplierCalculator';

export function registerGrossRentMultiplierCalculator(registry: CalculatorRegistry): void {
  registry.register(GrossRentMultiplierCalculator);
}

export { GrossRentMultiplierCalculator };
