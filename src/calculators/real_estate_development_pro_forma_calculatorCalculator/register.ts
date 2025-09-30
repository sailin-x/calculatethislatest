import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_development_pro_forma_calculatorCalculatorCalculator } from './real_estate_development_pro_forma_calculatorCalculatorCalculator';

export function registerreal_estate_development_pro_forma_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_development_pro_forma_calculatorCalculatorCalculator());
}
