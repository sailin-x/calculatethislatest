import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AdViewabilityImpactCalculator } from './AdViewabilityImpactCalculator';

export function registerAdViewabilityImpactCalculator(): void {
  calculatorRegistry.register(AdViewabilityImpactCalculator);
}

export { AdViewabilityImpactCalculator };
