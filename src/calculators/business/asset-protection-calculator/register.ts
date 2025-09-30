import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AssetProtectionCalculator } from './AssetProtectionCalculator';

export function registerAssetProtectionCalculator(): void {
  calculatorRegistry.register(AssetProtectionCalculator);
}

export { AssetProtectionCalculator };
