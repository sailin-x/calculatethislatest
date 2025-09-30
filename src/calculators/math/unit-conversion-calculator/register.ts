import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { UnitConversionCalculator } from './UnitConversionCalculator';

export function registerUnitConversionCalculator(): void {
  calculatorRegistry.register(UnitConversionCalculator);
}

export { UnitConversionCalculator };
