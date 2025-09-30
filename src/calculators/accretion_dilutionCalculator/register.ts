import { calculatorRegistry } from '../../data/calculatorRegistry';
import { accretion_dilutionCalculatorCalculator } from './accretion_dilutionCalculatorCalculator';

export function registeraccretion_dilutionCalculatorCalculator(): void {
  calculatorRegistry.register(new accretion_dilutionCalculatorCalculator());
}
