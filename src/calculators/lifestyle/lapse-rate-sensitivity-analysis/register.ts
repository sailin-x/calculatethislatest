import { calculatorRegistry } from '../../data/calculatorRegistry';
import { lapseratesensitivityanalysisCalculator } from './lapseratesensitivityanalysisCalculator';

export function registerlapseratesensitivityanalysisCalculator(): void {
  calculatorRegistry.register(new lapseratesensitivityanalysisCalculator());
}
