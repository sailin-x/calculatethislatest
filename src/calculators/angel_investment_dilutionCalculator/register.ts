import { calculatorRegistry } from '../../data/calculatorRegistry';
import { angel_investment_dilutionCalculatorCalculator } from './angel_investment_dilutionCalculatorCalculator';

export function registerangel_investment_dilutionCalculatorCalculator(): void {
  calculatorRegistry.register(new angel_investment_dilutionCalculatorCalculator());
}
