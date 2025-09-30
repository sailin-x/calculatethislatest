import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LitigationFinanceRoiCalculator } from './LitigationFinanceRoiCalculator';

export function registerLitigationFinanceRoiCalculator(): void {
  calculatorRegistry.register(LitigationFinanceRoiCalculator);
}

export { LitigationFinanceRoiCalculator };
