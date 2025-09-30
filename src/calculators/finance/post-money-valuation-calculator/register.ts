import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PostMoneyValuationCalculator } from './PostMoneyValuationCalculator';

export function registerPostMoneyValuationCalculator(): void {
  calculatorRegistry.register(PostMoneyValuationCalculator);
}

export { PostMoneyValuationCalculator };
