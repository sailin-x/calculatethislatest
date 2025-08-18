import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { FarmlandInvestmentROICalculator } from './FarmlandInvestmentROICalculator';

export function registerFarmlandInvestmentROICalculator(registry: CalculatorRegistry): void {
  registry.register(FarmlandInvestmentROICalculator);
}

export { FarmlandInvestmentROICalculator };
