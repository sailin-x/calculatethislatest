import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TotalReturnSwapCalculator } from './TotalReturnSwapCalculator';

export function registerTotalReturnSwapCalculator(): void {
  calculatorRegistry.register(TotalReturnSwapCalculator);
}

export { TotalReturnSwapCalculator };
