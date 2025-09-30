import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bariatric_surgery_cost_savings_calculatorCalculatorCalculator } from './bariatric_surgery_cost_savings_calculatorCalculatorCalculator';

export function registerbariatric_surgery_cost_savings_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new bariatric_surgery_cost_savings_calculatorCalculatorCalculator());
}
