import { calculatorRegistry } from '../../data/calculatorRegistry';
import { building_replacement_costCalculatorCalculator } from './building_replacement_costCalculatorCalculator';

export function registerbuilding_replacement_costCalculatorCalculator(): void {
  calculatorRegistry.register(new building_replacement_costCalculatorCalculator());
}
