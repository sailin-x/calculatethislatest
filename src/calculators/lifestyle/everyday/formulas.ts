import { Formula, CalculationResult } from '../../../types/calculator';

export interface EverydayInputs {
  calculationType: 'tip_calculator' | 'bill_splitter' | 'date_calculator' | 'age_calculator' | 'time_zone' | 'discount_calculator' | 'percentage_calculator';
  billAmount?: number;
  tipPercentage?: number;
  serviceQuality?: string;
  numberOfPeople?: number;
  splitType?: string;
  startDate?: string;
  endDate?: string;
  birthDate?: string;
  originalPrice?: number;
  discountPercentage?: number;
  salePrice?: number;
  percentageValue?: number;
  percentageOf?: number;
  roundUp?: boolean;
}

export class EverydayFormulas {
  /**
   * Calculate tip based on service quality
   */
  static calculateTip(billAmount: number, serviceQuality?: string, customPercentage?: number): {
    tipPercentage: number;
    tipAmount: number;
    totalAmount: number;
    recommendations: string[];
  } {
    let tipPercentage: number;
    const recommendations: string[] = [];

    if (customPercentage !== undefined) {
      tipPercentage = customPercentage;
    } else {
      // Standard tip percentages based on service quality
      switch (serviceQuality) {
        case 'poor':
          tipPercentage = 12;
          recommendations.push('Consider speaking with management about service issues');
          break;
        case 'average':
          tipPercentage = 16;
          recommendations.push('Standard tip for average service');
          break;
        case 'good':
          tipPercentage = 19;
          recommendations.push('Good service deserves a good tip');
          break;
        case 'excellent':
          tipPercentage = 22;
          recommendations.push('Excellent service - consider leaving a compliment too');
          break;
        default:
          tipPercentage = 18; // Default
          recommendations.push('18% is a standard tip for good service');
      }
    }

    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;

    // Add contextual recommendations
    if (billAmount > 200) {
      recommendations.push('Large bill - double-check tip calculation');
    }
    if (tipPercentage > 25) {
      recommendations.push('Very generous tip - make sure this is intentional');
    }

    return { tipPercentage, tipAmount, totalAmount, recommendations };
  }

  /**
   * Split bill among multiple people
   */
  static splitBill(billAmount: number, tipPercentage: number, numberOfPeople: number, splitType: string = 'equal', roundUp: boolean = false): {
    tipAmount: number;
    totalAmount: number;
    perPersonBill: number;
    perPersonTip: number;
    perPersonTotal: number;
    recommendations: string[];
  } {
    const tipAmount = (billAmount * tipPercentage) / 100;
    let totalAmount = billAmount + tipAmount;
    
    if (roundUp) {
      totalAmount = Math.ceil(totalAmount);
    }

    const perPersonBill = billAmount / numberOfPeople;
    const perPersonTip = tipAmount / numberOfPeople;
    const perPersonTotal = totalAmount / numberOfPeople;

    const recommendations: string[] = [];

    if (numberOfPeople > 8) {
      recommendations.push('Large group - consider asking about automatic gratuity');
    }
    if (perPersonTotal < 10) {
      recommendations.push('Small individual amounts - consider rounding up for convenience');
    }
    if (splitType === 'by_item') {
      recommendations.push('When splitting by items, don\'t forget to split tax and tip proportionally');
    }

    return {
      tipAmount,
      totalAmount,
      perPersonBill,
      perPersonTip,
      perPersonTotal,
      recommendations
    };
  }

  /**
   * Calculate difference between dates
   */
  static calculateDateDifference(startDate: string, endDate: string): {
    daysDifference: number;
    weeksDifference: number;
    monthsDifference: number;
    yearsDifference: number;
    businessDays: number;
    recommendations: string[];
  } {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30.44); // Average month length
    const yearsDifference = Math.floor(daysDifference / 365.25); // Account for leap years

    // Calculate business days (excluding weekends)
    let businessDays = 0;
    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        businessDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const recommendations: string[] = [];
    if (daysDifference > 365) {
      recommendations.push('Long time period - consider breaking into smaller milestones');
    }
    if (daysDifference < 0) {
      recommendations.push('End date is before start date - check your dates');
    }

