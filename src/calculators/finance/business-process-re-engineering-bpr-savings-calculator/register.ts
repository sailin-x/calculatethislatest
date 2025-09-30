import { calculatorRegistry } from '../../data/calculatorRegistry';
import { businessprocessreengineeringbprsavingscalculatorCalculator } from './businessprocessreengineeringbprsavingscalculatorCalculator';

export function registerbusinessprocessreengineeringbprsavingscalculatorCalculator(): void {
  calculatorRegistry.register(new businessprocessreengineeringbprsavingscalculatorCalculator());
}
