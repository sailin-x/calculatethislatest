import { calculatorRegistry } from '../../data/calculatorRegistry';
import { SepIRACalculatorCalculator } from './SepIRACalculatorCalculator';

export function registerSepIRACalculatorCalculator(): void {
  calculatorRegistry.register(new SepIRACalculatorCalculator());
}
