import { Calculator } from '../../engines/CalculatorEngine';
import { EnterpriseValueCalculatorInputs, EnterpriseValueCalculatorResults, EnterpriseValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class EnterpriseValueCalculatorCalculator implements Calculator<EnterpriseValueCalculatorInputs, EnterpriseValueCalculatorResults> {
  readonly id = 'EnterpriseValueCalculator';
  readonly name = 'EnterpriseValueCalculator Calculator';
  readonly description = 'Calculate EnterpriseValueCalculator values';

  calculate(inputs: EnterpriseValueCalculatorInputs): EnterpriseValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: EnterpriseValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: EnterpriseValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
