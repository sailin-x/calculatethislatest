import { calculatorRegistry } from '../../data/calculatorRegistry';
import { retirementabroadcalculatorCalculator } from './retirementabroadcalculatorCalculator';

export function registerretirementabroadcalculatorCalculator(): void {
  calculatorRegistry.register(new retirementabroadcalculatorCalculator());
}
