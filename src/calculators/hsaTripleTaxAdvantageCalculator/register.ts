import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hsaTripleTaxAdvantageCalculator } from './hsaTripleTaxAdvantageCalculator';

export function registerhsaTripleTaxAdvantageCalculator(): void {
  calculatorRegistry.register(new hsaTripleTaxAdvantageCalculator());
}
