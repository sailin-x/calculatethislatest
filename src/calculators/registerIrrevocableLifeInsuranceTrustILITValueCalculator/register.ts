import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerIrrevocableLifeInsuranceTrustILITValueCalculatorCalculator } from './registerIrrevocableLifeInsuranceTrustILITValueCalculatorCalculator';

export function registerregisterIrrevocableLifeInsuranceTrustILITValueCalculatorCalculator(): void {
  calculatorRegistry.register(new registerIrrevocableLifeInsuranceTrustILITValueCalculatorCalculator());
}
