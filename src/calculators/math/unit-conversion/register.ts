import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { UnitConversionCalculator } from './UnitConversionCalculator';

export function registerUnitConversionCalculator() {
  calculatorRegistry.register(UnitConversionCalculator);
}
