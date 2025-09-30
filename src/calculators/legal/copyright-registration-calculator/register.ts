import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CopyrightRegistrationCalculator } from './CopyrightRegistrationCalculator';

export function registerCopyrightRegistrationCalculator(): void {
  calculatorRegistry.register(CopyrightRegistrationCalculator);
}

export { CopyrightRegistrationCalculator };
