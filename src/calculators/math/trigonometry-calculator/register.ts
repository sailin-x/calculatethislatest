import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TrigonometryCalculator } from './TrigonometryCalculator';

export function registerTrigonometryCalculator(): void {
  calculatorRegistry.register(TrigonometryCalculator);
}

export { TrigonometryCalculator };
