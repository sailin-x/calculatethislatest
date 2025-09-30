import { calculatorRegistry } from '../../data/calculatorRegistry';
import { title_insuranceCalculatorCalculator } from './title_insuranceCalculatorCalculator';

export function registertitle_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new title_insuranceCalculatorCalculator());
}
