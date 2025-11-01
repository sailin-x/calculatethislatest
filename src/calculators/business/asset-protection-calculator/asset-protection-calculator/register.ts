import { calculatorRegistry } from '../../../../data/calculatorRegistry';
import { assetprotectioncalculator } from './AssetProtectionCalculator';

export function registerassetprotectioncalculator(): void {
  calculatorRegistry.register(new assetprotectioncalculator());
}
