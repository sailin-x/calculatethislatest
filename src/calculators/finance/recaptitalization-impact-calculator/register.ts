import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RecaptitalizationImpactCalculator } from './RecaptitalizationImpactCalculator';

export function registerRecaptitalizationImpactCalculator(): void {
  calculatorRegistry.register(RecaptitalizationImpactCalculator);
}

export { RecaptitalizationImpactCalculator };
