import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_lease_buyoutCalculator } from './commercial_lease_buyoutCalculator';

export function registercommercial_lease_buyoutCalculator(): void {
  calculatorRegistry.register(new commercial_lease_buyoutCalculator());
}
