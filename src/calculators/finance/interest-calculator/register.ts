import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InterestCalculator } from './InterestCalculator';

export function registerInterestCalculator(): void {
  calculatorRegistry.register(InterestCalculator);
}

export { InterestCalculator };
