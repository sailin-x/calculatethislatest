import { calculatorRegistry } from '../../data/calculatorRegistry';
import { lean_manufacturing_takt_time_calculatorCalculatorCalculator } from './lean_manufacturing_takt_time_calculatorCalculatorCalculator';

export function registerlean_manufacturing_takt_time_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new lean_manufacturing_takt_time_calculatorCalculatorCalculator());
}
