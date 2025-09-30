import { Calculator } from '../../engines/CalculatorEngine';
import { farmland_investment_roiCalculatorInputs, farmland_investment_roiCalculatorResults, farmland_investment_roiCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class farmland_investment_roiCalculatorCalculator implements Calculator<farmland_investment_roiCalculatorInputs, farmland_investment_roiCalculatorResults> {
  readonly id = 'farmland_investment_roiCalculator';
  readonly name = 'farmland_investment_roiCalculator Calculator';
  readonly description = 'Calculate farmland_investment_roiCalculator values';

  calculate(inputs: farmland_investment_roiCalculatorInputs): farmland_investment_roiCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: farmland_investment_roiCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: farmland_investment_roiCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
