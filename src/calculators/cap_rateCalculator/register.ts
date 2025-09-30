import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cap_rateCalculatorCalculator } from './cap_rateCalculatorCalculator';

export function registercap_rateCalculatorCalculator(): void {
  calculatorRegistry.register(new cap_rateCalculatorCalculator());
}
