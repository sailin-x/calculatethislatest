import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { KidnapRansomCalculator } from './KidnapRansomCalculator';

export function registerKidnapRansomCalculator(): void {
  calculatorRegistry.register(KidnapRansomCalculator);
}

export { KidnapRansomCalculator };
