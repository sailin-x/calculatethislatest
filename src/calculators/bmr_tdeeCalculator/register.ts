import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bmr_tdeeCalculator } from './bmr_tdeeCalculator';

export function registerbmr_tdeeCalculator(): void {
  calculatorRegistry.register(new bmr_tdeeCalculator());
}
