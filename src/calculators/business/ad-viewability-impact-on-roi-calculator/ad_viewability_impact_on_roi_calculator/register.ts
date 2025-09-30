import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad_viewability_impact_on_roi_calculatorCalculator } from './ad_viewability_impact_on_roi_calculatorCalculator';

export function registerad_viewability_impact_on_roi_calculatorCalculator(): void {
  calculatorRegistry.register(new ad_viewability_impact_on_roi_calculatorCalculator());
}
