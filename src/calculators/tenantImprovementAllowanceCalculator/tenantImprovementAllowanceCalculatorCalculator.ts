import { Calculator } from '../../engines/CalculatorEngine';
import { tenantImprovementAllowanceCalculatorInputs, tenantImprovementAllowanceCalculatorResults, tenantImprovementAllowanceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tenantImprovementAllowanceCalculatorCalculator implements Calculator<tenantImprovementAllowanceCalculatorInputs, tenantImprovementAllowanceCalculatorResults> {
  readonly id = 'tenantImprovementAllowanceCalculator';
  readonly name = 'tenantImprovementAllowanceCalculator Calculator';
  readonly description = 'Calculate tenantImprovementAllowanceCalculator values';

  calculate(inputs: tenantImprovementAllowanceCalculatorInputs): tenantImprovementAllowanceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tenantImprovementAllowanceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tenantImprovementAllowanceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
