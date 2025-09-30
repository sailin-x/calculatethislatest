import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GasCostCalculator } from './GasCostCalculator';

export function registerGasCostCalculator(): void {
  calculatorRegistry.register(GasCostCalculator);
}

export { GasCostCalculator };
