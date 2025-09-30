import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_qualificationCalculatorCalculator } from './mortgage_qualificationCalculatorCalculator';

export function registermortgage_qualificationCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_qualificationCalculatorCalculator());
}
