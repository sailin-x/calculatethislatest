import { Calculator } from '../../engines/CalculatorEngine';
import { it_outsourcing_vs_in_house_calculatorCalculatorInputs, it_outsourcing_vs_in_house_calculatorCalculatorResults, it_outsourcing_vs_in_house_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class it_outsourcing_vs_in_house_calculatorCalculatorCalculator implements Calculator<it_outsourcing_vs_in_house_calculatorCalculatorInputs, it_outsourcing_vs_in_house_calculatorCalculatorResults> {
  readonly id = 'it_outsourcing_vs_in_house_calculatorCalculator';
  readonly name = 'it_outsourcing_vs_in_house_calculatorCalculator Calculator';
  readonly description = 'Calculate it_outsourcing_vs_in_house_calculatorCalculator values';

  calculate(inputs: it_outsourcing_vs_in_house_calculatorCalculatorInputs): it_outsourcing_vs_in_house_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: it_outsourcing_vs_in_house_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: it_outsourcing_vs_in_house_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
