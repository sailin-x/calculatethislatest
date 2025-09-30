import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ItOutsourcingVsInHouseCalculator } from './ItOutsourcingVsInHouseCalculator';

export function registerItOutsourcingVsInHouseCalculator(): void {
  calculatorRegistry.register(ItOutsourcingVsInHouseCalculator);
}

export { ItOutsourcingVsInHouseCalculator };
