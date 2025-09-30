import { calculatorRegistry } from '../../data/calculatorRegistry';
import { patent_valuation_calculatorCalculatorCalculator } from './patent_valuation_calculatorCalculatorCalculator';

export function registerpatent_valuation_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new patent_valuation_calculatorCalculatorCalculator());
}
