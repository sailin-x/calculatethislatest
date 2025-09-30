import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hedge_fund_fee_calculatorCalculatorCalculator } from './hedge_fund_fee_calculatorCalculatorCalculator';

export function registerhedge_fund_fee_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new hedge_fund_fee_calculatorCalculatorCalculator());
}
