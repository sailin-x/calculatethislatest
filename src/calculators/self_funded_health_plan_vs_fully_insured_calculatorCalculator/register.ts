import { calculatorRegistry } from '../../data/calculatorRegistry';
import { self_funded_health_plan_vs_fully_insured_calculatorCalculatorCalculator } from './self_funded_health_plan_vs_fully_insured_calculatorCalculatorCalculator';

export function registerself_funded_health_plan_vs_fully_insured_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new self_funded_health_plan_vs_fully_insured_calculatorCalculatorCalculator());
}
