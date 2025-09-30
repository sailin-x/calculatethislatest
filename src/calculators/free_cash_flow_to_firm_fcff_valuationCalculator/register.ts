import { calculatorRegistry } from '../../data/calculatorRegistry';
import { free_cash_flow_to_firm_fcff_valuationCalculatorCalculator } from './free_cash_flow_to_firm_fcff_valuationCalculatorCalculator';

export function registerfree_cash_flow_to_firm_fcff_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new free_cash_flow_to_firm_fcff_valuationCalculatorCalculator());
}
