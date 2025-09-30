import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_fleet_insurance_premium_estimatorCalculatorCalculator } from './commercial_fleet_insurance_premium_estimatorCalculatorCalculator';

export function registercommercial_fleet_insurance_premium_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_fleet_insurance_premium_estimatorCalculatorCalculator());
}
