import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EmergencyFundCalculator } from './EmergencyFundCalculator';

export function registerEmergencyFundCalculator(): void {
  calculatorRegistry.register(EmergencyFundCalculator);
}

export { EmergencyFundCalculator };
