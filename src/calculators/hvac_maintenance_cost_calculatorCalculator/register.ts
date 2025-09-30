import { calculatorRegistry } from '../../data/calculatorRegistry';
import { hvac_maintenance_cost_calculatorCalculatorCalculator } from './hvac_maintenance_cost_calculatorCalculatorCalculator';

export function registerhvac_maintenance_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new hvac_maintenance_cost_calculatorCalculatorCalculator());
}
