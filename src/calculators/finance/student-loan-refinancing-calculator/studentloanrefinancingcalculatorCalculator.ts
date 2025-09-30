import { Calculator } from '../../engines/CalculatorEngine';
import { studentloanrefinancingcalculatorCalculatorInputs, studentloanrefinancingcalculatorCalculatorOutputs } from './types';
import { calculatestudentloanrefinancingcalculatorCalculatorResults } from './formulas';
import { validatestudentloanrefinancingcalculatorCalculatorInputs } from './validation';

export class studentloanrefinancingcalculatorCalculator implements Calculator<
  studentloanrefinancingcalculatorCalculatorInputs,
  studentloanrefinancingcalculatorCalculatorOutputs
> {
  readonly id = 'student_loan_refinancing_calculator_calculator';
  readonly name = 'student loan refinancing calculator Calculator';
  readonly description = 'Professional student loan refinancing calculator calculator with domain-specific functionality';

  calculate(inputs: studentloanrefinancingcalculatorCalculatorInputs): studentloanrefinancingcalculatorCalculatorOutputs {
    const validation = validatestudentloanrefinancingcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestudentloanrefinancingcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: studentloanrefinancingcalculatorCalculatorInputs): boolean {
    const validation = validatestudentloanrefinancingcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
