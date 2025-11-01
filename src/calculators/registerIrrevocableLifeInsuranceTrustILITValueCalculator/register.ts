import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerIrrevocableLifeInsuranceTrustILITValueCalculator } from './registerIrrevocableLifeInsuranceTrustILITValueCalculator';

export function registerregisterIrrevocableLifeInsuranceTrustILITValueCalculator(): void {
  calculatorRegistry.register(new registerIrrevocableLifeInsuranceTrustILITValueCalculator());
}
