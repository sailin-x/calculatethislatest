import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PricePerSquareFootCalculator } from './PricePerSquareFootCalculator';

export function registerPricePerSquareFootCalculator(): void {
  calculatorRegistry.register(PricePerSquareFootCalculator);
}