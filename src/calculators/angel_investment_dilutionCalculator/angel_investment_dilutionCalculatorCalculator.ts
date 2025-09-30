import { Calculator } from '../../engines/CalculatorEngine';
import { angel_investment_dilutionCalculatorInputs, angel_investment_dilutionCalculatorResults, angel_investment_dilutionCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class angel_investment_dilutionCalculatorCalculator implements Calculator<angel_investment_dilutionCalculatorInputs, angel_investment_dilutionCalculatorResults> {
  readonly id = 'angel_investment_dilutionCalculator';
  readonly name = 'angel_investment_dilutionCalculator Calculator';
  readonly description = 'Calculate angel_investment_dilutionCalculator values';

  calculate(inputs: angel_investment_dilutionCalculatorInputs): angel_investment_dilutionCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: angel_investment_dilutionCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: angel_investment_dilutionCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
