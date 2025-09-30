import { Calculator } from '../../engines/CalculatorEngine';
import { registerRealEstateDevelopmentProFormaCalculatorInputs, registerRealEstateDevelopmentProFormaCalculatorResults, registerRealEstateDevelopmentProFormaCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRealEstateDevelopmentProFormaCalculatorCalculator implements Calculator<registerRealEstateDevelopmentProFormaCalculatorInputs, registerRealEstateDevelopmentProFormaCalculatorResults> {
  readonly id = 'registerRealEstateDevelopmentProFormaCalculator';
  readonly name = 'registerRealEstateDevelopmentProFormaCalculator Calculator';
  readonly description = 'Calculate registerRealEstateDevelopmentProFormaCalculator values';

  calculate(inputs: registerRealEstateDevelopmentProFormaCalculatorInputs): registerRealEstateDevelopmentProFormaCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRealEstateDevelopmentProFormaCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRealEstateDevelopmentProFormaCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
