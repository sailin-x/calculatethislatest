import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_investmentCalculatorCalculator } from './real_estate_investmentCalculatorCalculator';

export function registerreal_estate_investmentCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_investmentCalculatorCalculator());
}
