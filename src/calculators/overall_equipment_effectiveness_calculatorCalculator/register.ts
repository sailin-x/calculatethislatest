import { calculatorRegistry } from '../../data/calculatorRegistry';
import { overall_equipment_effectiveness_calculatorCalculatorCalculator } from './overall_equipment_effectiveness_calculatorCalculatorCalculator';

export function registeroverall_equipment_effectiveness_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new overall_equipment_effectiveness_calculatorCalculatorCalculator());
}
