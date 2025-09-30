import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loancomparisoncalculatorCalculator } from './loancomparisoncalculatorCalculator';

export function registerloancomparisoncalculatorCalculator(): void {
  calculatorRegistry.register(new loancomparisoncalculatorCalculator());
}
