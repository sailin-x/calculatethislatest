import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetPromoterScoreCalculator } from './NetPromoterScoreCalculator';

export function registerNetPromoterScoreCalculator(): void {
  calculatorRegistry.register(NetPromoterScoreCalculator);
}

export { NetPromoterScoreCalculator };
