import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 529_college_savings_planCalculator } from './529_college_savings_planCalculator';

export function registerfiveTwoNineCollegeSavingsPlanCalculator(): void {
  calculatorRegistry.register(new 529_college_savings_planCalculator());
}
