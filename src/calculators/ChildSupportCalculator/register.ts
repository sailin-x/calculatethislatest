import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ChildSupportCalculator } from './ChildSupportCalculator';

export function registerChildSupportCalculator(): void {
  calculatorRegistry.register(new ChildSupportCalculator());
}
