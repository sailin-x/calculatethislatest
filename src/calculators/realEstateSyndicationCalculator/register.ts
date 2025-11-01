import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateSyndicationCalculator } from './realEstateSyndicationCalculator';

export function registerrealEstateSyndicationCalculator(): void {
  calculatorRegistry.register(new realEstateSyndicationCalculator());
}
