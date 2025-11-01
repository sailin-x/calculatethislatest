import { calculatorRegistry } from '../../data/calculatorRegistry';
import { free_cash_flow_to_firm_fcff_valuationCalculator } from './free_cash_flow_to_firm_fcff_valuationCalculator';

export function registerfree_cash_flow_to_firm_fcff_valuationCalculator(): void {
  calculatorRegistry.register(new free_cash_flow_to_firm_fcff_valuationCalculator());
}
