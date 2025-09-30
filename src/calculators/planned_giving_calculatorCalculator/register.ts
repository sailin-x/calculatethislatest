import { calculatorRegistry } from '../../data/calculatorRegistry';
import { planned_giving_calculatorCalculatorCalculator } from './planned_giving_calculatorCalculatorCalculator';

export function registerplanned_giving_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new planned_giving_calculatorCalculatorCalculator());
}
