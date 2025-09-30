import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DivorceSettlementCalculator } from './DivorceSettlementCalculator';

export function registerDivorceSettlementCalculator(): void {
  calculatorRegistry.register(DivorceSettlementCalculator);
}

export { DivorceSettlementCalculator };
