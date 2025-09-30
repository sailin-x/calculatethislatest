import { calculatorRegistry } from '../../data/calculatorRegistry';
import { studentloanrepaymentcalculatorCalculator } from './studentloanrepaymentcalculatorCalculator';

export function registerstudentloanrepaymentcalculatorCalculator(): void {
  calculatorRegistry.register(new studentloanrepaymentcalculatorCalculator());
}
