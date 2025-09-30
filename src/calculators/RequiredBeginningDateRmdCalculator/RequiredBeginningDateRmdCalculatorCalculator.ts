import { Calculator } from '../../engines/CalculatorEngine';
import { RequiredBeginningDateRmdCalculatorInputs, RequiredBeginningDateRmdCalculatorResults, RequiredBeginningDateRmdCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class RequiredBeginningDateRmdCalculatorCalculator implements Calculator<RequiredBeginningDateRmdCalculatorInputs, RequiredBeginningDateRmdCalculatorResults> {
  readonly id = 'RequiredBeginningDateRmdCalculator';
  readonly name = 'RequiredBeginningDateRmdCalculator Calculator';
  readonly description = 'Calculate RequiredBeginningDateRmdCalculator values';

  calculate(inputs: RequiredBeginningDateRmdCalculatorInputs): RequiredBeginningDateRmdCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: RequiredBeginningDateRmdCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: RequiredBeginningDateRmdCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