    return {
      daysDifference,
      weeksDifference,
      monthsDifference,
      yearsDifference,
      businessDays,
      recommendations
    };
  }

  /**
   * Calculate age from birth date
   */
  static calculateAge(birthDate: string, referenceDate?: string): {
    ageYears: number;
    ageMonths: number;
    ageDays: number;
    totalDays: number;
    totalMonths: number;
    nextBirthday: string;
    daysUntilBirthday: number;
    recommendations: string[];
  } {
    const birth = new Date(birthDate);
    const reference = referenceDate ? new Date(referenceDate) : new Date();
    
    let ageYears = reference.getFullYear() - birth.getFullYear();
    let ageMonths = reference.getMonth() - birth.getMonth();
    let ageDays = reference.getDate() - birth.getDate();

    // Adjust for negative days
    if (ageDays < 0) {
      ageMonths--;
      const lastMonth = new Date(reference.getFullYear(), reference.getMonth(), 0);
      ageDays += lastMonth.getDate();
    }

    // Adjust for negative months
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    const totalDays = Math.floor((reference.getTime() - birth.getTime()) / (1000 * 3600 * 24));
    const totalMonths = ageYears * 12 + ageMonths;

    // Calculate next birthday
    const nextBirthday = new Date(reference.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < reference) {
      nextBirthday.setFullYear(reference.getFullYear() + 1);
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - reference.getTime()) / (1000 * 3600 * 24));

    const recommendations: string[] = [];
    if (ageYears >= 100) {
      recommendations.push('Centenarian! What an achievement!');
    }
    if (daysUntilBirthday <= 30) {
      recommendations.push(`Birthday coming up in ${daysUntilBirthday} days!`);
    }

    return {
      ageYears,
      ageMonths,
      ageDays,
      totalDays,
      totalMonths,
      nextBirthday: nextBirthday.toDateString(),
      daysUntilBirthday,
      recommendations
    };
  }

  /**
   * Calculate discount and sale prices
   */
  static calculateDiscount(originalPrice: number, discountPercentage?: number, salePrice?: number): {
    discountAmount: number;
    discountPercentage: number;
    finalPrice: number;
    savings: number;
    recommendations: string[];
  } {
    let calculatedDiscountPercentage: number;
    let calculatedDiscountAmount: number;
    let calculatedFinalPrice: number;

    if (discountPercentage !== undefined) {
      // Calculate from discount percentage
      calculatedDiscountPercentage = discountPercentage;
      calculatedDiscountAmount = (originalPrice * discountPercentage) / 100;
      calculatedFinalPrice = originalPrice - calculatedDiscountAmount;
    } else if (salePrice !== undefined) {
      // Calculate from sale price
      calculatedDiscountAmount = originalPrice - salePrice;
      calculatedDiscountPercentage = (calculatedDiscountAmount / originalPrice) * 100;
      calculatedFinalPrice = salePrice;
    } else {
      throw new Error('Either discount percentage or sale price must be provided');
    }

    const recommendations: string[] = [];
    if (calculatedDiscountPercentage > 50) {
      recommendations.push('Large discount - verify the deal is legitimate');
    }
    if (calculatedDiscountPercentage < 5) {
      recommendations.push('Small discount - consider if it\'s worth the purchase');
    }
    if (originalPrice > 1000 && calculatedDiscountAmount > 200) {
      recommendations.push('Significant savings on expensive item - good deal!');
    }

    return {
      discountAmount: calculatedDiscountAmount,
      discountPercentage: calculatedDiscountPercentage,
      finalPrice: calculatedFinalPrice,
      savings: calculatedDiscountAmount,
      recommendations
    };
  }

  /**
   * Calculate percentage relationships
   */
  static calculatePercentage(value?: number, total?: number, percentage?: number): {
    result: string;
    calculation: string;
    recommendations: string[];
  } {
    let result: string;
    let calculation: string;
    const recommendations: string[] = [];

    if (value !== undefined && total !== undefined) {
      // What percentage is value of total?
      const percent = (value / total) * 100;
      result = `${percent.toFixed(2)}%`;
      calculation = `${value} is ${percent.toFixed(2)}% of ${total}`;
    } else if (percentage !== undefined && total !== undefined) {
      // What is percentage% of total?
      const amount = (percentage / 100) * total;
      result = amount.toFixed(2);
      calculation = `${percentage}% of ${total} is ${amount.toFixed(2)}`;
    } else if (value !== undefined && percentage !== undefined) {
      // If value is percentage%, what is the total?
      const total = (value * 100) / percentage;
      result = total.toFixed(2);
      calculation = `If ${value} is ${percentage}%, then the total is ${total.toFixed(2)}`;
    } else {
      throw new Error('Insufficient parameters for percentage calculation');
    }

    if (value && total && value > total) {
      recommendations.push('Value is greater than total - result will be over 100%');
    }

    return { result, calculation, recommendations };
  }
}

