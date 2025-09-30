import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EquipmentFinancingCalculator } from './EquipmentFinancingCalculator';

export function registerEquipmentFinancingCalculator(): void {
  calculatorRegistry.register(EquipmentFinancingCalculator);
}

export { EquipmentFinancingCalculator };
