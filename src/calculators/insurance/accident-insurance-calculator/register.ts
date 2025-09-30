import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AccidentInsuranceCalculator } from './AccidentInsuranceCalculator';

export function registerAccidentInsuranceCalculator(): void {
  calculatorRegistry.register(AccidentInsuranceCalculator);
}

export { AccidentInsuranceCalculator };
