import { calculatorRegistry } from '../../data/calculatorRegistry';
import { SimpleIRACalculator } from './SimpleIRACalculator';

export function registerSimpleIRACalculator(): void {
  calculatorRegistry.register(new SimpleIRACalculator());
}
