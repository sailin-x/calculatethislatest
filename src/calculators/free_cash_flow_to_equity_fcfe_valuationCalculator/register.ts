import { calculatorRegistry } from '../../data/calculatorRegistry';
import { free_cash_flow_to_equity_fcfe_valuationCalculator } from './free_cash_flow_to_equity_fcfe_valuationCalculator';

export function registerfree_cash_flow_to_equity_fcfe_valuationCalculator(): void {
  calculatorRegistry.register(new free_cash_flow_to_equity_fcfe_valuationCalculator());
}
