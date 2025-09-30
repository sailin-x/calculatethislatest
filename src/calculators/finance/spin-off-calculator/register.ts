import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SpinOffCalculator } from './SpinOffCalculator';

export function registerSpinOffCalculator(): void {
  calculatorRegistry.register(SpinOffCalculator);
}

export { SpinOffCalculator };
