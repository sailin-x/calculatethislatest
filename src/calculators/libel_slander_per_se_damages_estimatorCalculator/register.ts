import { calculatorRegistry } from '../../data/calculatorRegistry';
import { libel_slander_per_se_damages_estimatorCalculatorCalculator } from './libel_slander_per_se_damages_estimatorCalculatorCalculator';

export function registerlibel_slander_per_se_damages_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new libel_slander_per_se_damages_estimatorCalculatorCalculator());
}
