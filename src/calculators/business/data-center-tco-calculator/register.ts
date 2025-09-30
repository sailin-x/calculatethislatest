import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DataCenterTcoCalculator } from './DataCenterTcoCalculator';

export function registerDataCenterTcoCalculator(): void {
  calculatorRegistry.register(DataCenterTcoCalculator);
}

export { DataCenterTcoCalculator };
