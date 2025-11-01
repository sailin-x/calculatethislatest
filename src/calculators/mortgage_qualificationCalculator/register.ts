import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_qualificationCalculator } from './mortgage_qualificationCalculator';

export function registermortgage_qualificationCalculator(): void {
  calculatorRegistry.register(new mortgage_qualificationCalculator());
}
