import { Calculator } from '../../engines/CalculatorEngine';
import { non_compete_agreement_buyout_calculatorCalculatorInputs, non_compete_agreement_buyout_calculatorCalculatorResults, non_compete_agreement_buyout_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class non_compete_agreement_buyout_calculatorCalculatorCalculator implements Calculator<non_compete_agreement_buyout_calculatorCalculatorInputs, non_compete_agreement_buyout_calculatorCalculatorResults> {
  readonly id = 'non_compete_agreement_buyout_calculatorCalculator';
  readonly name = 'non_compete_agreement_buyout_calculatorCalculator Calculator';
  readonly description = 'Calculate non_compete_agreement_buyout_calculatorCalculator values';

  calculate(inputs: non_compete_agreement_buyout_calculatorCalculatorInputs): non_compete_agreement_buyout_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: non_compete_agreement_buyout_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: non_compete_agreement_buyout_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
