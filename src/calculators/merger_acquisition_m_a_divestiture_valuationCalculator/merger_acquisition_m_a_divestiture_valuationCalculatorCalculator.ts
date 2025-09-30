import { Calculator } from '../../engines/CalculatorEngine';
import { merger_acquisition_m_a_divestiture_valuationCalculatorInputs, merger_acquisition_m_a_divestiture_valuationCalculatorResults, merger_acquisition_m_a_divestiture_valuationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class merger_acquisition_m_a_divestiture_valuationCalculatorCalculator implements Calculator<merger_acquisition_m_a_divestiture_valuationCalculatorInputs, merger_acquisition_m_a_divestiture_valuationCalculatorResults> {
  readonly id = 'merger_acquisition_m_a_divestiture_valuationCalculator';
  readonly name = 'merger_acquisition_m_a_divestiture_valuationCalculator Calculator';
  readonly description = 'Calculate merger_acquisition_m_a_divestiture_valuationCalculator values';

  calculate(inputs: merger_acquisition_m_a_divestiture_valuationCalculatorInputs): merger_acquisition_m_a_divestiture_valuationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: merger_acquisition_m_a_divestiture_valuationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: merger_acquisition_m_a_divestiture_valuationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
