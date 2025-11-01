import { calculatorRegistry } from '../../data/calculatorRegistry';
import { capital_call_schedule_plannerCalculator } from './capital_call_schedule_plannerCalculator';

export function registercapital_call_schedule_plannerCalculator(): void {
  calculatorRegistry.register(new capital_call_schedule_plannerCalculator());
}
