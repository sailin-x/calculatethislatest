import { calculatorRegistry } from '../../data/calculatorRegistry';
import { propertytaxappealsavingscalculatorCalculator } from './propertytaxappealsavingscalculatorCalculator';

export function registerpropertytaxappealsavingscalculatorCalculator(): void {
  calculatorRegistry.register(new propertytaxappealsavingscalculatorCalculator());
}
