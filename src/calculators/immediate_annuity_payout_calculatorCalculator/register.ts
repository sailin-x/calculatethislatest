import { calculatorRegistry } from '../../data/calculatorRegistry';
import { immediate_annuity_payout_calculatorCalculatorCalculator } from './immediate_annuity_payout_calculatorCalculatorCalculator';

export function registerimmediate_annuity_payout_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new immediate_annuity_payout_calculatorCalculatorCalculator());
}
