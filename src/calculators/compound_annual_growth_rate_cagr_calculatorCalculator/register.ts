import { calculatorRegistry } from '../../data/calculatorRegistry';
import { compound_annual_growth_rate_cagr_calculatorCalculatorCalculator } from './compound_annual_growth_rate_cagr_calculatorCalculatorCalculator';

export function registercompound_annual_growth_rate_cagr_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new compound_annual_growth_rate_cagr_calculatorCalculatorCalculator());
}
