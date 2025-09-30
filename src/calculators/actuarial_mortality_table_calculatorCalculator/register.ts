import { calculatorRegistry } from '../../data/calculatorRegistry';
import { actuarial_mortality_table_calculatorCalculatorCalculator } from './actuarial_mortality_table_calculatorCalculatorCalculator';

export function registeractuarial_mortality_table_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new actuarial_mortality_table_calculatorCalculatorCalculator());
}
