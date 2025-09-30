import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PoliticalRiskCalculator } from './PoliticalRiskCalculator';

export function registerPoliticalRiskCalculator(): void {
  calculatorRegistry.register(PoliticalRiskCalculator);
}

export { PoliticalRiskCalculator };
