import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EnvironmentalRemediationCostEstimator } from './EnvironmentalRemediationCostEstimator';

export function registerEnvironmentalRemediationCostEstimator(): void {
  calculatorRegistry.register(EnvironmentalRemediationCostEstimator);
}

export { EnvironmentalRemediationCostEstimator };
