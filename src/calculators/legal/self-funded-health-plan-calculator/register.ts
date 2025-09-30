import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SelfFundedHealthPlanCalculator } from './SelfFundedHealthPlanCalculator';

export function registerSelfFundedHealthPlanCalculator(): void {
  calculatorRegistry.register(SelfFundedHealthPlanCalculator);
}

export { SelfFundedHealthPlanCalculator };
