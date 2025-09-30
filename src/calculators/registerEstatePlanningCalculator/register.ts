import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEstatePlanningCalculatorCalculator } from './registerEstatePlanningCalculatorCalculator';

export function registerregisterEstatePlanningCalculatorCalculator(): void {
  calculatorRegistry.register(new registerEstatePlanningCalculatorCalculator());
}
