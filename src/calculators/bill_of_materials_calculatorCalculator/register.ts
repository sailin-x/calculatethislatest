import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bill_of_materials_calculatorCalculatorCalculator } from './bill_of_materials_calculatorCalculatorCalculator';

export function registerbill_of_materials_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new bill_of_materials_calculatorCalculatorCalculator());
}
