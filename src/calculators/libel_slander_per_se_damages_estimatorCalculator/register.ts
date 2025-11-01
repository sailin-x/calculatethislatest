import { calculatorRegistry } from '../../data/calculatorRegistry';
import { libel_slander_per_se_damages_estimatorCalculator } from './libel_slander_per_se_damages_estimatorCalculator';

export function registerlibel_slander_per_se_damages_estimatorCalculator(): void {
  calculatorRegistry.register(new libel_slander_per_se_damages_estimatorCalculator());
}
