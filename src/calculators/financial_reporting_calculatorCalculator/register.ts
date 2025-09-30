import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_reporting_calculatorCalculatorCalculator } from './financial_reporting_calculatorCalculatorCalculator';

export function registerfinancial_reporting_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_reporting_calculatorCalculatorCalculator());
}
