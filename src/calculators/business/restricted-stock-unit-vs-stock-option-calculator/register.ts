import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RestrictedStockUnitVsStockOptionCalculator } from './RestrictedStockUnitVsStockOptionCalculator';

export function registerRestrictedStockUnitVsStockOptionCalculator(): void {
  calculatorRegistry.register(RestrictedStockUnitVsStockOptionCalculator);
}

export { RestrictedStockUnitVsStockOptionCalculator };
