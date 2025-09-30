import { calculatorRegistry } from '../../data/calculatorRegistry';
import { studentloanforgivenesscalculatorCalculator } from './studentloanforgivenesscalculatorCalculator';

export function registerstudentloanforgivenesscalculatorCalculator(): void {
  calculatorRegistry.register(new studentloanforgivenesscalculatorCalculator());
}
