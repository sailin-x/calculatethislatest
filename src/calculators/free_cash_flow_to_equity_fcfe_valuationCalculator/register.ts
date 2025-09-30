import { calculatorRegistry } from '../../data/calculatorRegistry';
import { free_cash_flow_to_equity_fcfe_valuationCalculatorCalculator } from './free_cash_flow_to_equity_fcfe_valuationCalculatorCalculator';

export function registerfree_cash_flow_to_equity_fcfe_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new free_cash_flow_to_equity_fcfe_valuationCalculatorCalculator());
}
