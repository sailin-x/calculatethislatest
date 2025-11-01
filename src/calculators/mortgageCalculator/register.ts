import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgageCalculator } from './mortgageCalculator';

export function registermortgageCalculator(): void {
  calculatorRegistry.register(new mortgageCalculator());
}
