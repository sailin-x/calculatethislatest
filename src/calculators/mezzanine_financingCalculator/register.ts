import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mezzanine_financingCalculatorCalculator } from './mezzanine_financingCalculatorCalculator';

export function registermezzanine_financingCalculatorCalculator(): void {
  calculatorRegistry.register(new mezzanine_financingCalculatorCalculator());
}
