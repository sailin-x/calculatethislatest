import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialConsultingCalculator } from './FinancialConsultingCalculator';

export function registerFinancialConsultingCalculator(): void {
  calculatorRegistry.register(FinancialConsultingCalculator);
}

export { FinancialConsultingCalculator };
