import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { unitConversionCalculator } from './UnitConversionCalculator';

export function registerUnitConversionCalculator() {
  calculatorRegistry.register(UnitConversionCalculator);
}
