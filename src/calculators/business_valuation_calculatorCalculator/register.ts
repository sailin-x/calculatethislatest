import { calculatorRegistry } from '../../data/calculatorRegistry';
import { business_valuation_calculatorCalculatorCalculator } from './business_valuation_calculatorCalculatorCalculator';

export function registerbusiness_valuation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new business_valuation_calculatorCalculatorCalculator());
}
