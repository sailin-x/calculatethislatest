import { calculatorRegistry } from '../../data/calculatorRegistry';
import { corporate_tax_shield_calculatorCalculatorCalculator } from './corporate_tax_shield_calculatorCalculatorCalculator';

export function registercorporate_tax_shield_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new corporate_tax_shield_calculatorCalculatorCalculator());
}
