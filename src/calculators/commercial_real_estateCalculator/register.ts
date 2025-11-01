import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_real_estateCalculator } from './commercial_real_estateCalculator';

export function registercommercial_real_estateCalculator(): void {
  calculatorRegistry.register(new commercial_real_estateCalculator());
}
