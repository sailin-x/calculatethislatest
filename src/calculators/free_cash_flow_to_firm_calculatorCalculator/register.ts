import { calculatorRegistry } from '../../data/calculatorRegistry';
import { free_cash_flow_to_firm_calculatorCalculatorCalculator } from './free_cash_flow_to_firm_calculatorCalculatorCalculator';

export function registerfree_cash_flow_to_firm_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new free_cash_flow_to_firm_calculatorCalculatorCalculator());
}
