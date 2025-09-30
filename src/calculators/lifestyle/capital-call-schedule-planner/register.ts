import { calculatorRegistry } from '../../data/calculatorRegistry';
import { capitalcallscheduleplannerCalculator } from './capitalcallscheduleplannerCalculator';

export function registercapitalcallscheduleplannerCalculator(): void {
  calculatorRegistry.register(new capitalcallscheduleplannerCalculator());
}
