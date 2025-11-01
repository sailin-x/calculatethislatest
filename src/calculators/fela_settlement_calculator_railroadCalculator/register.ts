import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fela_settlement_calculator_railroadCalculator } from './fela_settlement_calculator_railroadCalculator';

export function registerfela_settlement_calculator_railroadCalculator(): void {
  calculatorRegistry.register(new fela_settlement_calculator_railroadCalculator());
}
