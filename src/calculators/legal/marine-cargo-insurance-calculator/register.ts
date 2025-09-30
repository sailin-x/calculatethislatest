import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MarineCargoInsuranceCalculator } from './MarineCargoInsuranceCalculator';

export function registerMarineCargoInsuranceCalculator(): void {
  calculatorRegistry.register(MarineCargoInsuranceCalculator);
}

export { MarineCargoInsuranceCalculator };
