import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HumanCapitalDueDiligenceCalculator } from './HumanCapitalDueDiligenceCalculator';

export function registerHumanCapitalDueDiligenceCalculator(): void {
  calculatorRegistry.register(HumanCapitalDueDiligenceCalculator);
}

export { HumanCapitalDueDiligenceCalculator };
