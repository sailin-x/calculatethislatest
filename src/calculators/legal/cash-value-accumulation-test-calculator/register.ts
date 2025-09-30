import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CashValueAccumulationTestCalculator } from './CashValueAccumulationTestCalculator';

export function registerCashValueAccumulationTestCalculator(): void {
  calculatorRegistry.register(CashValueAccumulationTestCalculator);
}

export { CashValueAccumulationTestCalculator };
