import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_velocity_calculatorCalculatorCalculator } from './financial_velocity_calculatorCalculatorCalculator';

export function registerfinancial_velocity_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_velocity_calculatorCalculatorCalculator());
}
