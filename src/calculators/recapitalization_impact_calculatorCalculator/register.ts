import { calculatorRegistry } from '../../data/calculatorRegistry';
import { recapitalization_impact_calculatorCalculatorCalculator } from './recapitalization_impact_calculatorCalculatorCalculator';

export function registerrecapitalization_impact_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new recapitalization_impact_calculatorCalculatorCalculator());
}
