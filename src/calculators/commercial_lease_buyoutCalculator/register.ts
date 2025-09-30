import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_lease_buyoutCalculatorCalculator } from './commercial_lease_buyoutCalculatorCalculator';

export function registercommercial_lease_buyoutCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_lease_buyoutCalculatorCalculator());
}
