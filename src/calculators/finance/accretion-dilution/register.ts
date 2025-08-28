import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AccretionDilutionCalculator } from './AccretionDilutionCalculator';

export function registerAccretionDilutionCalculator() {
  calculatorRegistry.register(AccretionDilutionCalculator);
}
