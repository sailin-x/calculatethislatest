import { ValidationRule, ValidationRuleFactory } from './validation';

/**
 * Business-specific validation rules for different calculator domains
 */
export class BusinessValidation {
  
  // FINANCIAL VALIDATION RULES
  
  /**
   * Validate loan-to-value ratio for mortgages
   */
  static loanToValue(
    loanAmountField: string, 
    homeValueField: string, 
    maxLTV: number = 0.95,
    loanType?: string
  ): ValidationRule {
    return ValidationRuleFactory.businessRule(
      loanAmountField,
      (loanAmount, allInputs) => {
        if (!allInputs) return true;
        const homeValue = allInputs?.[homeValueField];
        const type = loanType || allInputs?.loanType;
        
        if (!homeValue || homeValue <= 0) return true;
        
        const ltv = loanAmount / homeValue;
        
        // Different LTV limits by loan type
        let limit = maxLTV;
        if (type === 'fha') limit = 0.965; // FHA allows up to 96.5%
        if (type === 'va') limit = 1.0;    // VA allows 100%
        if (type === 'conventional') limit = 0.95;
        if (type === 'jumbo') limit = 0.80; // Jumbo typically requires 20% down
        
        return ltv <= limit;
      },
      `Loan amount exceeds maximum ${maxLTV * 100}% loan-to-value ratio for this loan type`
    );
  }

  /**
   * Validate debt-to-income ratio
   */
  static debtToIncome(
    monthlyDebtField: string, 
    monthlyIncomeField: string, 
    maxDTI: number = 0.43
  ): ValidationRule {
    return ValidationRuleFactory.businessRule(
      monthlyDebtField,
      (monthlyDebt, allInputs) => {
        if (!allInputs) return true;
        const monthlyIncome = allInputs?.[monthlyIncomeField];
        
        if (!monthlyIncome || monthlyIncome <= 0) return true;
        
        const dti = monthlyDebt / monthlyIncome;
        return dti <= maxDTI;
      },
      `Debt-to-income ratio cannot exceed ${maxDTI * 100}%`
    );
  }

