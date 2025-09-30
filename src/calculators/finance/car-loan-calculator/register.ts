import { calculatorRegistry } from '../../data/calculatorRegistry';
import { carloancalculatorCalculator } from './carloancalculatorCalculator';

export function registercarloancalculatorCalculator(): void {
  calculatorRegistry.register(new carloancalculatorCalculator());
}
