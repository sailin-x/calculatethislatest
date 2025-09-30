import { Calculator } from '../../engines/CalculatorEngine';
import { actuarial_mortality_table_calculatorCalculatorInputs, actuarial_mortality_table_calculatorCalculatorResults, actuarial_mortality_table_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class actuarial_mortality_table_calculatorCalculatorCalculator implements Calculator<actuarial_mortality_table_calculatorCalculatorInputs, actuarial_mortality_table_calculatorCalculatorResults> {
  readonly id = 'actuarial_mortality_table_calculatorCalculator';
  readonly name = 'actuarial_mortality_table_calculatorCalculator Calculator';
  readonly description = 'Calculate actuarial_mortality_table_calculatorCalculator values';

  calculate(inputs: actuarial_mortality_table_calculatorCalculatorInputs): actuarial_mortality_table_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: actuarial_mortality_table_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: actuarial_mortality_table_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
