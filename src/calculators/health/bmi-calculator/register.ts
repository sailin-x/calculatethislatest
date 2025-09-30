import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BmiCalculator } from './BmiCalculator';

export function registerBmiCalculator(): void {
  calculatorRegistry.register(BmiCalculator);
}

export { BmiCalculator };
