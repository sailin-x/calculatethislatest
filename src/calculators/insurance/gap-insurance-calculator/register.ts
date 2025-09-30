import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GapInsuranceCalculator } from './GapInsuranceCalculator';

export function registerGapInsuranceCalculator(): void {
  calculatorRegistry.register(GapInsuranceCalculator);
}

export { GapInsuranceCalculator };
