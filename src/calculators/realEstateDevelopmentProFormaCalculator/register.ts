import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateDevelopmentProFormaCalculator } from './realEstateDevelopmentProFormaCalculator';

export function registerrealEstateDevelopmentProFormaCalculator(): void {
  calculatorRegistry.register(new realEstateDevelopmentProFormaCalculator());
}
