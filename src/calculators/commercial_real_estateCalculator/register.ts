import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercial_real_estateCalculatorCalculator } from './commercial_real_estateCalculatorCalculator';

export function registercommercial_real_estateCalculatorCalculator(): void {
  calculatorRegistry.register(new commercial_real_estateCalculatorCalculator());
}
