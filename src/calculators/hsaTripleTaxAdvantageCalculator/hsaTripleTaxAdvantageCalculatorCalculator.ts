import { Calculator } from '../../engines/CalculatorEngine';
import { hsaTripleTaxAdvantageCalculatorInputs, hsaTripleTaxAdvantageCalculatorResults, hsaTripleTaxAdvantageCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class hsaTripleTaxAdvantageCalculatorCalculator implements Calculator<hsaTripleTaxAdvantageCalculatorInputs, hsaTripleTaxAdvantageCalculatorResults> {
  readonly id = 'hsaTripleTaxAdvantageCalculator';
  readonly name = 'hsaTripleTaxAdvantageCalculator Calculator';
  readonly description = 'Calculate hsaTripleTaxAdvantageCalculator values';

  calculate(inputs: hsaTripleTaxAdvantageCalculatorInputs): hsaTripleTaxAdvantageCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: hsaTripleTaxAdvantageCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: hsaTripleTaxAdvantageCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
