import { calculatorRegistry } from '../../data/calculatorRegistry';
import { './health/bmr-tdee';Calculator } from './'./health/bmr-tdee';Calculator';

export function register'./health/bmr-tdee';Calculator(): void {
  calculatorRegistry.register(new './health/bmr-tdee';Calculator());
}
