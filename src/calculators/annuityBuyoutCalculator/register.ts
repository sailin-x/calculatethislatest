import { calculatorRegistry } from '../../data/calculatorRegistry';
import { annuityBuyoutCalculatorCalculator } from './annuityBuyoutCalculatorCalculator';

export function registerannuityBuyoutCalculatorCalculator(): void {
  calculatorRegistry.register(new annuityBuyoutCalculatorCalculator());
}
