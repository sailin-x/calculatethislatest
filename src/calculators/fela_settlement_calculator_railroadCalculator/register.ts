import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fela_settlement_calculator_railroadCalculatorCalculator } from './fela_settlement_calculator_railroadCalculatorCalculator';

export function registerfela_settlement_calculator_railroadCalculatorCalculator(): void {
  calculatorRegistry.register(new fela_settlement_calculator_railroadCalculatorCalculator());
}
