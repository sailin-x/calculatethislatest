import { calculatorRegistry } from '../../data/calculatorRegistry';
import { './health/bmr-tdee/bmr_tdee';Calculator } from './'./health/bmr-tdee/bmr_tdee';Calculator';

export function register'./health/bmr-tdee/bmr_tdee';Calculator(): void {
  calculatorRegistry.register(new './health/bmr-tdee/bmr_tdee';Calculator());
}
