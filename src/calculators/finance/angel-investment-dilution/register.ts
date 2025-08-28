import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AngelInvestmentDilutionCalculator } from './AngelInvestmentDilutionCalculator';

export function registerAngelInvestmentDilutionCalculator() {
  calculatorRegistry.register(AngelInvestmentDilutionCalculator);
}
