import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RecapitalizationImpactCalculator } from './RecapitalizationImpactCalculator';

export function registerRecapitalizationImpactCalculator(): void {
  calculatorRegistry.register(RecapitalizationImpactCalculator);
}

export { RecapitalizationImpactCalculator };
