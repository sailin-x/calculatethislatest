import { Calculator } from '../../engines/CalculatorEngine';
import { AiopsImplementationSavings-calculatorInputs, AiopsImplementationSavings-calculatorResults, AiopsImplementationSavings-calculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class AiopsImplementationSavings-calculator implements Calculator<AiopsImplementationSavings-calculatorInputs, AiopsImplementationSavings-calculatorResults> {
  readonly id = 'AiopsImplementationSavings-calculator';
  readonly name = 'aiops implementation savings calculator Calculator';
  readonly description = 'Calculate aiops implementation savings calculator values';

  calculate(inputs: AiopsImplementationSavings-calculatorInputs): AiopsImplementationSavings-calculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: AiopsImplementationSavings-calculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: AiopsImplementationSavings-calculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
