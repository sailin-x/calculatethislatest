import { calculatorRegistry } from '../../data/calculatorRegistry';
import { marketing_roi_calculatorCalculatorCalculator } from './marketing_roi_calculatorCalculatorCalculator';

export function registermarketing_roi_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new marketing_roi_calculatorCalculatorCalculator());
}
