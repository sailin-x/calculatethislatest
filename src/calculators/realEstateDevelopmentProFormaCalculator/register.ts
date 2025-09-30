import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateDevelopmentProFormaCalculatorCalculator } from './realEstateDevelopmentProFormaCalculatorCalculator';

export function registerrealEstateDevelopmentProFormaCalculatorCalculator(): void {
  calculatorRegistry.register(new realEstateDevelopmentProFormaCalculatorCalculator());
}
