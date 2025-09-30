import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateSyndicationCalculatorCalculator } from './registerRealEstateSyndicationCalculatorCalculator';

export function registerregisterRealEstateSyndicationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRealEstateSyndicationCalculatorCalculator());
}
