import { Calculator } from '../../engines/CalculatorEngine';
import { TaxLossHarvestingCalculatorInputs, TaxLossHarvestingCalculatorResults, TaxLossHarvestingCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class TaxLossHarvestingCalculatorCalculator implements Calculator<TaxLossHarvestingCalculatorInputs, TaxLossHarvestingCalculatorResults> {
  readonly id = 'TaxLossHarvestingCalculator';
  readonly name = 'TaxLossHarvestingCalculator Calculator';
  readonly description = 'Calculate TaxLossHarvestingCalculator values';

  calculate(inputs: TaxLossHarvestingCalculatorInputs): TaxLossHarvestingCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: TaxLossHarvestingCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: TaxLossHarvestingCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
