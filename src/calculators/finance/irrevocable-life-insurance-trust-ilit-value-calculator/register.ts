import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IrrevocableLifeInsuranceTrustIlitValueCalculator } from './IrrevocableLifeInsuranceTrustIlitValueCalculator';

export function registerIrrevocableLifeInsuranceTrustIlitValueCalculator(): void {
  calculatorRegistry.register(IrrevocableLifeInsuranceTrustIlitValueCalculator);
}

export { IrrevocableLifeInsuranceTrustIlitValueCalculator };
