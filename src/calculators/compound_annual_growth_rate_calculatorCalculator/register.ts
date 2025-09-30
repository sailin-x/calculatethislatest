import { calculatorRegistry } from '../../data/calculatorRegistry';
import { compound_annual_growth_rate_calculatorCalculatorCalculator } from './compound_annual_growth_rate_calculatorCalculatorCalculator';

export function registercompound_annual_growth_rate_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new compound_annual_growth_rate_calculatorCalculatorCalculator());
}
