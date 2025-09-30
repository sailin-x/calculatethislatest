import { calculatorRegistry } from '../../data/calculatorRegistry';
import { annuity_buyout_calculatorCalculatorCalculator } from './annuity_buyout_calculatorCalculatorCalculator';

export function registerannuity_buyout_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new annuity_buyout_calculatorCalculatorCalculator());
}
