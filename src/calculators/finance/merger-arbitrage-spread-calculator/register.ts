import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MergerArbitrageSpreadCalculator } from './MergerArbitrageSpreadCalculator';

export function registerMergerArbitrageSpreadCalculator(): void {
  calculatorRegistry.register(MergerArbitrageSpreadCalculator);
}

export { MergerArbitrageSpreadCalculator };
