import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_apr_comparisonCalculatorCalculator } from './mortgage_apr_comparisonCalculatorCalculator';

export function registermortgage_apr_comparisonCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_apr_comparisonCalculatorCalculator());
}
