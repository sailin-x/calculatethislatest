import { Calculator } from '../../engines/CalculatorEngine';
import { realEstateDevelopmentProFormaCalculatorInputs, realEstateDevelopmentProFormaCalculatorResults, realEstateDevelopmentProFormaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class realEstateDevelopmentProFormaCalculatorCalculator implements Calculator<realEstateDevelopmentProFormaCalculatorInputs, realEstateDevelopmentProFormaCalculatorResults> {
  readonly id = 'realEstateDevelopmentProFormaCalculator';
  readonly name = 'realEstateDevelopmentProFormaCalculator Calculator';
  readonly description = 'Calculate realEstateDevelopmentProFormaCalculator values';

  calculate(inputs: realEstateDevelopmentProFormaCalculatorInputs): realEstateDevelopmentProFormaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: realEstateDevelopmentProFormaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: realEstateDevelopmentProFormaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
