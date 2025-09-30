import { calculatorRegistry } from '../../data/calculatorRegistry';
import { acupuncture_cost_calculatorCalculatorCalculator } from './acupuncture_cost_calculatorCalculatorCalculator';

export function registeracupuncture_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new acupuncture_cost_calculatorCalculatorCalculator());
}
