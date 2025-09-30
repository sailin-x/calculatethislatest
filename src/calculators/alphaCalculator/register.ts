import { calculatorRegistry } from '../../data/calculatorRegistry';
import { alphaCalculatorCalculator } from './alphaCalculatorCalculator';

export function registeralphaCalculatorCalculator(): void {
  calculatorRegistry.register(new alphaCalculatorCalculator());
}
