import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CyberLiabilityCalculator } from './CyberLiabilityCalculator';

export function registerCyberLiabilityCalculator(): void {
  calculatorRegistry.register(CyberLiabilityCalculator);
}

export { CyberLiabilityCalculator };
