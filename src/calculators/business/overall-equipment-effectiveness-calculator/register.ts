import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { OverallEquipmentEffectivenessCalculator } from './OverallEquipmentEffectivenessCalculator';

export function registerOverallEquipmentEffectivenessCalculator(): void {
  calculatorRegistry.register(OverallEquipmentEffectivenessCalculator);
}

export { OverallEquipmentEffectivenessCalculator };
