import { Calculator } from '../../engines/CalculatorEngine';
import { AdAgencyCommission-calculatorInputs, AdAgencyCommission-calculatorResults, AdAgencyCommission-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class AdAgencyCommission-calculator implements Calculator<AdAgencyCommission-calculatorInputs, AdAgencyCommission-calculatorResults> {
  readonly id = 'AdAgencyCommission-calculator';
  readonly name = 'ad agency commission calculator Calculator';
  readonly description = 'Calculate ad agency commission calculator values';

  calculate(inputs: AdAgencyCommission-calculatorInputs): AdAgencyCommission-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: AdAgencyCommission-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: AdAgencyCommission-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
