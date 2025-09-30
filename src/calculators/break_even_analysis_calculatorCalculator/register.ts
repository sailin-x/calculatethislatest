import { calculatorRegistry } from '../../data/calculatorRegistry';
import { break_even_analysis_calculatorCalculatorCalculator } from './break_even_analysis_calculatorCalculatorCalculator';

export function registerbreak_even_analysis_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new break_even_analysis_calculatorCalculatorCalculator());
}
