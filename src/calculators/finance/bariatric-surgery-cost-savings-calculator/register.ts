import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bariatricsurgerycostsavingscalculatorCalculator } from './bariatricsurgerycostsavingscalculatorCalculator';

export function registerbariatricsurgerycostsavingscalculatorCalculator(): void {
  calculatorRegistry.register(new bariatricsurgerycostsavingscalculatorCalculator());
}
