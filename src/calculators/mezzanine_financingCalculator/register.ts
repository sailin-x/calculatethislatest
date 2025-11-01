import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mezzanine_financingCalculator } from './mezzanine_financingCalculator';

export function registermezzanine_financingCalculator(): void {
  calculatorRegistry.register(new mezzanine_financingCalculator());
}
