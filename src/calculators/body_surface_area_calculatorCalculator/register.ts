import { calculatorRegistry } from '../../data/calculatorRegistry';
import { body_surface_area_calculatorCalculatorCalculator } from './body_surface_area_calculatorCalculatorCalculator';

export function registerbody_surface_area_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new body_surface_area_calculatorCalculatorCalculator());
}
