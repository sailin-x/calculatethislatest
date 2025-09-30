import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_analysis_calculatorCalculatorCalculator } from './financial_analysis_calculatorCalculatorCalculator';

export function registerfinancial_analysis_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_analysis_calculatorCalculatorCalculator());
}
