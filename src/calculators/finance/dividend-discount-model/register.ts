import { DividendDiscountModelCalculator } from './DividendDiscountModelCalculator';
import { calculatorRegistry } from '../../../data/calculatorRegistry';

export function registerDividendDiscountModelCalculator(): void {
  calculatorRegistry.register(DividendDiscountModelCalculator);
}