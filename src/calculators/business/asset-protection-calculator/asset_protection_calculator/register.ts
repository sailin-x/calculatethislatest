import { calculatorRegistry } from '../../data/calculatorRegistry';
import { asset_protection_calculatorCalculator } from './asset_protection_calculatorCalculator';

export function registerasset_protection_calculatorCalculator(): void {
  calculatorRegistry.register(new asset_protection_calculatorCalculator());
}
