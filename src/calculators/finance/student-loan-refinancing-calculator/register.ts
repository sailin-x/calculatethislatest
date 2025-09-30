import { calculatorRegistry } from '../../data/calculatorRegistry';
import { studentloanrefinancingcalculatorCalculator } from './studentloanrefinancingcalculatorCalculator';

export function registerstudentloanrefinancingcalculatorCalculator(): void {
  calculatorRegistry.register(new studentloanrefinancingcalculatorCalculator());
}
