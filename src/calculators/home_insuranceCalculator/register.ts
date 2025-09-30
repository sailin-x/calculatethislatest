import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_insuranceCalculatorCalculator } from './home_insuranceCalculatorCalculator';

export function registerhome_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new home_insuranceCalculatorCalculator());
}
