import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bmr_tdeeCalculatorCalculator } from './bmr_tdeeCalculatorCalculator';

export function registerbmr_tdeeCalculatorCalculator(): void {
  calculatorRegistry.register(new bmr_tdeeCalculatorCalculator());
}
