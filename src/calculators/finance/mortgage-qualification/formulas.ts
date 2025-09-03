import { Formula, CalculationResult } from '../../../types/calculator';

export const mortgageQualificationFormulas: Formula[] = [
  {
    id: 'debt-to-income-calculation',
    name: 'Debt-to-Income Ratio Calculation',
    description: 'Calculate the debt-to-income ratio for mortgage qualification',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const borrowerIncome = inputs.borrowerIncome || 0;
      const coBorrowerIncome = inputs.coBorrowerIncome || 0;
      const creditCardDebt = inputs.creditCardDebt || 0;
      const autoLoanDebt = inputs.autoLoanDebt || 0;
      const studentLoanDebt = inputs.studentLoanDebt || 0;
      const otherDebt = inputs.otherDebt || 0;
      const loanAmount = inputs.loanAmount || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const propertyTaxes = inputs.propertyTaxes || 0;
      const propertyInsurance = inputs.propertyInsurance || 0;
      const hoaFees = inputs.hoaFees || 0;
      
      const totalIncome = borrowerIncome + coBorrowerIncome;
      const monthlyIncome = totalIncome / 12;
      
      // Calculate monthly mortgage payment
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        monthlyPayment = loanAmount / totalPayments;
      }
      
      // Calculate total monthly housing costs
      const monthlyPropertyTaxes = propertyTaxes / 12;
      const monthlyPropertyInsurance = propertyInsurance / 12;
      const totalHousingCosts = monthlyPayment + monthlyPropertyTaxes + monthlyPropertyInsurance + hoaFees;
      
      // Calculate total monthly debt
      const totalMonthlyDebt = totalHousingCosts + creditCardDebt + autoLoanDebt + studentLoanDebt + otherDebt;
      
      // Calculate DTI ratio
      const debtToIncomeRatio = monthlyIncome > 0 ? (totalMonthlyDebt / monthlyIncome) * 100 : 0;
      
      return {
        outputs: { debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10 },
        explanation: `Debt-to-Income ratio: ${debtToIncomeRatio.toFixed(1)}%`,
        intermediateSteps: { 
          monthlyIncome: Math.round(monthlyIncome),
          totalMonthlyDebt: Math.round(totalMonthlyDebt),
          totalHousingCosts: Math.round(totalHousingCosts)
        }
      };
    }
  },
  
  {
    id: 'housing-expense-ratio-calculation',
    name: 'Housing Expense Ratio Calculation',
    description: 'Calculate the housing expense ratio for mortgage qualification',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const borrowerIncome = inputs.borrowerIncome || 0;
      const coBorrowerIncome = inputs.coBorrowerIncome || 0;
      const loanAmount = inputs.loanAmount || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const propertyTaxes = inputs.propertyTaxes || 0;
      const propertyInsurance = inputs.propertyInsurance || 0;
      const hoaFees = inputs.hoaFees || 0;
      
      const totalIncome = borrowerIncome + coBorrowerIncome;
      const monthlyIncome = totalIncome / 12;
      
      // Calculate monthly mortgage payment
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        monthlyPayment = loanAmount / totalPayments;
      }
      
      // Calculate total monthly housing costs
      const monthlyPropertyTaxes = propertyTaxes / 12;
      const monthlyPropertyInsurance = propertyInsurance / 12;
      const totalHousingCosts = monthlyPayment + monthlyPropertyTaxes + monthlyPropertyInsurance + hoaFees;
      
      // Calculate housing expense ratio
      const housingExpenseRatio = monthlyIncome > 0 ? (totalHousingCosts / monthlyIncome) * 100 : 0;
      
      return {
        outputs: { housingExpenseRatio: Math.round(housingExpenseRatio * 10) / 10 },
        explanation: `Housing expense ratio: ${housingExpenseRatio.toFixed(1)}%`,
        intermediateSteps: { 
          monthlyIncome: Math.round(monthlyIncome),
          totalHousingCosts: Math.round(totalHousingCosts),
          monthlyPayment: Math.round(monthlyPayment)
        }
      };
    }
  },
  
  {
    id: 'qualification-status-determination',
    name: 'Qualification Status Determination',
    description: 'Determine mortgage qualification status based on ratios and credit scores',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const borrowerCreditScore = inputs.borrowerCreditScore || 0;
      const coBorrowerCreditScore = inputs.coBorrowerCreditScore || 0;
      const loanType = inputs.loanType || 'conventional';
      
      // Get qualification thresholds based on loan type
      const minCreditScore = loanType === 'fha' ? 580 : loanType === 'va' ? 620 : 620;
      const maxDTI = loanType === 'fha' ? 43 : loanType === 'va' ? 41 : 43;
      const maxHousingRatio = loanType === 'fha' ? 31 : loanType === 'va' ? 29 : 28;
      
      // Use the lower credit score if co-borrower exists
      const creditScore = Math.min(borrowerCreditScore, coBorrowerCreditScore || 999);
      
      let qualificationStatus = 'Qualified';
      
      if (creditScore < minCreditScore) {
        qualificationStatus = 'Credit Score Too Low';
      } else if (creditScore < 700) {
        qualificationStatus = 'Qualified with Conditions';
      } else if (creditScore >= 760) {
        qualificationStatus = 'Well Qualified';
      }
      
      return {
        outputs: { qualificationStatus },
        explanation: `Qualification status: ${qualificationStatus}`,
        intermediateSteps: { 
          creditScore,
          minCreditScore,
          maxDTI,
          maxHousingRatio
        }
      };
    }
  },
  
  {
    id: 'maximum-loan-amount-calculation',
    name: 'Maximum Loan Amount Calculation',
    description: 'Calculate the maximum loan amount based on income and debt ratios',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const borrowerIncome = inputs.borrowerIncome || 0;
      const coBorrowerIncome = inputs.coBorrowerIncome || 0;
      const creditCardDebt = inputs.creditCardDebt || 0;
      const autoLoanDebt = inputs.autoLoanDebt || 0;
      const studentLoanDebt = inputs.studentLoanDebt || 0;
      const otherDebt = inputs.otherDebt || 0;
      const interestRate = (inputs.interestRate || 6.5) / 100;
      const loanTerm = inputs.loanTerm || 30;
      const propertyTaxes = inputs.propertyTaxes || 0;
      const propertyInsurance = inputs.propertyInsurance || 0;
      const hoaFees = inputs.hoaFees || 0;
      const loanType = inputs.loanType || 'conventional';
      
      const totalIncome = borrowerIncome + coBorrowerIncome;
      const monthlyIncome = totalIncome / 12;
      
      // Get qualification thresholds based on loan type
      const maxDTI = loanType === 'fha' ? 43 : loanType === 'va' ? 41 : 43;
      const maxHousingRatio = loanType === 'fha' ? 31 : loanType === 'va' ? 29 : 28;
      
      // Calculate maximum total debt payment
      const maxTotalDebt = monthlyIncome * (maxDTI / 100);
      const maxHousingDebt = monthlyIncome * (maxHousingRatio / 100);
      
      // Calculate other monthly debt
      const otherMonthlyDebt = creditCardDebt + autoLoanDebt + studentLoanDebt + otherDebt;
      
      // Calculate available for housing
      const availableForHousing = Math.min(maxTotalDebt - otherMonthlyDebt, maxHousingDebt);
      const monthlyHousingCosts = (propertyTaxes / 12) + (propertyInsurance / 12) + hoaFees;
      const availableForMortgage = availableForHousing - monthlyHousingCosts;
      
      if (availableForMortgage <= 0) {
        return {
          outputs: { maxLoanAmount: 0 },
          explanation: 'No loan amount available based on current income and debt',
          intermediateSteps: { 
            availableForHousing: Math.round(availableForHousing),
            monthlyHousingCosts: Math.round(monthlyHousingCosts)
          }
        };
      }
      
      // Calculate maximum loan amount
      const monthlyRate = interestRate / 12;
      const totalPayments = loanTerm * 12;
      
      let maxLoanAmount = 0;
      if (monthlyRate > 0) {
        maxLoanAmount = availableForMortgage * ((Math.pow(1 + monthlyRate, totalPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)));
      } else {
        maxLoanAmount = availableForMortgage * totalPayments;
      }
      
      return {
        outputs: { maxLoanAmount: Math.round(maxLoanAmount) },
        explanation: `Maximum loan amount: $${maxLoanAmount.toLocaleString()}`,
        intermediateSteps: { 
          availableForHousing: Math.round(availableForHousing),
          availableForMortgage: Math.round(availableForMortgage),
          maxTotalDebt: Math.round(maxTotalDebt)
        }
      };
    }
  },
  
  {
    id: 'income-analysis',
    name: 'Income Analysis',
    description: 'Analyze borrower income for qualification purposes',
    calculate: (inputs: Record<string, any>): CalculationResult => {
      const borrowerIncome = inputs.borrowerIncome || 0;
      const coBorrowerIncome = inputs.coBorrowerIncome || 0;
      const borrowerEmploymentType = inputs.borrowerEmploymentType || 'employed';
      const borrowerEmploymentLength = inputs.borrowerEmploymentLength || 0;
      
      const totalIncome = borrowerIncome + coBorrowerIncome;
      const monthlyIncome = totalIncome / 12;
      
      // Assess income stability
      let incomeStability = 'Good';
      if (borrowerEmploymentType === 'unemployed') {
        incomeStability = 'Poor';
      } else if (borrowerEmploymentType === 'self_employed' && borrowerEmploymentLength < 2) {
        incomeStability = 'Fair';
      } else if (borrowerEmploymentLength < 1) {
        incomeStability = 'Fair';
      }
      
      // Assess income level
      let incomeLevel = 'Adequate';
      if (totalIncome >= 100000) {
        incomeLevel = 'High';
      } else if (totalIncome < 50000) {
        incomeLevel = 'Low';
      }
      
      return {
        outputs: { 
          totalIncome: Math.round(totalIncome),
          monthlyIncome: Math.round(monthlyIncome),
          incomeStability,
          incomeLevel
        },
        explanation: `Total annual income: $${totalIncome.toLocaleString()}. Stability: ${incomeStability}.`,
        intermediateSteps: { 
          borrowerEmploymentType,
          borrowerEmploymentLength
        }
      };
    }
  }
];