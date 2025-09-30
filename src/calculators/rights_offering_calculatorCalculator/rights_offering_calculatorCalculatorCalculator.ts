import { Calculator } from '../../engines/CalculatorEngine';
import { rights_offering_calculatorCalculatorInputs, rights_offering_calculatorCalculatorResults, rights_offering_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rights_offering_calculatorCalculatorCalculator implements Calculator<rights_offering_calculatorCalculatorInputs, rights_offering_calculatorCalculatorResults> {
  readonly id = 'rights_offering_calculatorCalculator';
  readonly name = 'rights_offering_calculatorCalculator Calculator';
  readonly description = 'Calculate rights_offering_calculatorCalculator values';

  calculate(inputs: rights_offering_calculatorCalculatorInputs): rights_offering_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rights_offering_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rights_offering_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
