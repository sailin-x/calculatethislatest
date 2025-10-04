```typescript
import { RBDforRMDsCalculatorInputs, RBDforRMDsCalculatorMetrics, RBDforRMDsCalculatorAnalysis } from './types';

/**
 * Calculates the first Required Minimum Distribution (RMD) year based on the birth date
 * and applicable IRS rules, including historical changes from 70.5 to 72, 73, and 75.
 * @param birthDate The individual's birth date.
 * @returns The calendar year in which the first RMD is required.
 */
function getFirstRMDYear(birthDate: Date): number {
  // Calculate attainment of age 70.5
  const attainmentDate70_5 = new Date(birthDate);
  attainmentDate70_5.setFullYear(birthDate.getFullYear() + 70);
  attainmentDate70_5.setMonth(birthDate.getMonth() + 6);
  if (attainmentDate70_5.getTime() < new Date(2020, 0, 1).getTime()) {
    return attainmentDate70_5.getFullYear();
  }

  // Calculate attainment of age 72
  const attainmentDate72 = new Date(birthDate);
  attainmentDate72.setFullYear(birthDate.getFullYear() + 72);
  if (attainmentDate72.getTime() < new Date(2023, 0, 1).getTime()) {
    return attainmentDate72.getFullYear();
  }

  // Check for age 74 attainment to determine 73 vs 75
  const attainmentDate74 = new Date(birthDate);
  attainmentDate74.setFullYear(birthDate.getFullYear() + 74);
  if (attainmentDate74.getTime() < new Date(2033, 0, 1).getTime()) {
    // Age 73 applies
    const attainmentDate73 = new Date(birthDate);
    attainmentDate73.setFullYear(birthDate.getFullYear() + 73);
    return attainmentDate73.getFullYear();
  } else {
    // Age 75 applies
    const attainmentDate75 = new Date(birthDate);
    attainmentDate75.setFullYear(birthDate.getFullYear() + 75);
    return attainmentDate75.getFullYear();
  }
}

export function calculateResult(inputs: RBDforRMDsCalculatorInputs): number {
  const { birthDate, accountType, isStillEmployed = false, isFivePercentOwner = false, retirementDate } = inputs;

  const rmdYear = getFirstRMDYear(birthDate);

  let effectiveRMDYear = rmdYear;

  // For qualified plans (non-IRA), apply delay if still employed and not a 5% owner
  if (accountType !== 'IRA' && isStillEmployed && !isFivePercentOwner) {
    if (retirementDate) {
      const retirementYear = retirementDate.getFullYear();
      effectiveRMDYear = Math.max(rmdYear, retirementYear);
    }
    // If no retirementDate provided, fall back to standard age-based year (no delay applied)
  }

  // RBD is April 1 of the year following the effective RMD year
  const rbdYear = effectiveRMDYear + 1;
  const rbdDate = new Date(rbdYear, 3, 1); // Month 3 is April (0-based indexing)

  // Ensure the date is valid (e.g., not in the past for future births, but assume valid inputs)
  return rbdDate.getTime();
}

export function generateAnalysis(
  inputs: RBDforRMDsCalculatorInputs,
  metrics: RBDforRMDsCalculatorMetrics
): RBDforRMDsCalculatorAnalysis {
  const result = metrics.result;
  const rbdDate = new Date(result);
  const formattedDate = rbdDate.toLocaleDateString();
  const now = new Date();
  const timeToRBD = rbdDate.getTime() - now.getTime();

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = `Your Required Beginning Date (RBD) for RMDs is ${formattedDate}.`;

  if (timeToRBD < 0) {
    riskLevel = 'High';
    recommendation += ' This date has passed, which may result in a 25% excise tax penalty on undistributed amounts. Consult a tax professional or financial advisor immediately to address potential non-compliance.';
  } else if (timeToRBD < 365 * 24 * 60 * 60 * 1000) { // Within approximately 1 year
    riskLevel = 'Medium';
    recommendation += ' This date is approaching within the next year. Plan to calculate and withdraw your first Required Minimum Distribution (RMD) by April 1 to avoid penalties. Consider consulting a financial advisor for personalized guidance.';
  } else {
    riskLevel = 'Low';
    recommendation += ' This date is in the future, providing ample time to prepare. Review your retirement account balances annually and consider working with a financial planner to ensure compliance with RMD rules.';
  }

  // Additional context based on inputs
  if (inputs.accountType !== 'IRA' && inputs.isStillEmployed && !inputs.isFivePercentOwner) {
    recommendation += ' Note: If this is a qualified plan and you are still employed (non-5% owner), your RBD may be delayed until after retirement. Verify with your plan administrator.';
  }

  return { recommendation, riskLevel };
}
```