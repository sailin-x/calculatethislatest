import { calculatorRegistry } from '../../data/calculatorRegistry';
import { jones_act_settlement_calculator_maritimeCalculator } from './jones_act_settlement_calculator_maritimeCalculator';

export function registerjones_act_settlement_calculator_maritimeCalculator(): void {
  calculatorRegistry.register(new jones_act_settlement_calculator_maritimeCalculator());
}
