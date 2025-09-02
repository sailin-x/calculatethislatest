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
import { PMICancellationInputs, PMICancellationOutputs } from './types';
import { calculatePMICancellation } from './formulas';
import { validatePMICancellationInputs } from './validation';
import { validateField } from './quickValidation';

interface PMICancellationCalculatorProps {
  onCalculate?: (results: PMICancellationOutputs) => void;
  initialInputs?: Partial<PMICancellationInputs>;
}

export function PMICancellationCalculator({ onCalculate, initialInputs }: PMICancellationCalculatorProps) {
  const [inputs, setInputs] = useState<PMICancellationInputs>({
    // Loan Information
    originalLoanAmount: 300000,
    currentLoanBalance: 280000,
    interestRate: 4.5,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    
    // Property Information
    originalPropertyValue: 375000,
    currentPropertyValue: 400000,
    propertyAddress: '123 Main St, City, State',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    
    // PMI Information
    pmiRate: 0.5,
    pmiMonthlyPayment: 125,
    pmiStartDate: '2023-01-01',
    pmiCancellationDate: '',
    pmiCancellationMethod: 'automatic',
    
    // Loan History
    loanStartDate: '2023-01-01',
    originalDownPayment: 75000,
    originalDownPaymentPercentage: 20,
    paymentsMade: 12,
    monthsSinceLoanStart: 12,
    
    // Appraisal Information
    appraisalValue: 0,
    appraisalDate: '',
    appraisalCost: 500,
    appraisalRequired: false,
    
    // Market Information
    marketLocation: 'Suburban',
    marketCondition: 'growing',
    marketGrowthRate: 3.0,
    comparableSales: [
      { address: '456 Oak St', salePrice: 395000, saleDate: '2024-01-15', condition: 'Good' },
      { address: '789 Pine St', salePrice: 410000, saleDate: '2024-02-01', condition: 'Excellent' },
      { address: '321 Elm St', salePrice: 385000, saleDate: '2024-01-30', condition: 'Fair' }
    ],
    
    // Borrower Information
    borrowerIncome: 80000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed',
    
    // Cancellation Requirements
    ltvThreshold: 80,
    paymentHistory: [
      { paymentNumber: 1, paymentDate: '2023-02-01', paymentAmount: 1520, principal: 395, interest: 1125, balance: 299605, onTime: true },
      { paymentNumber: 2, paymentDate: '2023-03-01', paymentAmount: 1520, principal: 397, interest: 1123, balance: 299208, onTime: true },
      { paymentNumber: 3, paymentDate: '2023-04-01', paymentAmount: 1520, principal: 398, interest: 1122, balance: 298810, onTime: true },
      { paymentNumber: 4, paymentDate: '2023-05-01', paymentAmount: 1520, principal: 400, interest: 1120, balance: 298410, onTime: true },
      { paymentNumber: 5, paymentDate: '2023-06-01', paymentAmount: 1520, principal: 401, interest: 1119, balance: 298009, onTime: true },
      { paymentNumber: 6, paymentDate: '2023-07-01', paymentAmount: 1520, principal: 403, interest: 1117, balance: 297606, onTime: true },
      { paymentNumber: 7, paymentDate: '2023-08-01', paymentAmount: 1520, principal: 404, interest: 1116, balance: 297202, onTime: true },
      { paymentNumber: 8, paymentDate: '2023-09-01', paymentAmount: 1520, principal: 406, interest: 1114, balance: 296796, onTime: true },
      { paymentNumber: 9, paymentDate: '2023-10-01', paymentAmount: 1520, principal: 407, interest: 1113, balance: 296389, onTime: true },
      { paymentNumber: 10, paymentDate: '2023-11-01', paymentAmount: 1520, principal: 409, interest: 1111, balance: 295980, onTime: true },
      { paymentNumber: 11, paymentDate: '2023-12-01', paymentAmount: 1520, principal: 410, interest: 1110, balance: 295570, onTime: true },
      { paymentNumber: 12, paymentDate: '2024-01-01', paymentAmount: 1520, principal: 412, interest: 1108, balance: 295158, onTime: true }
    ],
    
    // Analysis Parameters
    analysisPeriod: 60,
    inflationRate: 2.5,
    propertyAppreciationRate: 3.0,
    discountRate: 5.0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<PMICancellationOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof PMICancellationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const validation = validatePMICancellationInputs(inputs);
    if (!validation.isValid) {
      setErrors(validation.errors || {});
      return false;
    }
    setErrors({});
    return true;
  };

  const calculate = async () => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    try {
      const calculatedResults = calculatePMICancellation(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatValue = (value: number, type: 'currency' | 'percentage' | 'number' = 'currency') => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
      default:
        return formatCurrency(value);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            PMI Cancellation Calculator
            <Badge variant="secondary">Finance</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              {/* Loan Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Loan Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalLoanAmount">Original Loan Amount</Label>
                    <Input
                      id="originalLoanAmount"
                      type="number"
                      value={inputs.originalLoanAmount}
                      onChange={(e) => handleInputChange('originalLoanAmount', parseFloat(e.target.value))}
                      placeholder="300000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentLoanBalance">Current Loan Balance</Label>
                    <Input
                      id="currentLoanBalance"
                      type="number"
                      value={inputs.currentLoanBalance}
                      onChange={(e) => handleInputChange('currentLoanBalance', parseFloat(e.target.value))}
                      placeholder="280000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={inputs.interestRate}
                      onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
                      placeholder="4.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={inputs.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', parseFloat(e.target.value))}
                      placeholder="30"
                    />
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
                        <SelectItem value="arm">ARM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Property Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalPropertyValue">Original Property Value</Label>
                    <Input
                      id="originalPropertyValue"
                      type="number"
                      value={inputs.originalPropertyValue}
                      onChange={(e) => handleInputChange('originalPropertyValue', parseFloat(e.target.value))}
                      placeholder="375000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPropertyValue">Current Property Value</Label>
                    <Input
                      id="currentPropertyValue"
                      type="number"
                      value={inputs.currentPropertyValue}
                      onChange={(e) => handleInputChange('currentPropertyValue', parseFloat(e.target.value))}
                      placeholder="400000"
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
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={inputs.propertySize}
                      onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                      placeholder="2000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyAge">Property Age (years)</Label>
                    <Input
                      id="propertyAge"
                      type="number"
                      value={inputs.propertyAge}
                      onChange={(e) => handleInputChange('propertyAge', parseFloat(e.target.value))}
                      placeholder="15"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* PMI Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">PMI Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pmiRate">PMI Rate (%)</Label>
                    <Input
                      id="pmiRate"
                      type="number"
                      value={inputs.pmiRate}
                      onChange={(e) => handleInputChange('pmiRate', parseFloat(e.target.value))}
                      placeholder="0.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pmiMonthlyPayment">PMI Monthly Payment</Label>
                    <Input
                      id="pmiMonthlyPayment"
                      type="number"
                      value={inputs.pmiMonthlyPayment}
                      onChange={(e) => handleInputChange('pmiMonthlyPayment', parseFloat(e.target.value))}
                      placeholder="125"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pmiStartDate">PMI Start Date</Label>
                    <Input
                      id="pmiStartDate"
                      type="date"
                      value={inputs.pmiStartDate}
                      onChange={(e) => handleInputChange('pmiStartDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pmiCancellationMethod">Cancellation Method</Label>
                    <Select value={inputs.pmiCancellationMethod} onValueChange={(value) => handleInputChange('pmiCancellationMethod', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="request">Request</SelectItem>
                        <SelectItem value="refinance">Refinance</SelectItem>
                        <SelectItem value="appraisal">Appraisal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Loan History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Loan History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanStartDate">Loan Start Date</Label>
                    <Input
                      id="loanStartDate"
                      type="date"
                      value={inputs.loanStartDate}
                      onChange={(e) => handleInputChange('loanStartDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalDownPayment">Original Down Payment</Label>
                    <Input
                      id="originalDownPayment"
                      type="number"
                      value={inputs.originalDownPayment}
                      onChange={(e) => handleInputChange('originalDownPayment', parseFloat(e.target.value))}
                      placeholder="75000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalDownPaymentPercentage">Down Payment %</Label>
                    <Input
                      id="originalDownPaymentPercentage"
                      type="number"
                      value={inputs.originalDownPaymentPercentage}
                      onChange={(e) => handleInputChange('originalDownPaymentPercentage', parseFloat(e.target.value))}
                      placeholder="20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentsMade">Payments Made</Label>
                    <Input
                      id="paymentsMade"
                      type="number"
                      value={inputs.paymentsMade}
                      onChange={(e) => handleInputChange('paymentsMade', parseFloat(e.target.value))}
                      placeholder="12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthsSinceLoanStart">Months Since Loan Start</Label>
                    <Input
                      id="monthsSinceLoanStart"
                      type="number"
                      value={inputs.monthsSinceLoanStart}
                      onChange={(e) => handleInputChange('monthsSinceLoanStart', parseFloat(e.target.value))}
                      placeholder="12"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Borrower Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Borrower Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="borrowerIncome">Annual Income</Label>
                    <Input
                      id="borrowerIncome"
                      type="number"
                      value={inputs.borrowerIncome}
                      onChange={(e) => handleInputChange('borrowerIncome', parseFloat(e.target.value))}
                      placeholder="80000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="borrowerCreditScore">Credit Score</Label>
                    <Input
                      id="borrowerCreditScore"
                      type="number"
                      value={inputs.borrowerCreditScore}
                      onChange={(e) => handleInputChange('borrowerCreditScore', parseFloat(e.target.value))}
                      placeholder="750"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="borrowerDebtToIncomeRatio">Debt-to-Income Ratio (%)</Label>
                    <Input
                      id="borrowerDebtToIncomeRatio"
                      type="number"
                      value={inputs.borrowerDebtToIncomeRatio}
                      onChange={(e) => handleInputChange('borrowerDebtToIncomeRatio', parseFloat(e.target.value))}
                      placeholder="35"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="borrowerEmploymentType">Employment Type</Label>
                    <Select value={inputs.borrowerEmploymentType} onValueChange={(value) => handleInputChange('borrowerEmploymentType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self_employed">Self Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="business_owner">Business Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Market Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Market Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marketLocation">Market Location</Label>
                    <Input
                      id="marketLocation"
                      type="text"
                      value={inputs.marketLocation}
                      onChange={(e) => handleInputChange('marketLocation', e.target.value)}
                      placeholder="Suburban"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketCondition">Market Condition</Label>
                    <Select value={inputs.marketCondition} onValueChange={(value) => handleInputChange('marketCondition', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="declining">Declining</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="growing">Growing</SelectItem>
                        <SelectItem value="hot">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketGrowthRate">Market Growth Rate (%)</Label>
                    <Input
                      id="marketGrowthRate"
                      type="number"
                      value={inputs.marketGrowthRate}
                      onChange={(e) => handleInputChange('marketGrowthRate', parseFloat(e.target.value))}
                      placeholder="3.0"
                    />
                  </div>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Please fix the following errors:
                    <ul className="list-disc list-inside mt-2">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={calculate} disabled={isCalculating} className="w-full">
                {isCalculating ? 'Calculating...' : 'Calculate PMI Cancellation'}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* PMI Eligibility Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle>PMI Cancellation Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {results.pmiEligibility ? 'Eligible' : 'Not Eligible'}
                          </div>
                          <div className="text-sm text-gray-600">PMI Eligibility</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatValue(results.currentLtvRatio, 'percentage')}
                          </div>
                          <div className="text-sm text-gray-600">Current LTV Ratio</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatValue(results.monthlyPMISavings)}
                          </div>
                          <div className="text-sm text-gray-600">Monthly PMI Savings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatValue(results.totalPMISavings)}
                          </div>
                          <div className="text-sm text-gray-600">Total PMI Savings</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cancellation Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cancellation Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-lg font-semibold text-green-600">
                            {results.automaticCancellationDate}
                          </div>
                          <div className="text-sm text-gray-600">Automatic Cancellation Date</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg font-semibold text-blue-600">
                            {results.requestCancellationDate}
                          </div>
                          <div className="text-sm text-gray-600">Request Cancellation Date</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">
                            {results.monthsToAutomaticCancellation} months
                          </div>
                          <div className="text-sm text-gray-600">To Automatic Cancellation</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">
                            {results.monthsToRequestCancellation} months
                          </div>
                          <div className="text-sm text-gray-600">To Request Cancellation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financial Impact */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.breakEvenMonths, 'number')} months</div>
                          <div className="text-sm text-gray-600">Break-Even Period</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.paymentReduction)}</div>
                          <div className="text-sm text-gray-600">Monthly Payment Reduction</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.totalPaymentSavings)}</div>
                          <div className="text-sm text-gray-600">Total Payment Savings</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.currentEquity)}</div>
                          <div className="text-sm text-gray-600">Current Equity</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.equityPercentage, 'percentage')}</div>
                          <div className="text-sm text-gray-600">Equity Percentage</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.riskScore, 'number')}</div>
                          <div className="text-sm text-gray-600">Risk Score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate PMI cancellation to see results</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <div className="space-y-6">
                  {/* Analysis Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center">
                          <Badge variant={results.analysis.cancellationRating === 'Eligible Now' ? 'default' : 'secondary'}>
                            {results.analysis.cancellationRating}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Cancellation Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.savingsRating === 'High Savings' ? 'default' : 'secondary'}>
                            {results.analysis.savingsRating}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Savings Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.recommendation === 'Cancel Now' ? 'default' : 'secondary'}>
                            {results.analysis.recommendation}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Recommendation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendation */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium">{results.analysis.recommendation}</p>
                    </CardContent>
                  </Card>

                  {/* Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Areas for Improvement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="text-red-700">{weakness}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Market Risk</h4>
                          <p className="text-gray-600">{results.analysis.marketRisk}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Appraisal Risk</h4>
                          <p className="text-gray-600">{results.analysis.appraisalRisk}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Timing Risk</h4>
                          <p className="text-gray-600">{results.analysis.timingRisk}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate PMI cancellation to see analysis</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              {results?.timelineAnalysis ? (
                <div className="space-y-6">
                  {/* Timeline Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>PMI Cancellation Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.timelineAnalysis.slice(0, 12).map((timeline, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium">Month {timeline.month}</span>
                              <div className="text-sm text-gray-600">{timeline.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{formatValue(timeline.ltvRatio, 'percentage')}</div>
                              <div className="text-sm text-gray-600">LTV Ratio</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{formatValue(timeline.pmiPayment)}</div>
                              <div className="text-sm text-gray-600">PMI Payment</div>
                            </div>
                            <div className="text-right">
                              <Badge variant={timeline.eligibility ? 'default' : 'secondary'}>
                                {timeline.eligibility ? 'Eligible' : 'Not Eligible'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate PMI cancellation to see timeline</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}