import { calculatorRegistry } from '../../data/calculatorRegistry';
import { everydayCalculatorCalculator } from './everydayCalculatorCalculator';

export function registereverydayCalculatorCalculator(): void {
  calculatorRegistry.register(new everydayCalculatorCalculator());
}
