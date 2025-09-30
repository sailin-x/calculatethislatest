import { calculatorRegistry } from '../../data/calculatorRegistry';
import { medical_malpractice_damages_calculatorCalculatorCalculator } from './medical_malpractice_damages_calculatorCalculatorCalculator';

export function registermedical_malpractice_damages_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new medical_malpractice_damages_calculatorCalculatorCalculator());
}
