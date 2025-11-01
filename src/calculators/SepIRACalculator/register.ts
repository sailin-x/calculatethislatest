import { calculatorRegistry } from '../../data/calculatorRegistry';
import { SepIRACalculator } from './SepIRACalculator';

export function registerSepIRACalculator(): void {
  calculatorRegistry.register(new SepIRACalculator());
}
