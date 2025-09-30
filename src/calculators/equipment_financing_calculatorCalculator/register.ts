import { calculatorRegistry } from '../../data/calculatorRegistry';
import { equipment_financing_calculatorCalculatorCalculator } from './equipment_financing_calculatorCalculatorCalculator';

export function registerequipment_financing_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new equipment_financing_calculatorCalculatorCalculator());
}
