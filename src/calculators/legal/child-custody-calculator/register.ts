import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ChildCustodyCalculator } from './ChildCustodyCalculator';

export function registerChildCustodyCalculator(): void {
  calculatorRegistry.register(ChildCustodyCalculator);
}

export { ChildCustodyCalculator };
