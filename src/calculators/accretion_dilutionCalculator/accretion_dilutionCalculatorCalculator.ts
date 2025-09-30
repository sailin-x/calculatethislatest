import { Calculator } from '../../engines/CalculatorEngine';
import { accretion_dilutionCalculatorInputs, accretion_dilutionCalculatorResults, accretion_dilutionCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class accretion_dilutionCalculatorCalculator implements Calculator<accretion_dilutionCalculatorInputs, accretion_dilutionCalculatorResults> {
  readonly id = 'accretion_dilutionCalculator';
  readonly name = 'accretion_dilutionCalculator Calculator';
  readonly description = 'Calculate accretion_dilutionCalculator values';

  calculate(inputs: accretion_dilutionCalculatorInputs): accretion_dilutionCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: accretion_dilutionCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: accretion_dilutionCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
