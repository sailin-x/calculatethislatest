import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hsaTripleTaxAdvantageCalculatorCalculator } from './hsaTripleTaxAdvantageCalculatorCalculator';

export function registerhsaTripleTaxAdvantageCalculatorCalculator(): void {
  calculatorRegistry.register(new hsaTripleTaxAdvantageCalculatorCalculator());
}
