import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { QuiTamRewardCalculator } from './QuiTamRewardCalculator';

export function registerQuiTamRewardCalculator(): void {
  calculatorRegistry.register(QuiTamRewardCalculator);
}

export { QuiTamRewardCalculator };
