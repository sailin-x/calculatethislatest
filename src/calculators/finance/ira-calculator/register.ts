import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { iraCalculator } from './IRACalculator';

export function registerIRACalculator(): void {
  calculatorRegistry.register(iraCalculator);
}