import { Calculator } from '../../engines/CalculatorEngine';
import { tenant_improvementCalculatorInputs, tenant_improvementCalculatorResults, tenant_improvementCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tenant_improvementCalculatorCalculator implements Calculator<tenant_improvementCalculatorInputs, tenant_improvementCalculatorResults> {
  readonly id = 'tenant_improvementCalculator';
  readonly name = 'tenant_improvementCalculator Calculator';
  readonly description = 'Calculate tenant_improvementCalculator values';

  calculate(inputs: tenant_improvementCalculatorInputs): tenant_improvementCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tenant_improvementCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tenant_improvementCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