export const everydayCalculatorFormula: Formula = {
  id: 'everyday-calculator',
  name: 'Everyday Utilities Calculator',
  description: 'Practical daily life calculations including tips, bill splitting, and date calculations',
  calculate: (inputs: Record<string, any>): CalculationResult => {
    const everydayInputs = inputs as EverydayInputs;
    
    try {
      let result: any = {};
      let explanation = '';
      let steps: any = {};

      switch (everydayInputs.calculationType) {
        case 'tip_calculator':
          if (!everydayInputs.billAmount) throw new Error('Bill amount required for tip calculation');
          
          const tipCalc = EverydayFormulas.calculateTip(
            everydayInputs.billAmount,
            everydayInputs.serviceQuality,
            everydayInputs.tipPercentage
          );
          
          result = {
            tipAmount: tipCalc.tipAmount,
            totalAmount: tipCalc.totalAmount,
            recommendations: tipCalc.recommendations.join('; ')
          };
          
          if (everydayInputs.numberOfPeople && everydayInputs.numberOfPeople > 1) {
            const perPersonAmount = tipCalc.totalAmount / everydayInputs.numberOfPeople;
            const perPersonTip = tipCalc.tipAmount / everydayInputs.numberOfPeople;
            result.perPersonAmount = perPersonAmount;
            result.perPersonTip = perPersonTip;
          }
          
          explanation = `${tipCalc.tipPercentage}% tip on $${everydayInputs.billAmount} = $${tipCalc.tipAmount.toFixed(2)}`;
          
          steps = {
            'Bill Amount': `$${everydayInputs.billAmount.toFixed(2)}`,
            'Tip Percentage': `${tipCalc.tipPercentage}%`,
            'Tip Amount': `$${tipCalc.tipAmount.toFixed(2)}`,
            'Total Amount': `$${tipCalc.totalAmount.toFixed(2)}`
          };
          break;

        case 'bill_splitter':
          if (!everydayInputs.billAmount || !everydayInputs.numberOfPeople) {
            throw new Error('Bill amount and number of people required for bill splitting');
          }
          
          const tipPercentage = everydayInputs.tipPercentage || 18;
          const splitResult = EverydayFormulas.splitBill(
            everydayInputs.billAmount,
            tipPercentage,
            everydayInputs.numberOfPeople,
            everydayInputs.splitType,
            everydayInputs.roundUp
          );
          
          result = {
            tipAmount: splitResult.tipAmount,
            totalAmount: splitResult.totalAmount,
            perPersonAmount: splitResult.perPersonTotal,
            perPersonTip: splitResult.perPersonTip,
            recommendations: splitResult.recommendations.join('; ')
          };
          
          explanation = `$${everydayInputs.billAmount} bill + ${tipPercentage}% tip split ${everydayInputs.numberOfPeople} ways = $${splitResult.perPersonTotal.toFixed(2)} per person`;
          
          steps = {
            'Bill Amount': `$${everydayInputs.billAmount.toFixed(2)}`,
            'Tip Amount': `$${splitResult.tipAmount.toFixed(2)}`,
            'Total Amount': `$${splitResult.totalAmount.toFixed(2)}`,
            'Number of People': everydayInputs.numberOfPeople.toString(),
            'Per Person': `$${splitResult.perPersonTotal.toFixed(2)}`
          };
          break;

        case 'date_calculator':
          if (!everydayInputs.startDate || !everydayInputs.endDate) {
            throw new Error('Start and end dates required for date calculation');
          }
          
          const dateCalc = EverydayFormulas.calculateDateDifference(
            everydayInputs.startDate,
            everydayInputs.endDate
          );
          
          result = {
            daysDifference: dateCalc.daysDifference,
            recommendations: dateCalc.recommendations.join('; ')
          };
          
          explanation = `${dateCalc.daysDifference} days between ${everydayInputs.startDate} and ${everydayInputs.endDate}`;
          
          steps = {
            'Start Date': everydayInputs.startDate,
            'End Date': everydayInputs.endDate,
            'Days Difference': dateCalc.daysDifference.toString(),
            'Weeks': `${dateCalc.weeksDifference} weeks`,
            'Business Days': dateCalc.businessDays.toString()
          };
          break;

        case 'age_calculator':
          if (!everydayInputs.birthDate) throw new Error('Birth date required for age calculation');
          
          const ageCalc = EverydayFormulas.calculateAge(everydayInputs.birthDate);
          
          result = {
            ageYears: ageCalc.ageYears,
            ageDetailed: `${ageCalc.ageYears} years, ${ageCalc.ageMonths} months, ${ageCalc.ageDays} days`,
            recommendations: ageCalc.recommendations.join('; ')
          };
          
          explanation = `Age: ${ageCalc.ageYears} years old (${ageCalc.totalDays} days since birth)`;
          
          steps = {
            'Birth Date': everydayInputs.birthDate,
            'Age in Years': ageCalc.ageYears.toString(),
            'Age in Months': ageCalc.totalMonths.toString(),
            'Age in Days': ageCalc.totalDays.toString(),
            'Next Birthday': ageCalc.nextBirthday,
            'Days Until Birthday': ageCalc.daysUntilBirthday.toString()
          };
          break;

        case 'discount_calculator':
          if (!everydayInputs.originalPrice) throw new Error('Original price required for discount calculation');
          
          const discountCalc = EverydayFormulas.calculateDiscount(
            everydayInputs.originalPrice,
            everydayInputs.discountPercentage,
            everydayInputs.salePrice
          );
          
          result = {
            discountAmount: discountCalc.discountAmount,
            finalPrice: discountCalc.finalPrice,
            recommendations: discountCalc.recommendations.join('; ')
          };
          
          explanation = `${discountCalc.discountPercentage.toFixed(1)}% discount saves $${discountCalc.discountAmount.toFixed(2)}`;
          
          steps = {
            'Original Price': `$${everydayInputs.originalPrice.toFixed(2)}`,
            'Discount Percentage': `${discountCalc.discountPercentage.toFixed(1)}%`,
            'Discount Amount': `$${discountCalc.discountAmount.toFixed(2)}`,
            'Final Price': `$${discountCalc.finalPrice.toFixed(2)}`
          };
          break;

        case 'percentage_calculator':
          const percentCalc = EverydayFormulas.calculatePercentage(
            everydayInputs.percentageValue,
            everydayInputs.percentageOf,
            everydayInputs.tipPercentage // Reusing this field for percentage
          );
          
          result = {
            percentageResult: percentCalc.result,
            recommendations: percentCalc.recommendations.join('; ')
          };
          
          explanation = percentCalc.calculation;
          
          steps = {
            'Calculation': percentCalc.calculation,
            'Result': percentCalc.result
          };
          break;

        default:
          throw new Error(`Unknown calculation type: ${everydayInputs.calculationType}`);
      }

      return {
        outputs: result,
        explanation,
        intermediateSteps: steps
      };
    } catch (error) {
      throw new Error(`Everyday calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};