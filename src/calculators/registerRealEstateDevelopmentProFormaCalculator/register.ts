import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateDevelopmentProFormaCalculatorCalculator } from './registerRealEstateDevelopmentProFormaCalculatorCalculator';

export function registerregisterRealEstateDevelopmentProFormaCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRealEstateDevelopmentProFormaCalculatorCalculator());
}
