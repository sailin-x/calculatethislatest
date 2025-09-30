import { calculatorRegistry } from '../../data/calculatorRegistry';
import { capital_call_schedule_plannerCalculatorCalculator } from './capital_call_schedule_plannerCalculatorCalculator';

export function registercapital_call_schedule_plannerCalculatorCalculator(): void {
  calculatorRegistry.register(new capital_call_schedule_plannerCalculatorCalculator());
}
