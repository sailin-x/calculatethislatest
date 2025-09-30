import { calculatorRegistry } from '../../data/calculatorRegistry';
import { slip_and_fall_damages_calculatorCalculatorCalculator } from './slip_and_fall_damages_calculatorCalculatorCalculator';

export function registerslip_and_fall_damages_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new slip_and_fall_damages_calculatorCalculatorCalculator());
}
