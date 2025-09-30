import { Calculator } from '../../engines/CalculatorEngine';
import { mega_backdoor_roth_calculatorCalculatorInputs, mega_backdoor_roth_calculatorCalculatorResults, mega_backdoor_roth_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mega_backdoor_roth_calculatorCalculatorCalculator implements Calculator<mega_backdoor_roth_calculatorCalculatorInputs, mega_backdoor_roth_calculatorCalculatorResults> {
  readonly id = 'mega_backdoor_roth_calculatorCalculator';
  readonly name = 'mega_backdoor_roth_calculatorCalculator Calculator';
  readonly description = 'Calculate mega_backdoor_roth_calculatorCalculator values';

  calculate(inputs: mega_backdoor_roth_calculatorCalculatorInputs): mega_backdoor_roth_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mega_backdoor_roth_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mega_backdoor_roth_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
