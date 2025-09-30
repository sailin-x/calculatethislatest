import { calculatorRegistry } from '../../data/calculatorRegistry';
import { self_funded_health_plan_calculatorCalculatorCalculator } from './self_funded_health_plan_calculatorCalculatorCalculator';

export function registerself_funded_health_plan_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new self_funded_health_plan_calculatorCalculatorCalculator());
}
