import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AssetBasedLendingCalculator } from './AssetBasedLendingCalculator';

export function registerAssetBasedLendingCalculator(): void {
  calculatorRegistry.register(AssetBasedLendingCalculator);
}

export { AssetBasedLendingCalculator };
