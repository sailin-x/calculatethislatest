import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rental_yield_calculatorCalculatorCalculator } from './rental_yield_calculatorCalculatorCalculator';

export function registerrental_yield_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new rental_yield_calculatorCalculatorCalculator());
}
