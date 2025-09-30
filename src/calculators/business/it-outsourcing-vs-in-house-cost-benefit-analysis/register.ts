import { calculatorRegistry } from '../../data/calculatorRegistry';
import { itoutsourcingvsinhousecostbenefitanalysisCalculator } from './itoutsourcingvsinhousecostbenefitanalysisCalculator';

export function registeritoutsourcingvsinhousecostbenefitanalysisCalculator(): void {
  calculatorRegistry.register(new itoutsourcingvsinhousecostbenefitanalysisCalculator());
}
