import { calculatorRegistry } from '../../data/calculatorRegistry';
import { merger_acquisition_divestiture_valuationCalculatorCalculator } from './merger_acquisition_divestiture_valuationCalculatorCalculator';

export function registermerger_acquisition_divestiture_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new merger_acquisition_divestiture_valuationCalculatorCalculator());
}
