import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InterestRateSwapCalculator } from './InterestRateSwapCalculator';

export function registerInterestRateSwapCalculator(): void {
  calculatorRegistry.register(InterestRateSwapCalculator);
}

export { InterestRateSwapCalculator };
