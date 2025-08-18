import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { LandlordInsuranceCalculator } from './LandlordInsuranceCalculator';

export function registerLandlordInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(LandlordInsuranceCalculator);
}

export { LandlordInsuranceCalculator };
