import { calculatorRegistry } from '../../data/calculatorRegistry';
import { estate_tax_liability_calculatorCalculatorCalculator } from './estate_tax_liability_calculatorCalculatorCalculator';

export function registerestate_tax_liability_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new estate_tax_liability_calculatorCalculatorCalculator());
}
