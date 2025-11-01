import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cap_rateCalculator } from './cap_rateCalculator';

export function registercap_rateCalculator(): void {
  calculatorRegistry.register(new cap_rateCalculator());
}
