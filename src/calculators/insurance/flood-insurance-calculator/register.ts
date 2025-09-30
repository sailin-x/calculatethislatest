import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FloodInsuranceCalculator } from './FloodInsuranceCalculator';

export function registerFloodInsuranceCalculator(): void {
  calculatorRegistry.register(FloodInsuranceCalculator);
}

export { FloodInsuranceCalculator };
