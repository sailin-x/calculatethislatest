import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateSyndicationCalculatorCalculator } from './realEstateSyndicationCalculatorCalculator';

export function registerrealEstateSyndicationCalculatorCalculator(): void {
  calculatorRegistry.register(new realEstateSyndicationCalculatorCalculator());
}
