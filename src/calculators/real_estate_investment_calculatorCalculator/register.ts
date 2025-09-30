import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_investment_calculatorCalculatorCalculator } from './real_estate_investment_calculatorCalculatorCalculator';

export function registerreal_estate_investment_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_investment_calculatorCalculatorCalculator());
}
