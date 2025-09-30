import { Calculator } from '../../engines/CalculatorEngine';
import { carried_interest_waterfall_model_calculatorCalculatorInputs, carried_interest_waterfall_model_calculatorCalculatorResults, carried_interest_waterfall_model_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class carried_interest_waterfall_model_calculatorCalculatorCalculator implements Calculator<carried_interest_waterfall_model_calculatorCalculatorInputs, carried_interest_waterfall_model_calculatorCalculatorResults> {
  readonly id = 'carried_interest_waterfall_model_calculatorCalculator';
  readonly name = 'carried_interest_waterfall_model_calculatorCalculator Calculator';
  readonly description = 'Calculate carried_interest_waterfall_model_calculatorCalculator values';

  calculate(inputs: carried_interest_waterfall_model_calculatorCalculatorInputs): carried_interest_waterfall_model_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: carried_interest_waterfall_model_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: carried_interest_waterfall_model_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
