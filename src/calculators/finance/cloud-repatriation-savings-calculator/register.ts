import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cloudrepatriationsavingscalculatorCalculator } from './cloudrepatriationsavingscalculatorCalculator';

export function registercloudrepatriationsavingscalculatorCalculator(): void {
  calculatorRegistry.register(new cloudrepatriationsavingscalculatorCalculator());
}
