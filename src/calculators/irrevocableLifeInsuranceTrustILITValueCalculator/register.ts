import { calculatorRegistry } from '../../data/calculatorRegistry';
import { irrevocableLifeInsuranceTrustILITValueCalculator } from './irrevocableLifeInsuranceTrustILITValueCalculator';

export function registerirrevocableLifeInsuranceTrustILITValueCalculator(): void {
  calculatorRegistry.register(new irrevocableLifeInsuranceTrustILITValueCalculator());
}
