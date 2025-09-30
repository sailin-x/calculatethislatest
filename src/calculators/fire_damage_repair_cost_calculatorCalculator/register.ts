import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fire_damage_repair_cost_calculatorCalculatorCalculator } from './fire_damage_repair_cost_calculatorCalculatorCalculator';

export function registerfire_damage_repair_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new fire_damage_repair_cost_calculatorCalculatorCalculator());
}
