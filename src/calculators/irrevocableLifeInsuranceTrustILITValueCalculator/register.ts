import { calculatorRegistry } from '../../data/calculatorRegistry';
import { irrevocableLifeInsuranceTrustILITValueCalculatorCalculator } from './irrevocableLifeInsuranceTrustILITValueCalculatorCalculator';

export function registerirrevocableLifeInsuranceTrustILITValueCalculatorCalculator(): void {
  calculatorRegistry.register(new irrevocableLifeInsuranceTrustILITValueCalculatorCalculator());
}
