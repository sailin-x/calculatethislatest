import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rent_vs_buyCalculatorCalculator } from './rent_vs_buyCalculatorCalculator';

export function registerrent_vs_buyCalculatorCalculator(): void {
  calculatorRegistry.register(new rent_vs_buyCalculatorCalculator());
}
