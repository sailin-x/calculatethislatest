import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_fleet_insurance_premium_estimatorCalculator } from './commercial_fleet_insurance_premium_estimatorCalculator';

export function registercommercial_fleet_insurance_premium_estimatorCalculator(): void {
  calculatorRegistry.register(new commercial_fleet_insurance_premium_estimatorCalculator());
}
