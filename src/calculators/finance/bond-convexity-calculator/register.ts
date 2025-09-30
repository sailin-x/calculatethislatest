import { calculatorRegistry } from '../../data/calculatorRegistry';
import { bondconvexitycalculatorCalculator } from './bondconvexitycalculatorCalculator';

export function registerbondconvexitycalculatorCalculator(): void {
  calculatorRegistry.register(new bondconvexitycalculatorCalculator());
}
