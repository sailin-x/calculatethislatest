import { calculatorRegistry } from '../../data/calculatorRegistry';
import { employeestockoptionplanesopvaluationcalculatorCalculator } from './employeestockoptionplanesopvaluationcalculatorCalculator';

export function registeremployeestockoptionplanesopvaluationcalculatorCalculator(): void {
  calculatorRegistry.register(new employeestockoptionplanesopvaluationcalculatorCalculator());
}
