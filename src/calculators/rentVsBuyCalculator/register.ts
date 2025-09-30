import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rentVsBuyCalculatorCalculator } from './rentVsBuyCalculatorCalculator';

export function registerrentVsBuyCalculatorCalculator(): void {
  calculatorRegistry.register(new rentVsBuyCalculatorCalculator());
}
