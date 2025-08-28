import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AssetProtectionCalculator } from './AssetProtectionCalculator';

export function registerAssetProtectionCalculator() {
  calculatorRegistry.register(AssetProtectionCalculator);
}
