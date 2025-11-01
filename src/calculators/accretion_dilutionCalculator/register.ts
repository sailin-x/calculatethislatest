import { calculatorRegistry } from '../../data/calculatorRegistry';
import { accretion_dilutionCalculator } from './accretion_dilutionCalculator';

export function registeraccretion_dilutionCalculator(): void {
  calculatorRegistry.register(new accretion_dilutionCalculator());
}
