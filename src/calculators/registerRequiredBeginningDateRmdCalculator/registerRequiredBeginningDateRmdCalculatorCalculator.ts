import { Calculator } from '../../engines/CalculatorEngine';
import { registerRequiredBeginningDateRmdCalculatorInputs, registerRequiredBeginningDateRmdCalculatorResults, registerRequiredBeginningDateRmdCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRequiredBeginningDateRmdCalculatorCalculator implements Calculator<registerRequiredBeginningDateRmdCalculatorInputs, registerRequiredBeginningDateRmdCalculatorResults> {
  readonly id = 'registerRequiredBeginningDateRmdCalculator';
  readonly name = 'registerRequiredBeginningDateRmdCalculator Calculator';
  readonly description = 'Calculate registerRequiredBeginningDateRmdCalculator values';

  calculate(inputs: registerRequiredBeginningDateRmdCalculatorInputs): registerRequiredBeginningDateRmdCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRequiredBeginningDateRmdCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRequiredBeginningDateRmdCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
