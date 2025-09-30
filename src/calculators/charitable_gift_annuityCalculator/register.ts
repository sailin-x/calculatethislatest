import { calculatorRegistry } from '../../data/calculatorRegistry';
import { charitable_gift_annuityCalculatorCalculator } from './charitable_gift_annuityCalculatorCalculator';

export function registercharitable_gift_annuityCalculatorCalculator(): void {
  calculatorRegistry.register(new charitable_gift_annuityCalculatorCalculator());
}
