import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_flow_calculatorCalculatorCalculator } from './financial_flow_calculatorCalculatorCalculator';

export function registerfinancial_flow_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_flow_calculatorCalculatorCalculator());
}
