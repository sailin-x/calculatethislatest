import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEstatePlanningCalculator } from './registerEstatePlanningCalculator';

export function registerregisterEstatePlanningCalculator(): void {
  calculatorRegistry.register(new registerEstatePlanningCalculator());
}
