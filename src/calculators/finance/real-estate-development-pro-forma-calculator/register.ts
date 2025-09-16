import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { realEstateDevelopmentProFormaCalculator } from './RealEstateDevelopmentProFormaCalculator';

/**
 * Register the Real Estate Development Pro-Forma Calculator
 */
export function registerRealEstateDevelopmentProFormaCalculator(): void {
  calculatorRegistry.register(realEstateDevelopmentProFormaCalculator);
}