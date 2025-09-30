import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EverydayCalculator } from './EverydayCalculator';

export function registerEverydayCalculator(): void {
  calculatorRegistry.register(EverydayCalculator);
}

export { EverydayCalculator };
