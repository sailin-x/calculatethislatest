import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LibelSlanderPerSeDamagesEstimator } from './LibelSlanderPerSeDamagesEstimator';

export function registerLibelSlanderPerSeDamagesEstimator(): void {
  calculatorRegistry.register(LibelSlanderPerSeDamagesEstimator);
}

export { LibelSlanderPerSeDamagesEstimator };
