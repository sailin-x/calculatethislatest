/**
 * Centralized validation messages with contextual help
 */
export class ValidationMessages {
  
  // FINANCIAL MESSAGES
  static readonly FINANCIAL = {
    LOAN_TO_VALUE_EXCEEDED: (maxLTV: number, loanType: string) => ({
      message: `Loan amount exceeds ${maxLTV}% loan-to-value limit for ${loanType} loans`,
      help: `Consider increasing your down payment or choosing a different loan type. ${loanType === 'conventional' ? 'FHA loans allow up to 96.5% LTV.' : ''}`
    }),
    
    DEBT_TO_INCOME_HIGH: (dti: number, maxDTI: number) => ({
      message: `Debt-to-income ratio of ${dti.toFixed(1)}% exceeds ${maxDTI}% limit`,
      help: 'Consider paying down existing debts or increasing your income before applying for this loan.'
    }),
    
    INTEREST_RATE_UNREALISTIC: (rate: number) => ({
      message: `Interest rate of ${rate}% seems unrealistic`,
      help: 'Current mortgage rates typically range from 3% to 8%. Please verify this rate with your lender.'
    }),
    
    DOWN_PAYMENT_INSUFFICIENT: (loanType: string, minRequired: number) => ({
      message: `Down payment is below minimum requirement for ${loanType} loans`,
      help: `${loanType} loans require at least ${minRequired}% down payment. Consider saving more or exploring other loan options.`
    }),
    
    CREDIT_SCORE_LOW: (score: number) => ({
      message: `Credit score of ${score} may not qualify for best rates`,
      help: 'Consider improving your credit score before applying. Scores above 740 typically get the best rates.'
    })
  };

  // HEALTH & FITNESS MESSAGES
  static readonly HEALTH = {
    BMI_UNDERWEIGHT: (bmi: number) => ({
      message: `BMI of ${bmi.toFixed(1)} indicates underweight`,
      help: 'Consider consulting with a healthcare provider about healthy weight gain strategies.'
    }),
    
    BMI_OVERWEIGHT: (bmi: number) => ({
      message: `BMI of ${bmi.toFixed(1)} indicates overweight`,
      help: 'Consider consulting with a healthcare provider about healthy weight management strategies.'
    }),
    
    BMI_OBESE: (bmi: number) => ({
      message: `BMI of ${bmi.toFixed(1)} indicates obesity`,
      help: 'Please consult with a healthcare provider for personalized weight management guidance.'
    }),
    
    BODY_FAT_HIGH: (bodyFat: number, gender: string) => ({
      message: `Body fat percentage of ${bodyFat}% is above healthy range for ${gender}s`,
      help: `Healthy body fat ranges: Men 10-20%, Women 16-25%. Consider consulting a fitness professional.`
    }),
    
    CALORIE_DEFICIT_EXTREME: (deficit: number) => ({
      message: `Calorie deficit of ${Math.abs(deficit)} calories is too extreme`,
      help: 'Safe weight loss is 1-2 pounds per week (500-1000 calorie deficit). Extreme deficits can be harmful.'
    })
  };

  // BUSINESS MESSAGES
  static readonly BUSINESS = {
    CAC_TOO_HIGH: (cac: number, ltv: number, ratio: number) => ({
      message: `CAC of $${cac} is ${ratio.toFixed(1)}% of LTV ($${ltv})`,
      help: 'Customer Acquisition Cost should typically be less than 33% of Customer Lifetime Value for sustainable growth.'
    }),
    
    CHURN_RATE_HIGH: (churnRate: number) => ({
      message: `Monthly churn rate of ${churnRate}% is concerning`,
      help: 'Monthly churn above 5% indicates serious retention issues. Focus on customer success and product improvements.'
    }),
    
    BURN_RATE_HIGH: (burnRate: number, runway: number) => ({
      message: `Current burn rate gives only ${runway} months of runway`,
      help: 'Consider reducing expenses or raising additional funding. Most startups need 12-18 months of runway.'
    }),
    
    VALUATION_UNREALISTIC: (valuation: number, revenue: number) => ({
      message: `Valuation of $${valuation.toLocaleString()} seems high for $${revenue.toLocaleString()} revenue`,
      help: 'SaaS companies typically trade at 5-15x revenue multiples depending on growth and margins.'
    })
  };

  // CONSTRUCTION MESSAGES
  static readonly CONSTRUCTION = {
    MATERIAL_WASTE_HIGH: (wastePercent: number) => ({
      message: `Material waste of ${wastePercent}% is higher than typical`,
      help: 'Standard waste factors: Lumber 10%, Concrete 5%, Drywall 15%. High waste may indicate planning issues.'
    }),
    
    COST_PER_SQFT_HIGH: (cost: number, area: number, costPerSqft: number) => ({
      message: `Cost of $${costPerSqft}/sqft is above market average`,
      help: 'Typical construction costs: Basic $100-150/sqft, Mid-range $150-250/sqft, High-end $250+/sqft.'
    }),
    
    LOAD_CAPACITY_EXCEEDED: (load: number, capacity: number) => ({
      message: `Load of ${load} lbs exceeds capacity of ${capacity} lbs`,
      help: 'This exceeds safe load limits. Consult a structural engineer before proceeding.'
    })
  };

  // LEGAL MESSAGES
  static readonly LEGAL = {
    SETTLEMENT_LOW: (settlement: number, damages: number) => ({
      message: `Settlement of $${settlement.toLocaleString()} may be below fair value`,
      help: 'Consider all factors: medical costs, lost wages, pain/suffering, and jurisdiction multipliers.'
    }),
    
    STATUTE_OF_LIMITATIONS: (timeElapsed: number, limit: number) => ({
      message: `${timeElapsed} years have passed (limit: ${limit} years)`,
      help: 'Statute of limitations may have expired. Consult with an attorney immediately.'
    }),
    
    COMPARATIVE_NEGLIGENCE: (percentage: number) => ({
      message: `${percentage}% comparative negligence significantly reduces settlement`,
      help: 'In comparative negligence states, your settlement is reduced by your percentage of fault.'
    })
  };

  // GENERAL VALIDATION HELPERS
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  static formatPercentage(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
  }

  static getContextualHelp(field: string, value: any, calculatorType: string): string | null {
    // Return contextual help based on field name and calculator type
    const helpMap: Record<string, Record<string, string>> = {
      mortgage: {
        creditScore: 'Higher credit scores (740+) qualify for better interest rates',
        downPayment: 'Larger down payments reduce monthly payments and eliminate PMI',
        loanTerm: 'Shorter terms have higher payments but less total interest'
      },
      investment: {
        riskTolerance: 'Conservative: 20-40% stocks, Moderate: 40-70% stocks, Aggressive: 70-100% stocks',
        timeHorizon: 'Longer time horizons allow for more aggressive investments',
        expectedReturn: 'Historical stock market average is ~10% annually before inflation'
      },
      health: {
        activityLevel: 'Sedentary: desk job, Light: 1-3 days/week exercise, Moderate: 3-5 days/week',
        bodyFat: 'Essential fat: Men 2-5%, Women 10-13%. Athletes: Men 6-13%, Women 14-20%'
      }
    };

    return helpMap[calculatorType]?.[field] || null;
  }
}