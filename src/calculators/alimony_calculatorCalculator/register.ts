import { calculatorRegistry } from '../../data/calculatorRegistry';
import { alimony_calculatorCalculatorCalculator } from './alimony_calculatorCalculatorCalculator';

export function registeralimony_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new alimony_calculatorCalculatorCalculator());
}
