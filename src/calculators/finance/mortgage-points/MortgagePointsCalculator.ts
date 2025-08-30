import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Home,
  CreditCard,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  Percent,
  Zap
} from 'lucide-react';

import { MortgagePointsInputs, MortgagePointsOutputs, MortgagePointsAnalysis } from './types';
import { calculateMortgagePoints } from './formulas';
import { validateMortgagePointsInputs } from './validation';
import { validateField } from './quickValidation';

interface MortgagePointsCalculatorProps {
  onCalculate?: (results: MortgagePointsOutputs) => void;
  initialInputs?: Partial<MortgagePointsInputs>;
}

export function MortgagePointsCalculator({ 
  onCalculate, 
  initialInputs 
}: MortgagePointsCalculatorProps) {
  const [inputs, setInputs] = useState<MortgagePointsInputs>({
    // Loan Information
    loanAmount: initialInputs?.loanAmount || 300000,
    baseInterestRate: initialInputs?.baseInterestRate || 5.0,
    loanTerm: initialInputs?.loanTerm || 30,
    loanType: initialInputs?.loanType || 'conventional',
    paymentType: initialInputs?.paymentType || 'principal_interest',
    
    // Points Information
    discountPoints: initialInputs?.discountPoints || 1,
    originationPoints: initialInputs?.originationPoints || 1,
    pointCost: initialInputs?.pointCost || 1000,
    pointValue: initialInputs?.pointValue || 0.25,
    
    // Rate Options
    rateOptions: initialInputs?.rateOptions || [
      { points: 0, rate: 5.0, payment: 1610.46, totalInterest: 279765.60 },
      { points: 1, rate: 4.75, payment: 1565.95, totalInterest: 263742.00 },
      { points: 2, rate: 4.5, payment: 1520.06, totalInterest: 247220.00 },
      { points: 3, rate: 4.25, payment: 1475.82, totalInterest: 231295.20 },
    ],
    
    // Property Information
    propertyValue: initialInputs?.propertyValue || 375000,
    propertyAddress: initialInputs?.propertyAddress || '',
    propertyType: initialInputs?.propertyType || 'single_family',
    propertySize: initialInputs?.propertySize || 2000,
    propertyAge: initialInputs?.propertyAge || 10,
    
    // Down Payment Information
    downPayment: initialInputs?.downPayment || 75000,
    downPaymentPercentage: initialInputs?.downPaymentPercentage || 20,
    downPaymentSource: initialInputs?.downPaymentSource || 'savings',
    
    // Insurance and Taxes
    propertyInsurance: initialInputs?.propertyInsurance || 1200,
    propertyTaxes: initialInputs?.propertyTaxes || 3750,
    hoaFees: initialInputs?.hoaFees || 0,
    floodInsurance: initialInputs?.floodInsurance || 0,
    mortgageInsurance: initialInputs?.mortgageInsurance || 0,
    mortgageInsuranceRate: initialInputs?.mortgageInsuranceRate || 0.5,
    
    // Borrower Information
    borrowerIncome: initialInputs?.borrowerIncome || 80000,
    borrowerCreditScore: initialInputs?.borrowerCreditScore || 750,
    borrowerDebtToIncomeRatio: initialInputs?.borrowerDebtToIncomeRatio || 36,
    borrowerEmploymentType: initialInputs?.borrowerEmploymentType || 'employed',
    borrowerTaxRate: initialInputs?.borrowerTaxRate || 22,
    
    // Market Information
    marketLocation: initialInputs?.marketLocation || '',
    marketCondition: initialInputs?.marketCondition || 'stable',
    marketGrowthRate: initialInputs?.marketGrowthRate || 3.0,
    
    // Analysis Parameters
    analysisPeriod: initialInputs?.analysisPeriod || 30,
    inflationRate: initialInputs?.inflationRate || 2.5,
    propertyAppreciationRate: initialInputs?.propertyAppreciationRate || 3.0,
    discountRate: initialInputs?.discountRate || 5.0,
    taxDeductionPeriod: initialInputs?.taxDeductionPeriod || 30,
    
    // Reporting Preferences
    currency: initialInputs?.currency || 'USD',
    displayFormat: initialInputs?.displayFormat || 'currency',
    includeCharts: initialInputs?.includeCharts || true,
  });

  const [results, setResults] = useState<MortgagePointsOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof MortgagePointsInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    
    // Clear field-specific error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateInputs = (): boolean => {
    const validationErrors: Record<string, string> = {};
    
    // Validate each field
    Object.keys(inputs).forEach(key => {
      const field = key as keyof MortgagePointsInputs;
      const value = inputs[field];
      const validation = validateField(field, value, inputs);
      
      if (!validation.isValid) {
        validationErrors[field] = validation.error || 'Invalid input';
      }
    });
    
    // Additional validation
    const fullValidation = validateMortgagePointsInputs(inputs);
    if (!fullValidation.isValid) {
      Object.assign(validationErrors, fullValidation.errors);
    }
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const calculate = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsCalculating(true);
    
    try {
      const calculatedResults = calculateMortgagePoints(inputs);
      setResults(calculatedResults);
      
      if (onCalculate) {
        onCalculate(calculatedResults);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ calculation: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const getPointsRatingColor = (rating: string): string => {
    switch (rating) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Average': return 'text-yellow-600';
      case 'Poor': return 'text-orange-600';
      case 'Very Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getValueRatingColor = (rating: string): string => {
    switch (rating) {
      case 'High Value': return 'text-green-600';
      case 'Good Value': return 'text-blue-600';
      case 'Moderate Value': return 'text-yellow-600';
      case 'Low Value': return 'text-orange-600';
      case 'No Value': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRecommendationColor = (recommendation: string): string => {
    switch (recommendation) {
      case 'Buy Points': return 'bg-green-100 text-green-800';
      case 'Consider Points': return 'bg-blue-100 text-blue-800';
      case 'Don\'t Buy Points': return 'bg-yellow-100 text-yellow-800';
      case 'Requires Review': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Mortgage Points Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="points" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="points">Points Details</TabsTrigger>
              <TabsTrigger value="loan">Loan Info</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="points" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="baseInterestRate">Base Interest Rate (%)</Label>
                  <Input
                    id="baseInterestRate"
                    type="number"
                    step="0.01"
                    value={inputs.baseInterestRate}
                    onChange={(e) => handleInputChange('baseInterestRate', parseFloat(e.target.value))}
                    placeholder="5.0"
                  />
                  {errors.baseInterestRate && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{errors.baseInterestRate}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPoints">Discount Points</Label>
                  <Input
                    id="discountPoints"
                    type="number"
                    step="0.25"
                    value={inputs.discountPoints}
                    onChange={(e) => handleInputChange('discountPoints', parseFloat(e.target.value))}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originationPoints">Origination Points</Label>
                  <Input
                    id="originationPoints"
                    type="number"
                    step="0.25"
                    value={inputs.originationPoints}
                    onChange={(e) => handleInputChange('originationPoints', parseFloat(e.target.value))}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointCost">Point Cost</Label>
                  <Input
                    id="pointCost"
                    type="number"
                    value={inputs.pointCost}
                    onChange={(e) => handleInputChange('pointCost', parseFloat(e.target.value))}
                    placeholder="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointValue">Rate Reduction per Point (%)</Label>
                  <Input
                    id="pointValue"
                    type="number"
                    step="0.01"
                    value={inputs.pointValue}
                    onChange={(e) => handleInputChange('pointValue', parseFloat(e.target.value))}
                    placeholder="0.25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borrowerTaxRate">Tax Rate (%)</Label>
                  <Input
                    id="borrowerTaxRate"
                    type="number"
                    step="1"
                    value={inputs.borrowerTaxRate}
                    onChange={(e) => handleInputChange('borrowerTaxRate', parseFloat(e.target.value))}
                    placeholder="22"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="loan" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={inputs.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value))}
                    placeholder="300,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <Select value={inputs.loanTerm.toString()} onValueChange={(value) => handleInputChange('loanTerm', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                      <SelectItem value="30">30 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select value={inputs.loanType} onValueChange={(value) => handleInputChange('loanType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conventional">Conventional</SelectItem>
                      <SelectItem value="fha">FHA</SelectItem>
                      <SelectItem value="va">VA</SelectItem>
                      <SelectItem value="usda">USDA</SelectItem>
                      <SelectItem value="jumbo">Jumbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentType">Payment Type</Label>
                  <Select value={inputs.paymentType} onValueChange={(value) => handleInputChange('paymentType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal_interest">Principal & Interest</SelectItem>
                      <SelectItem value="interest_only">Interest Only</SelectItem>
                      <SelectItem value="balloon">Balloon</SelectItem>
                      <SelectItem value="arm">Adjustable Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="analysisPeriod">Analysis Period (Years)</Label>
                  <Input
                    id="analysisPeriod"
                    type="number"
                    value={inputs.analysisPeriod}
                    onChange={(e) => handleInputChange('analysisPeriod', parseInt(e.target.value))}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxDeductionPeriod">Tax Deduction Period (Years)</Label>
                  <Input
                    id="taxDeductionPeriod"
                    type="number"
                    value={inputs.taxDeductionPeriod}
                    onChange={(e) => handleInputChange('taxDeductionPeriod', parseInt(e.target.value))}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <Input
                    id="inflationRate"
                    type="number"
                    step="0.1"
                    value={inputs.inflationRate}
                    onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value))}
                    placeholder="2.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountRate">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    step="0.1"
                    value={inputs.discountRate}
                    onChange={(e) => handleInputChange('discountRate', parseFloat(e.target.value))}
                    placeholder="5.0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Rate Options Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {inputs.rateOptions.map((option, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Points: {option.points}</span>
                          <span className="text-sm text-blue-600">{option.rate}%</span>
                        </div>
                        <div className="text-lg font-bold">{formatCurrency(option.payment)}</div>
                        <div className="text-xs text-gray-500">
                          Total Interest: {formatCurrency(option.totalInterest)}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-6">
            <Button 
              onClick={calculate} 
              disabled={isCalculating}
              className="w-full md:w-auto"
            >
              {isCalculating ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Points Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Points Cost</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(results.totalPointCost)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Savings</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.monthlyPaymentSavings)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Break-Even</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.breakEvenMonths} months
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROI</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage(results.returnOnInvestment)}
                    </p>
                  </div>
                  <Percent className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Points Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Points Rating */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Points Rating</h3>
                  <p className="text-sm text-gray-600">Overall assessment of buying points</p>
                </div>
                <Badge className={`text-lg px-4 py-2 ${getPointsRatingColor(results.analysis.pointsRating)}`}>
                  {results.analysis.pointsRating}
                </Badge>
              </div>

              {/* Value Rating */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Value Rating</h3>
                  <p className="text-sm text-gray-600">Value assessment of the points purchase</p>
                </div>
                <Badge className={`text-lg px-4 py-2 ${getValueRatingColor(results.analysis.valueRating)}`}>
                  {results.analysis.valueRating}
                </Badge>
              </div>

              {/* Recommendation */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Recommendation</h3>
                  <p className="text-sm text-gray-600">Our recommendation based on the analysis</p>
                </div>
                <Badge className={`text-lg px-4 py-2 ${getRecommendationColor(results.analysis.recommendation)}`}>
                  {results.analysis.recommendation}
                </Badge>
              </div>

              {/* Key Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Value Factors
                  </h3>
                  <ul className="space-y-1">
                    {results.analysis.valueFactors.map((factor, index) => (
                      <li key={index} className="text-sm text-green-700">• {factor}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    Key Weaknesses
                  </h3>
                  <ul className="space-y-1">
                    {results.analysis.keyWeaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm text-orange-700">• {weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold">Savings Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Monthly Savings</p>
                    <p className="text-xl font-bold">{formatCurrency(results.monthlyPaymentSavings)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Annual Savings</p>
                    <p className="text-xl font-bold">{formatCurrency(results.annualPaymentSavings)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Total Interest Savings</p>
                    <p className="text-xl font-bold">{formatCurrency(results.interestSavings)}</p>
                  </div>
                </div>
              </div>

              {/* Break-Even Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold">Break-Even Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Break-Even Point</p>
                    <p className="text-xl font-bold">{formatCurrency(results.breakEvenPoint)}</p>
                    <p className="text-sm text-gray-500">{results.breakEvenMonths} months ({results.breakEvenYears.toFixed(1)} years)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Net Present Value</p>
                    <p className="text-xl font-bold">{formatCurrency(results.netPresentValue)}</p>
                  </div>
                </div>
              </div>

              {/* Tax Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold">Tax Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Tax Deduction</p>
                    <p className="text-xl font-bold">{formatCurrency(results.taxDeduction)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">After-Tax Cost</p>
                    <p className="text-xl font-bold">{formatCurrency(results.afterTaxCost)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">After-Tax Savings</p>
                    <p className="text-xl font-bold">{formatCurrency(results.afterTaxSavings)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {errors.calculation && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{errors.calculation}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default MortgagePointsCalculator;