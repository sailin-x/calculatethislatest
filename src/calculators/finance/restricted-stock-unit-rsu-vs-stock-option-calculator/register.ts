import { calculatorRegistry } from '../../data/calculatorRegistry';
import { restrictedstockunitrsuvsstockoptioncalculatorCalculator } from './restrictedstockunitrsuvsstockoptioncalculatorCalculator';

export function registerrestrictedstockunitrsuvsstockoptioncalculatorCalculator(): void {
  calculatorRegistry.register(new restrictedstockunitrsuvsstockoptioncalculatorCalculator());
}
