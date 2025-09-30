import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IncurredButNotReportedCalculator } from './IncurredButNotReportedCalculator';

export function registerIncurredButNotReportedCalculator(): void {
  calculatorRegistry.register(IncurredButNotReportedCalculator);
}

export { IncurredButNotReportedCalculator };
