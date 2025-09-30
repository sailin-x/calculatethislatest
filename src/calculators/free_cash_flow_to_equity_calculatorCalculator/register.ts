import { calculatorRegistry } from '../../data/calculatorRegistry';
import { free_cash_flow_to_equity_calculatorCalculatorCalculator } from './free_cash_flow_to_equity_calculatorCalculatorCalculator';

export function registerfree_cash_flow_to_equity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new free_cash_flow_to_equity_calculatorCalculatorCalculator());
}
