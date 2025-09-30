import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRentVsBuyCalculatorCalculator } from './registerRentVsBuyCalculatorCalculator';

export function registerregisterRentVsBuyCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRentVsBuyCalculatorCalculator());
}
