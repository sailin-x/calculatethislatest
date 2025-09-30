import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IrrigationCalculator } from './IrrigationCalculator';

export function registerIrrigationCalculator(): void {
  calculatorRegistry.register(IrrigationCalculator);
}

export { IrrigationCalculator };
