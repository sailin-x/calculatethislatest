import { calculatorRegistry } from '../../data/calculatorRegistry';
import { price_to_book_calculatorCalculatorCalculator } from './price_to_book_calculatorCalculatorCalculator';

export function registerprice_to_book_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new price_to_book_calculatorCalculatorCalculator());
}
