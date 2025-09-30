import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_impact_calculatorCalculatorCalculator } from './financial_impact_calculatorCalculatorCalculator';

export function registerfinancial_impact_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_impact_calculatorCalculatorCalculator());
}