  /**
   * Validate credit score ranges
   */
  static creditScore(field: string): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      300,
      850,
      'Credit score must be between 300 and 850'
    );
  }

  /**
   * Validate interest rate reasonableness
   */
  static interestRate(field: string, min: number = 0.1, max: number = 30): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      min,
      max,
      `Interest rate must be between ${min}% and ${max}%`
    );
  }

  /**
   * Validate loan term reasonableness
   */
  static loanTerm(field: string, minYears: number = 1, maxYears: number = 50): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      minYears,
      maxYears,
      `Loan term must be between ${minYears} and ${maxYears} years`
    );
  }

  /**
   * Validate down payment requirements
   */
  static downPayment(
    downPaymentField: string,
    homePriceField: string,
    loanTypeField?: string
  ): ValidationRule {
    return ValidationRuleFactory.businessRule(
      downPaymentField,
      (downPayment, allInputs) => {
        if (!allInputs) return true;
        const homePrice = allInputs?.[homePriceField];
        const loanType = loanTypeField ? allInputs?.[loanTypeField] : 'conventional';
        
        if (!homePrice || homePrice <= 0) return true;
        
        const downPaymentPercent = downPayment / homePrice;
        
        // Minimum down payment by loan type
        let minDown = 0.20; // Default 20%
        if (loanType === 'fha') minDown = 0.035; // FHA 3.5%
        if (loanType === 'va') minDown = 0.0;    // VA 0%
        if (loanType === 'usda') minDown = 0.0;  // USDA 0%
        if (loanType === 'conventional') minDown = 0.03; // Conventional 3%
        
        return downPaymentPercent >= minDown;
      },
      'Down payment does not meet minimum requirements for this loan type'
    );
  }

  // HEALTH & FITNESS VALIDATION RULES

  /**
   * Validate age for health calculations
   */
  static age(field: string, min: number = 0, max: number = 120): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      min,
      max,
      `Age must be between ${min} and ${max} years`
    );
  }

  /**
   * Validate weight in pounds or kilograms
   */
  static weight(field: string, unit: 'lbs' | 'kg' = 'lbs'): ValidationRule {
    const min = unit === 'lbs' ? 50 : 23;  // 50 lbs or 23 kg
    const max = unit === 'lbs' ? 1000 : 454; // 1000 lbs or 454 kg
    
    return ValidationRuleFactory.range(
      field,
      min,
      max,
      `Weight must be between ${min} and ${max} ${unit}`
    );
  }

  /**
   * Validate height in inches or centimeters
   */
  static height(field: string, unit: 'inches' | 'cm' = 'inches'): ValidationRule {
    const min = unit === 'inches' ? 24 : 61;   // 24 inches or 61 cm
    const max = unit === 'inches' ? 96 : 244;  // 96 inches or 244 cm
    
    return ValidationRuleFactory.range(
      field,
      min,
      max,
      `Height must be between ${min} and ${max} ${unit}`
    );
  }

  /**
   * Validate body fat percentage
   */
  static bodyFatPercentage(field: string, genderField?: string): ValidationRule {
    return ValidationRuleFactory.businessRule(
      field,
      (bodyFat, allInputs) => {
        const gender = genderField ? allInputs?.[genderField] : null;
        
        // Different ranges for men and women
        let min = 2;
        let max = 50;
        
        if (gender === 'male') {
          min = 2;
          max = 35;
        } else if (gender === 'female') {
          min = 10;
          max = 45;
        }
        
        return bodyFat >= min && bodyFat <= max;
      },
      'Body fat percentage is outside normal range'
    );
  }

  // BUSINESS VALIDATION RULES

  /**
   * Validate revenue growth rate
   */
  static revenueGrowthRate(field: string): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      -100,
      1000,
      'Revenue growth rate must be between -100% and 1000%'
    );
  }

  /**
   * Validate profit margin
   */
  static profitMargin(field: string): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      -100,
      100,
      'Profit margin must be between -100% and 100%'
    );
  }

  /**
   * Validate customer acquisition cost vs lifetime value
   */
  static cacToLtvRatio(
    cacField: string,
    ltvField: string,
    maxRatio: number = 0.33
  ): ValidationRule {
    return ValidationRuleFactory.businessRule(
      cacField,
      (cac, allInputs) => {
        if (!allInputs) return true;
        const ltv = allInputs?.[ltvField];
        
        if (!ltv || ltv <= 0) return true;
        
        const ratio = cac / ltv;
        return ratio <= maxRatio;
      },
      `Customer acquisition cost should not exceed ${maxRatio * 100}% of lifetime value`
    );
  }

  // CONSTRUCTION VALIDATION RULES

  /**
   * Validate material quantities
   */
  static materialQuantity(field: string, unit: string): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      0.01,
      1000000,
      `${unit} quantity must be greater than 0`
    );
  }

  /**
   * Validate construction area
   */
  static constructionArea(field: string, unit: 'sqft' | 'sqm' = 'sqft'): ValidationRule {
    const max = unit === 'sqft' ? 1000000 : 92903; // 1M sqft or ~93K sqm
    
    return ValidationRuleFactory.range(
      field,
      1,
      max,
      `Area must be between 1 and ${max.toLocaleString()} ${unit}`
    );
  }

  // LEGAL VALIDATION RULES

  /**
   * Validate settlement amounts
   */
  static settlementAmount(field: string): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      0,
      100000000, // $100M max
      'Settlement amount must be between $0 and $100,000,000'
    );
  }

  /**
   * Validate injury severity multiplier
   */
  static injurySeverityMultiplier(field: string): ValidationRule {
    return ValidationRuleFactory.range(
      field,
      1,
      10,
      'Injury severity multiplier must be between 1 and 10'
    );
  }

  // CROSS-FIELD VALIDATION HELPERS

  /**
   * Ensure start date is before end date
   */
  static dateRange(startDateField: string, endDateField: string): ValidationRule {
    return ValidationRuleFactory.crossField(
      endDateField,
      startDateField,
      (endDate, startDate) => {
        if (!startDate || !endDate) return true;
        return new Date(endDate) > new Date(startDate);
      },
      'End date must be after start date'
    );
  }

  /**
   * Ensure maximum value is greater than minimum value
   */
  static minMaxRange(minField: string, maxField: string): ValidationRule {
    return ValidationRuleFactory.crossField(
      maxField,
      minField,
      (maxValue, minValue) => {
        if (minValue === undefined || maxValue === undefined) return true;
        return maxValue > minValue;
      },
      'Maximum value must be greater than minimum value'
    );
  }
}