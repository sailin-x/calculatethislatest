import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { FloodInsuranceCalculator } from './FloodInsuranceCalculator';

export function registerFloodInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(FloodInsuranceCalculator);
}

export { FloodInsuranceCalculator };
