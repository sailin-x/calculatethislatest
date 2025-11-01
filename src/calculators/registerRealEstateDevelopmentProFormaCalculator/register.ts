import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateDevelopmentProFormaCalculator } from './registerRealEstateDevelopmentProFormaCalculator';

export function registerregisterRealEstateDevelopmentProFormaCalculator(): void {
  calculatorRegistry.register(new registerRealEstateDevelopmentProFormaCalculator());
}
