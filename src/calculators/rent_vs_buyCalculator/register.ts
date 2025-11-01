import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rent_vs_buyCalculator } from './rent_vs_buyCalculator';

export function registerrent_vs_buyCalculator(): void {
  calculatorRegistry.register(new rent_vs_buyCalculator());
}
