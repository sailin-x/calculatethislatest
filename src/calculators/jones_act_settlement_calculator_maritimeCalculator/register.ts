import { calculatorRegistry } from '../../data/calculatorRegistry';
import { jones_act_settlement_calculator_maritimeCalculatorCalculator } from './jones_act_settlement_calculator_maritimeCalculatorCalculator';

export function registerjones_act_settlement_calculator_maritimeCalculatorCalculator(): void {
  calculatorRegistry.register(new jones_act_settlement_calculator_maritimeCalculatorCalculator());
}
