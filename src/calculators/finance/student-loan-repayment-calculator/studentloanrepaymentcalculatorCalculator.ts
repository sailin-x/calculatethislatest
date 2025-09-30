import { Calculator } from '../../engines/CalculatorEngine';
import { studentloanrepaymentcalculatorCalculatorInputs, studentloanrepaymentcalculatorCalculatorOutputs } from './types';
import { calculatestudentloanrepaymentcalculatorCalculatorResults } from './formulas';
import { validatestudentloanrepaymentcalculatorCalculatorInputs } from './validation';

export class studentloanrepaymentcalculatorCalculator implements Calculator<
  studentloanrepaymentcalculatorCalculatorInputs,
  studentloanrepaymentcalculatorCalculatorOutputs
> {
  readonly id = 'student_loan_repayment_calculator_calculator';
  readonly name = 'student loan repayment calculator Calculator';
  readonly description = 'Professional student loan repayment calculator calculator with domain-specific functionality';

  calculate(inputs: studentloanrepaymentcalculatorCalculatorInputs): studentloanrepaymentcalculatorCalculatorOutputs {
    const validation = validatestudentloanrepaymentcalculatorCalculatorInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    return calculatestudentloanrepaymentcalculatorCalculatorResults(inputs);
  }

  validateInputs(inputs: studentloanrepaymentcalculatorCalculatorInputs): boolean {
    const validation = validatestudentloanrepaymentcalculatorCalculatorInputs(inputs);
    return validation.isValid;
  }
}
