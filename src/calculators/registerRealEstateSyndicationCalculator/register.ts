import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateSyndicationCalculator } from './registerRealEstateSyndicationCalculator';

export function registerregisterRealEstateSyndicationCalculator(): void {
  calculatorRegistry.register(new registerRealEstateSyndicationCalculator());
}
