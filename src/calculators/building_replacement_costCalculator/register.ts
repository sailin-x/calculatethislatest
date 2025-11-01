import { calculatorRegistry } from '../../data/calculatorRegistry';
import { building_replacement_costCalculator } from './building_replacement_costCalculator';

export function registerbuilding_replacement_costCalculator(): void {
  calculatorRegistry.register(new building_replacement_costCalculator());
}
