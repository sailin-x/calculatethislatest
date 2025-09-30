import { calculatorRegistry } from '../../data/calculatorRegistry';
import { term_life_insuranceCalculatorCalculator } from './term_life_insuranceCalculatorCalculator';

export function registerterm_life_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new term_life_insuranceCalculatorCalculator());
}
