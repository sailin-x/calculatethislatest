import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EnvironmentalRemediationCalculator } from './EnvironmentalRemediationCalculator';

export function registerEnvironmentalRemediationCalculator(): void {
  calculatorRegistry.register(EnvironmentalRemediationCalculator);
}

export { EnvironmentalRemediationCalculator };
