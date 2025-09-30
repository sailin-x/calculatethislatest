import { Calculator } from '../../engines/CalculatorEngine';
import { dao_governance_token_calculatorCalculatorInputs, dao_governance_token_calculatorCalculatorResults, dao_governance_token_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dao_governance_token_calculatorCalculatorCalculator implements Calculator<dao_governance_token_calculatorCalculatorInputs, dao_governance_token_calculatorCalculatorResults> {
  readonly id = 'dao_governance_token_calculatorCalculator';
  readonly name = 'dao_governance_token_calculatorCalculator Calculator';
  readonly description = 'Calculate dao_governance_token_calculatorCalculator values';

  calculate(inputs: dao_governance_token_calculatorCalculatorInputs): dao_governance_token_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dao_governance_token_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dao_governance_token_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
