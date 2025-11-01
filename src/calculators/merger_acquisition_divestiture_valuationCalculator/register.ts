import { calculatorRegistry } from '../../data/calculatorRegistry';
import { merger_acquisition_divestiture_valuationCalculator } from './merger_acquisition_divestiture_valuationCalculator';

export function registermerger_acquisition_divestiture_valuationCalculator(): void {
  calculatorRegistry.register(new merger_acquisition_divestiture_valuationCalculator());
}
