import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_apr_comparisonCalculator } from './mortgage_apr_comparisonCalculator';

export function registermortgage_apr_comparisonCalculator(): void {
  calculatorRegistry.register(new mortgage_apr_comparisonCalculator());
}
