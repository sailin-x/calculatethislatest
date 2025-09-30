import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { Soc2ComplianceCostCalculator } from './Soc2ComplianceCostCalculator';

export function registerSoc2ComplianceCostCalculator(): void {
  calculatorRegistry.register(Soc2ComplianceCostCalculator);
}

export { Soc2ComplianceCostCalculator };
