import { Calculator } from '../../engines/CalculatorEngine';
import { registerEnterpriseValueCalculatorInputs, registerEnterpriseValueCalculatorResults, registerEnterpriseValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerEnterpriseValueCalculatorCalculator implements Calculator<registerEnterpriseValueCalculatorInputs, registerEnterpriseValueCalculatorResults> {
  readonly id = 'registerEnterpriseValueCalculator';
  readonly name = 'registerEnterpriseValueCalculator Calculator';
  readonly description = 'Calculate registerEnterpriseValueCalculator values';

  calculate(inputs: registerEnterpriseValueCalculatorInputs): registerEnterpriseValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerEnterpriseValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerEnterpriseValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
