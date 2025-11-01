import { calculatorRegistry } from '../../data/calculatorRegistry';
import { charitable_gift_annuityCalculator } from './charitable_gift_annuityCalculator';

export function registercharitable_gift_annuityCalculator(): void {
  calculatorRegistry.register(new charitable_gift_annuityCalculator());
}
