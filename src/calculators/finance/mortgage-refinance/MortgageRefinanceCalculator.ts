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
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target, 
  BarChart3, 
  PieChart, 
  Shield, 
  Zap, 
  Award, 
  AlertCircle, 
  Info, 
  Clock3, 
  CalendarDays, 
  TrendingUp2, 
  TrendingDown2, 
  DollarSignIcon, 
  Percent, 
  Timer,
  Home,
  CreditCard,
  FileText,
  User,
  MapPin,
  Settings,
  ChartBar
} from 'lucide-react';

import { MortgageRefinanceInputs, MortgageRefinanceOutputs, MortgageRefinanceAnalysis } from './types';
import { calculateMortgageRefinance } from './formulas';
import { validateMortgageRefinanceInputs } from './validation';
import { validateField } from './quickValidation';

interface MortgageRefinanceCalculatorProps {
  onCalculate?: (results: MortgageRefinanceOutputs) => void;
  initialInputs?: Partial<MortgageRefinanceInputs>;
}

export function MortgageRefinanceCalculator({ onCalculate, initialInputs }: MortgageRefinanceCalculatorProps) {
  const [inputs, setInputs] = useState<MortgageRefinanceInputs>({
    // Current Loan Information
    currentLoanAmount: 300000,
    currentInterestRate: 5.5,
    currentLoanTerm: 30,
    currentLoanType: 'conventional',
    currentPaymentType: 'principal_interest',
    currentMonthlyPayment: 1703,
    currentRemainingTerm: 25,
    currentPrincipalBalance: 280000,
    
    // New Loan Information
    newLoanAmount: 280000,
    newInterestRate: 4.25,
    newLoanTerm: 30,
    newLoanType: 'conventional',
    newPaymentType: 'principal_interest',
    refinanceType: 'rate_term',
    
    // Property Information
    propertyValue: 400000,
    propertyAddress: '123 Main St, Anytown, USA',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    
    // Refinance Costs
    closingCosts: 5000,
    originationFee: 1000,
    appraisalFee: 500,
    titleInsuranceFee: 800,
    recordingFee: 200,
    attorneyFee: 500,
    creditReportFee: 50,
    floodCertificationFee: 20,
    taxServiceFee: 100,
    otherFees: 830,
    
    // Borrower Information
    borrowerIncome: 75000,
    borrowerCreditScore: 720,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed',
    borrowerTaxRate: 25,
    
    // Market Information
    marketLocation: 'Anytown, USA',
    marketCondition: 'stable',
    marketGrowthRate: 3.0,
    
    // Analysis Parameters
    analysisPeriod: 30,
    inflationRate: 2.5,
    propertyAppreciationRate: 3.0,
    discountRate: 5.0,
    taxDeductionPeriod: 30,
    
    // Refinance Goals
    refinanceGoal: 'lower_payment',
    targetMonthlySavings: 200,
    targetRate: 4.0,
    cashOutAmount: 0,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<MortgageRefinanceOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof MortgageRefinanceInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || 'Invalid value' }));
    }
  };

  const validateInputs = (): boolean => {
    const validation = validateMortgageRefinanceInputs(inputs);
    if (!validation.isValid) {
      setErrors(validation.errors || {});
      return false;
    }
    setErrors({});
    return true;
  };

  const calculate = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsCalculating(true);
    try {
      const calculatedResults = calculateMortgageRefinance(inputs);
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

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Average': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-orange-100 text-orange-800';
      case 'Very Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Proceed': return 'bg-green-100 text-green-800';
      case 'Consider': return 'bg-blue-100 text-blue-800';
      case 'Don\'t Refinance': return 'bg-red-100 text-red-800';
      case 'Requires Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Mortgage Refinance Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Inputs
              </TabsTrigger>
              <TabsTrigger value="results" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Results
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Comparison
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Current Loan Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="h-5 w-5" />
                      Current Loan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentLoanAmount">Current Loan Amount</Label>
                      <Input
                        id="currentLoanAmount"
                        type="number"
                        value={inputs.currentLoanAmount}
                        onChange={(e) => handleInputChange('currentLoanAmount', parseFloat(e.target.value))}
                        placeholder="300000"
                      />
                      {errors.currentLoanAmount && (
                        <p className="text-sm text-red-600">{errors.currentLoanAmount}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
                      <Input
                        id="currentInterestRate"
                        type="number"
                        step="0.01"
                        value={inputs.currentInterestRate}
                        onChange={(e) => handleInputChange('currentInterestRate', parseFloat(e.target.value))}
                        placeholder="5.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentLoanTerm">Current Loan Term (Years)</Label>
                      <Input
                        id="currentLoanTerm"
                        type="number"
                        value={inputs.currentLoanTerm}
                        onChange={(e) => handleInputChange('currentLoanTerm', parseInt(e.target.value))}
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentLoanType">Current Loan Type</Label>
                      <Select value={inputs.currentLoanType} onValueChange={(value) => handleInputChange('currentLoanType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conventional">Conventional</SelectItem>
                          <SelectItem value="fha">FHA</SelectItem>
                          <SelectItem value="va">VA</SelectItem>
                          <SelectItem value="usda">USDA</SelectItem>
                          <SelectItem value="jumbo">Jumbo</SelectItem>
                          <SelectItem value="hard_money">Hard Money</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="currentRemainingTerm">Remaining Term (Years)</Label>
                      <Input
                        id="currentRemainingTerm"
                        type="number"
                        value={inputs.currentRemainingTerm}
                        onChange={(e) => handleInputChange('currentRemainingTerm', parseInt(e.target.value))}
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentPrincipalBalance">Current Principal Balance</Label>
                      <Input
                        id="currentPrincipalBalance"
                        type="number"
                        value={inputs.currentPrincipalBalance}
                        onChange={(e) => handleInputChange('currentPrincipalBalance', parseFloat(e.target.value))}
                        placeholder="280000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* New Loan Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5" />
                      New Loan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="newLoanAmount">New Loan Amount</Label>
                      <Input
                        id="newLoanAmount"
                        type="number"
                        value={inputs.newLoanAmount}
                        onChange={(e) => handleInputChange('newLoanAmount', parseFloat(e.target.value))}
                        placeholder="280000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newInterestRate">New Interest Rate (%)</Label>
                      <Input
                        id="newInterestRate"
                        type="number"
                        step="0.01"
                        value={inputs.newInterestRate}
                        onChange={(e) => handleInputChange('newInterestRate', parseFloat(e.target.value))}
                        placeholder="4.25"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newLoanTerm">New Loan Term (Years)</Label>
                      <Input
                        id="newLoanTerm"
                        type="number"
                        value={inputs.newLoanTerm}
                        onChange={(e) => handleInputChange('newLoanTerm', parseInt(e.target.value))}
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="refinanceType">Refinance Type</Label>
                      <Select value={inputs.refinanceType} onValueChange={(value) => handleInputChange('refinanceType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rate_term">Rate & Term</SelectItem>
                          <SelectItem value="cash_out">Cash Out</SelectItem>
                          <SelectItem value="cash_in">Cash In</SelectItem>
                          <SelectItem value="streamline">Streamline</SelectItem>
                          <SelectItem value="fha_to_conventional">FHA to Conventional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="refinanceGoal">Refinance Goal</Label>
                      <Select value={inputs.refinanceGoal} onValueChange={(value) => handleInputChange('refinanceGoal', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lower_payment">Lower Payment</SelectItem>
                          <SelectItem value="lower_rate">Lower Rate</SelectItem>
                          <SelectItem value="cash_out">Cash Out</SelectItem>
                          <SelectItem value="shorter_term">Shorter Term</SelectItem>
                          <SelectItem value="remove_pmi">Remove PMI</SelectItem>
                          <SelectItem value="consolidate_debt">Consolidate Debt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="h-5 w-5" />
                      Property
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="propertyValue">Property Value</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={inputs.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                        placeholder="400000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input
                        id="propertyAddress"
                        type="text"
                        value={inputs.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        placeholder="123 Main St, Anytown, USA"
                      />
                    </div>

                    <div>
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single_family">Single Family</SelectItem>
                          <SelectItem value="multi_family">Multi-Family</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                      <Input
                        id="propertySize"
                        type="number"
                        value={inputs.propertySize}
                        onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                        placeholder="2000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="propertyAge">Property Age (Years)</Label>
                      <Input
                        id="propertyAge"
                        type="number"
                        value={inputs.propertyAge}
                        onChange={(e) => handleInputChange('propertyAge', parseFloat(e.target.value))}
                        placeholder="15"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Refinance Costs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <DollarSign className="h-5 w-5" />
                      Refinance Costs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="closingCosts">Total Closing Costs</Label>
                      <Input
                        id="closingCosts"
                        type="number"
                        value={inputs.closingCosts}
                        onChange={(e) => handleInputChange('closingCosts', parseFloat(e.target.value))}
                        placeholder="5000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="originationFee">Origination Fee</Label>
                      <Input
                        id="originationFee"
                        type="number"
                        value={inputs.originationFee}
                        onChange={(e) => handleInputChange('originationFee', parseFloat(e.target.value))}
                        placeholder="1000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="appraisalFee">Appraisal Fee</Label>
                      <Input
                        id="appraisalFee"
                        type="number"
                        value={inputs.appraisalFee}
                        onChange={(e) => handleInputChange('appraisalFee', parseFloat(e.target.value))}
                        placeholder="500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="titleInsuranceFee">Title Insurance Fee</Label>
                      <Input
                        id="titleInsuranceFee"
                        type="number"
                        value={inputs.titleInsuranceFee}
                        onChange={(e) => handleInputChange('titleInsuranceFee', parseFloat(e.target.value))}
                        placeholder="800"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Borrower Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5" />
                      Borrower
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="borrowerIncome">Annual Income</Label>
                      <Input
                        id="borrowerIncome"
                        type="number"
                        value={inputs.borrowerIncome}
                        onChange={(e) => handleInputChange('borrowerIncome', parseFloat(e.target.value))}
                        placeholder="75000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="borrowerCreditScore">Credit Score</Label>
                      <Input
                        id="borrowerCreditScore"
                        type="number"
                        value={inputs.borrowerCreditScore}
                        onChange={(e) => handleInputChange('borrowerCreditScore', parseInt(e.target.value))}
                        placeholder="720"
                      />
                    </div>

                    <div>
                      <Label htmlFor="borrowerDebtToIncomeRatio">Debt-to-Income Ratio (%)</Label>
                      <Input
                        id="borrowerDebtToIncomeRatio"
                        type="number"
                        step="0.1"
                        value={inputs.borrowerDebtToIncomeRatio}
                        onChange={(e) => handleInputChange('borrowerDebtToIncomeRatio', parseFloat(e.target.value))}
                        placeholder="35"
                      />
                    </div>

                    <div>
                      <Label htmlFor="borrowerTaxRate">Tax Rate (%)</Label>
                      <Input
                        id="borrowerTaxRate"
                        type="number"
                        step="0.1"
                        value={inputs.borrowerTaxRate}
                        onChange={(e) => handleInputChange('borrowerTaxRate', parseFloat(e.target.value))}
                        placeholder="25"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Market Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5" />
                      Market
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="marketLocation">Market Location</Label>
                      <Input
                        id="marketLocation"
                        type="text"
                        value={inputs.marketLocation}
                        onChange={(e) => handleInputChange('marketLocation', e.target.value)}
                        placeholder="Anytown, USA"
                      />
                    </div>

                    <div>
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

                    <div>
                      <Label htmlFor="marketGrowthRate">Market Growth Rate (%)</Label>
                      <Input
                        id="marketGrowthRate"
                        type="number"
                        step="0.1"
                        value={inputs.marketGrowthRate}
                        onChange={(e) => handleInputChange('marketGrowthRate', parseFloat(e.target.value))}
                        placeholder="3.0"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={calculate} 
                  disabled={isCalculating}
                  className="w-full max-w-md"
                >
                  {isCalculating ? (
                    <>
                      <Clock3 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Refinance Analysis
                    </>
                  )}
                </Button>
              </div>

              {errors.general && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Core Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Core Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Monthly Payment Savings:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.monthlyPaymentSavings)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Savings:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.interestSavings)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break-Even (Months):</span>
                        <span className="font-semibold">
                          {results.breakEvenMonths.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Savings:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.netSavings)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>ROI:</span>
                        <span className="font-semibold text-blue-600">
                          {formatPercentage(results.returnOnInvestment)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Payment Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Current Payment:</span>
                        <span className="font-semibold">
                          {formatCurrency(results.currentMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Payment:</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(results.newMonthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Difference:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.monthlyPaymentDifference)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Savings:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.annualPaymentSavings)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cost Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Cost Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Refinance Cost:</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(results.totalRefinanceCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payback Period:</span>
                        <span className="font-semibold">
                          {results.paybackPeriod.toFixed(1)} years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Score:</span>
                        <span className="font-semibold">
                          {results.riskScore.toFixed(1)}/100
                        </span>
                      </div>
                      <Progress value={results.riskScore} className="w-full" />
                    </CardContent>
                  </Card>

                  {/* Tax Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Percent className="h-5 w-5" />
                        Tax Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Tax Deduction:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.taxDeduction)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>After-Tax Savings:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.afterTaxSavings)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Effective Tax Rate:</span>
                        <span className="font-semibold">
                          {formatPercentage(results.effectiveTaxRate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Benefit:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.taxBenefit)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Equity Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Equity Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Current Equity:</span>
                        <span className="font-semibold">
                          {formatCurrency(results.currentEquity)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Equity:</span>
                        <span className="font-semibold">
                          {formatCurrency(results.newEquity)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equity Change:</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(results.equityChange)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>LTV Ratio:</span>
                        <span className="font-semibold">
                          {formatPercentage(results.loanToValueRatio)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cash Flow Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Cash Flow
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Monthly Cash Flow:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.monthlyCashFlow)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Cash Flow:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.annualCashFlow)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cash Flow:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.totalCashFlow)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cash Flow Improvement:</span>
                        <span className="font-semibold text-green-600">
                          {formatPercentage(results.cashFlowImprovement)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Click "Calculate Refinance Analysis" to see results.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <div className="space-y-6">
                  {/* Executive Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Executive Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <Badge className={getRatingColor(results.analysis.refinanceRating)}>
                          {results.analysis.refinanceRating}
                        </Badge>
                        <Badge className={getRatingColor(results.analysis.valueRating)}>
                          {results.analysis.valueRating}
                        </Badge>
                        <Badge className={getRecommendationColor(results.analysis.recommendation)}>
                          {results.analysis.recommendation}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{results.analysis.refinanceSummary}</p>
                    </CardContent>
                  </Card>

                  {/* Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Key Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                          Key Weaknesses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Detailed Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Payment Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.paymentAnalysis}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Cost Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.costAnalysis}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Break-Even Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.breakEvenSummary}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Risk Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.riskAnalysis}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Refinance Recommendations</h4>
                        <ul className="space-y-2">
                          {results.analysis.refinanceRecommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Optimization Suggestions</h4>
                        <ul className="space-y-2">
                          {results.analysis.optimizationSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Calculate refinance analysis to see detailed insights and recommendations.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {results?.comparisonAnalysis ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ChartBar className="h-5 w-5" />
                        Refinance Options Comparison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Option</th>
                              <th className="text-right p-2">Rate</th>
                              <th className="text-right p-2">Payment</th>
                              <th className="text-right p-2">Total Cost</th>
                              <th className="text-right p-2">Savings</th>
                              <th className="text-right p-2">Break-Even</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.comparisonAnalysis.map((option, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2 font-medium">{option.option}</td>
                                <td className="p-2 text-right">{formatPercentage(option.rate)}</td>
                                <td className="p-2 text-right">{formatCurrency(option.payment)}</td>
                                <td className="p-2 text-right">{formatCurrency(option.totalCost)}</td>
                                <td className="p-2 text-right text-green-600">{formatCurrency(option.savings)}</td>
                                <td className="p-2 text-right">{option.breakEven.toFixed(1)} months</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {results.scenarios && results.scenarios.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp2 className="h-5 w-5" />
                          Scenario Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {results.scenarios.map((scenario, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <h4 className="font-semibold mb-2">{scenario.scenario}</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Probability:</span>
                                  <span>{formatPercentage(scenario.probability)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Rate:</span>
                                  <span>{formatPercentage(scenario.rate)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Payment:</span>
                                  <span>{formatCurrency(scenario.payment)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Savings:</span>
                                  <span className="text-green-600">{formatCurrency(scenario.savings)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Calculate refinance analysis to see comparison data and scenarios.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}