import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MoldRemediationCostCalculator } from './MoldRemediationCostCalculator';

export function registerMoldRemediationCostCalculator(): void {
  calculatorRegistry.register(MoldRemediationCostCalculator);
}

export { MoldRemediationCostCalculator };
