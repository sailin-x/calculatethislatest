import { Calculator } from '../../engines/CalculatorEngine';
import { registerCostOfDebtCalculatorInputs, registerCostOfDebtCalculatorResults, registerCostOfDebtCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerCostOfDebtCalculatorCalculator implements Calculator<registerCostOfDebtCalculatorInputs, registerCostOfDebtCalculatorResults> {
  readonly id = 'registerCostOfDebtCalculator';
  readonly name = 'registerCostOfDebtCalculator Calculator';
  readonly description = 'Calculate registerCostOfDebtCalculator values';

  calculate(inputs: registerCostOfDebtCalculatorInputs): registerCostOfDebtCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerCostOfDebtCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerCostOfDebtCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
