import { Calculator } from '../../engines/CalculatorEngine';
import { pensionLumpSumVsAnnuityCalculatorInputs, pensionLumpSumVsAnnuityCalculatorResults, pensionLumpSumVsAnnuityCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class pensionLumpSumVsAnnuityCalculatorCalculator implements Calculator<pensionLumpSumVsAnnuityCalculatorInputs, pensionLumpSumVsAnnuityCalculatorResults> {
  readonly id = 'pensionLumpSumVsAnnuityCalculator';
  readonly name = 'pensionLumpSumVsAnnuityCalculator Calculator';
  readonly description = 'Calculate pensionLumpSumVsAnnuityCalculator values';

  calculate(inputs: pensionLumpSumVsAnnuityCalculatorInputs): pensionLumpSumVsAnnuityCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: pensionLumpSumVsAnnuityCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: pensionLumpSumVsAnnuityCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
