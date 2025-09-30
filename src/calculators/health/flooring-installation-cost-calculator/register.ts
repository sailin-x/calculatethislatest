import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FlooringInstallationCostCalculator } from './FlooringInstallationCostCalculator';

export function registerFlooringInstallationCostCalculator(): void {
  calculatorRegistry.register(FlooringInstallationCostCalculator);
}

export { FlooringInstallationCostCalculator };
