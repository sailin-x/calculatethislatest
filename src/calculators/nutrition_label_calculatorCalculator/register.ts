import { calculatorRegistry } from '../../data/calculatorRegistry';
import { nutrition_label_calculatorCalculatorCalculator } from './nutrition_label_calculatorCalculatorCalculator';

export function registernutrition_label_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new nutrition_label_calculatorCalculatorCalculator());
}
