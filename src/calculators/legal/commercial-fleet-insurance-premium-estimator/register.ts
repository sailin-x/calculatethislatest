import { calculatorRegistry } from '../../data/calculatorRegistry';
import { commercialfleetinsurancepremiumestimatorCalculator } from './commercialfleetinsurancepremiumestimatorCalculator';

export function registercommercialfleetinsurancepremiumestimatorCalculator(): void {
  calculatorRegistry.register(new commercialfleetinsurancepremiumestimatorCalculator());
}
