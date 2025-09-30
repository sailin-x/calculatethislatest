import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ConsultantUtilizationRateCalculator } from './ConsultantUtilizationRateCalculator';

export function registerConsultantUtilizationRateCalculator(): void {
  calculatorRegistry.register(ConsultantUtilizationRateCalculator);
}

export { ConsultantUtilizationRateCalculator };
