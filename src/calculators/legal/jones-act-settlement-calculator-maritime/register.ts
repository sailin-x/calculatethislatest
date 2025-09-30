import { calculatorRegistry } from '../../data/calculatorRegistry';
import { jonesactsettlementcalculatormaritimeCalculator } from './jonesactsettlementcalculatormaritimeCalculator';

export function registerjonesactsettlementcalculatormaritimeCalculator(): void {
  calculatorRegistry.register(new jonesactsettlementcalculatormaritimeCalculator());
}
