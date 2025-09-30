import { calculatorRegistry } from '../../data/calculatorRegistry';
import { corporatecompliancecostbenefitanalysisCalculator } from './corporatecompliancecostbenefitanalysisCalculator';

export function registercorporatecompliancecostbenefitanalysisCalculator(): void {
  calculatorRegistry.register(new corporatecompliancecostbenefitanalysisCalculator());
}
