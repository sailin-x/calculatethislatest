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
  Target
} from 'lucide-react';

import { MortgagePaymentInputs, MortgagePaymentOutputs, MortgagePaymentAnalysis } from './types';
import { calculateMortgagePayment } from './formulas';
import { validateMortgagePaymentInputs } from './validation';
import { validateField } from './quickValidation';

interface MortgagePaymentCalculatorProps {
  onCalculate?: (results: MortgagePaymentOutputs) => void;
  initialInputs?: Partial<MortgagePaymentInputs>;
}

export function MortgagePaymentCalculator({ 
  onCalculate, 
  initialInputs 
}: MortgagePaymentCalculatorProps) {
  const [inputs, setInputs] = useState<MortgagePaymentInputs>({
    // Loan Information
    loanAmount: initialInputs?.loanAmount || 300000,
    interestRate: initialInputs?.interestRate || 4.5,
    loanTerm: initialInputs?.loanTerm || 30,
    loanType: initialInputs?.loanType || 'conventional',
    paymentType: initialInputs?.paymentType || 'principal_interest',
    
    // ARM Information
    armType: initialInputs?.armType || '5_1',
    initialFixedPeriod: initialInputs?.initialFixedPeriod || 5,
    adjustmentPeriod: initialInputs?.adjustmentPeriod || 1,
    margin: initialInputs?.margin || 2.5,
    indexRate: initialInputs?.indexRate || 3.0,
    lifetimeCap: initialInputs?.lifetimeCap || 5.0,
    periodicCap: initialInputs?.periodicCap || 2.0,
    floorRate: initialInputs?.floorRate || 2.0,
    
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
    
    // Payment Information
    paymentFrequency: initialInputs?.paymentFrequency || 'monthly',
    firstPaymentDate: initialInputs?.firstPaymentDate || new Date().toISOString().split('T')[0],
    paymentDay: initialInputs?.paymentDay || 1,
    
    // Points and Credits
    discountPoints: initialInputs?.discountPoints || 0,
    originationPoints: initialInputs?.originationPoints || 1,
    lenderCredits: initialInputs?.lenderCredits || 0,
    sellerCredits: initialInputs?.sellerCredits || 0,
    
    // Borrower Information
    borrowerIncome: initialInputs?.borrowerIncome || 80000,
    borrowerCreditScore: initialInputs?.borrowerCreditScore || 750,
    borrowerDebtToIncomeRatio: initialInputs?.borrowerDebtToIncomeRatio || 36,
    borrowerEmploymentType: initialInputs?.borrowerEmploymentType || 'employed',
    
    // Market Information
    marketLocation: initialInputs?.marketLocation || '',
    marketCondition: initialInputs?.marketCondition || 'stable',
    marketGrowthRate: initialInputs?.marketGrowthRate || 3.0,
    
    // Analysis Parameters
    analysisPeriod: initialInputs?.analysisPeriod || 30,
    inflationRate: initialInputs?.inflationRate || 2.5,
    propertyAppreciationRate: initialInputs?.propertyAppreciationRate || 3.0,
    discountRate: initialInputs?.discountRate || 5.0,
    
    // Reporting Preferences
    currency: initialInputs?.currency || 'USD',
    displayFormat: initialInputs?.displayFormat || 'currency',
    includeCharts: initialInputs?.includeCharts || true,
  });

  const [results, setResults] = useState<MortgagePaymentOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof MortgagePaymentInputs, value: any) => {
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
      const field = key as keyof MortgagePaymentInputs;
      const value = inputs[field];
      const validation = validateField(field, value, inputs);
      
      if (!validation.isValid) {
        validationErrors[field] = validation.error || 'Invalid input';
      }
    });
    
    // Additional validation
    const fullValidation = validateMortgagePaymentInputs(inputs);
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
      const calculatedResults = calculateMortgagePayment(inputs);
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

  const getPaymentRatingColor = (rating: string): string => {
    switch (rating) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Average': return 'text-yellow-600';
      case 'Poor': return 'text-orange-600';
      case 'Very Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRecommendationColor = (recommendation: string): string => {
    switch (recommendation) {
      case 'Proceed': return 'bg-green-100 text-green-800';
      case 'Consider': return 'bg-blue-100 text-blue-800';
      case 'Reconsider': return 'bg-yellow-100 text-yellow-800';
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
            Mortgage Payment Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loan" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="loan">Loan Details</TabsTrigger>
              <TabsTrigger value="property">Property</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

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
                  {errors.loanAmount && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{errors.loanAmount}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
                    placeholder="4.5"
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

                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={inputs.downPayment}
                    onChange={(e) => handleInputChange('downPayment', parseFloat(e.target.value))}
                    placeholder="75,000"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="property" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Value</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={inputs.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                    placeholder="375,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_family">Single Family</SelectItem>
                      <SelectItem value="multi_family">Multi Family</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyInsurance">Property Insurance (Annual)</Label>
                  <Input
                    id="propertyInsurance"
                    type="number"
                    value={inputs.propertyInsurance}
                    onChange={(e) => handleInputChange('propertyInsurance', parseFloat(e.target.value))}
                    placeholder="1,200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyTaxes">Property Taxes (Annual)</Label>
                  <Input
                    id="propertyTaxes"
                    type="number"
                    value={inputs.propertyTaxes}
                    onChange={(e) => handleInputChange('propertyTaxes', parseFloat(e.target.value))}
                    placeholder="3,750"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hoaFees">HOA Fees (Monthly)</Label>
                  <Input
                    id="hoaFees"
                    type="number"
                    value={inputs.hoaFees}
                    onChange={(e) => handleInputChange('hoaFees', parseFloat(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <Select value={inputs.paymentFrequency} onValueChange={(value) => handleInputChange('paymentFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstPaymentDate">First Payment Date</Label>
                  <Input
                    id="firstPaymentDate"
                    type="date"
                    value={inputs.firstPaymentDate}
                    onChange={(e) => handleInputChange('firstPaymentDate', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borrowerIncome">Annual Income</Label>
                  <Input
                    id="borrowerIncome"
                    type="number"
                    value={inputs.borrowerIncome}
                    onChange={(e) => handleInputChange('borrowerIncome', parseFloat(e.target.value))}
                    placeholder="80,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borrowerCreditScore">Credit Score</Label>
                  <Input
                    id="borrowerCreditScore"
                    type="number"
                    value={inputs.borrowerCreditScore}
                    onChange={(e) => handleInputChange('borrowerCreditScore', parseInt(e.target.value))}
                    placeholder="750"
                  />
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
                  Calculate Payment
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
                    <p className="text-sm font-medium text-gray-600">Monthly Payment</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Interest</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(results.totalInterestPaid)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-600" />
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
                    <p className="text-sm font-medium text-gray-600">Risk Score</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.riskScore}/100
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Payment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Rating */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Payment Rating</h3>
                  <p className="text-sm text-gray-600">Overall assessment of your mortgage payment</p>
                </div>
                <Badge className={`text-lg px-4 py-2 ${getPaymentRatingColor(results.analysis.paymentRating)}`}>
                  {results.analysis.paymentRating}
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
                    Key Strengths
                  </h3>
                  <ul className="space-y-1">
                    {results.analysis.keyStrengths.map((strength, index) => (
                      <li key={index} className="text-sm text-green-700">• {strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    Risk Factors
                  </h3>
                  <ul className="space-y-1">
                    {results.analysis.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-orange-700">• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Principal</p>
                    <p className="text-xl font-bold">{formatCurrency(results.principalPayment)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Interest</p>
                    <p className="text-xl font-bold">{formatCurrency(results.interestPayment)}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold">{formatCurrency(results.totalPayment)}</p>
                  </div>
                </div>
              </div>

              {/* Equity Analysis */}
              <div className="space-y-4">
                <h3 className="font-semibold">Equity Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Current Equity</p>
                    <p className="text-xl font-bold">{formatCurrency(results.equityPosition)}</p>
                    <p className="text-sm text-gray-500">{formatPercentage(results.equityPercentage)} of property value</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Loan-to-Value Ratio</p>
                    <p className="text-xl font-bold">{formatPercentage(results.loanToValueRatio)}</p>
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

export default MortgagePaymentCalculator;