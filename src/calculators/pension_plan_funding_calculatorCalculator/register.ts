import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pension_plan_funding_calculatorCalculatorCalculator } from './pension_plan_funding_calculatorCalculatorCalculator';

export function registerpension_plan_funding_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new pension_plan_funding_calculatorCalculatorCalculator());
}
