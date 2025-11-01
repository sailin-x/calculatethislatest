import { calculatorRegistry } from '../../data/calculatorRegistry';
import { reverseMortgageCalculator } from './reverseMortgageCalculator';

export function registerreverseMortgageCalculator(): void {
  calculatorRegistry.register(new reverseMortgageCalculator());
}
