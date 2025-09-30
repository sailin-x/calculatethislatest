import { calculatorRegistry } from '../../data/calculatorRegistry';
import { felasettlementcalculatorrailroadCalculator } from './felasettlementcalculatorrailroadCalculator';

export function registerfelasettlementcalculatorrailroadCalculator(): void {
  calculatorRegistry.register(new felasettlementcalculatorrailroadCalculator());
}
