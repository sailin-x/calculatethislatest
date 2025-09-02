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
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Home, CreditCard, BarChart3, PieChart, Calendar, Target, User, Users, Building, Shield, TrendingDown, Percent, Zap, Award, AlertCircle } from 'lucide-react';

import { MortgageQualificationInputs, MortgageQualificationOutputs, MortgageQualificationAnalysis } from './types';
import { calculateMortgageQualification } from './formulas';
import { validateMortgageQualificationInputs } from './validation';
import { validateField } from './quickValidation';

interface MortgageQualificationCalculatorProps {
  onCalculate?: (results: MortgageQualificationOutputs) => void;
  initialInputs?: Partial<MortgageQualificationInputs>;
}

export function MortgageQualificationCalculator({ onCalculate, initialInputs }: MortgageQualificationCalculatorProps) {
  const [inputs, setInputs] = useState<MortgageQualificationInputs>({
    // Borrower Information
    borrowerIncome: initialInputs?.borrowerIncome || 80000,
    coBorrowerIncome: initialInputs?.coBorrowerIncome || 0,
    borrowerCreditScore: initialInputs?.borrowerCreditScore || 750,
    coBorrowerCreditScore: initialInputs?.coBorrowerCreditScore || 0,
    borrowerEmploymentType: initialInputs?.borrowerEmploymentType || 'employed',
    coBorrowerEmploymentType: initialInputs?.coBorrowerEmploymentType || 'unemployed',
    borrowerEmploymentLength: initialInputs?.borrowerEmploymentLength || 5,
    coBorrowerEmploymentLength: initialInputs?.coBorrowerEmploymentLength || 0,
    
    // Income Details
    baseSalary: initialInputs?.baseSalary || 70000,
    overtimeIncome: initialInputs?.overtimeIncome || 5000,
    bonusIncome: initialInputs?.bonusIncome || 3000,
    commissionIncome: initialInputs?.commissionIncome || 0,
    rentalIncome: initialInputs?.rentalIncome || 0,
    investmentIncome: initialInputs?.investmentIncome || 2000,
    otherIncome: initialInputs?.otherIncome || 0,
    
    // Assets and Liabilities
    borrowerAssets: initialInputs?.borrowerAssets || 50000,
    coBorrowerAssets: initialInputs?.coBorrowerAssets || 0,
    borrowerLiquidity: initialInputs?.borrowerLiquidity || 25000,
    coBorrowerLiquidity: initialInputs?.coBorrowerLiquidity || 0,
    borrowerDebts: initialInputs?.borrowerDebts || 15000,
    coBorrowerDebts: initialInputs?.coBorrowerDebts || 0,
    
    // Property Information
    propertyValue: initialInputs?.propertyValue || 400000,
    propertyAddress: initialInputs?.propertyAddress || '123 Main St, Anytown, USA',
    propertyType: initialInputs?.propertyType || 'single_family',
    propertySize: initialInputs?.propertySize || 2000,
    propertyAge: initialInputs?.propertyAge || 15,
    
    // Loan Information
    loanAmount: initialInputs?.loanAmount || 320000,
    interestRate: initialInputs?.interestRate || 6.5,
    loanTerm: initialInputs?.loanTerm || 30,
    loanType: initialInputs?.loanType || 'conventional',
    paymentType: initialInputs?.paymentType || 'principal_interest',
    
    // Down Payment Information
    downPayment: initialInputs?.downPayment || 80000,
    downPaymentPercentage: initialInputs?.downPaymentPercentage || 20,
    downPaymentSource: initialInputs?.downPaymentSource || 'savings',
    
    // Insurance and Taxes
    propertyInsurance: initialInputs?.propertyInsurance || 1200,
    propertyTaxes: initialInputs?.propertyTaxes || 4800,
    hoaFees: initialInputs?.hoaFees || 0,
    floodInsurance: initialInputs?.floodInsurance || 0,
    mortgageInsurance: initialInputs?.mortgageInsurance || 0,
    mortgageInsuranceRate: initialInputs?.mortgageInsuranceRate || 0,
    
    // Debt Information
    creditCardDebt: initialInputs?.creditCardDebt || 5000,
    autoLoanDebt: initialInputs?.autoLoanDebt || 8000,
    studentLoanDebt: initialInputs?.studentLoanDebt || 2000,
    personalLoanDebt: initialInputs?.personalLoanDebt || 0,
    otherDebt: initialInputs?.otherDebt || 0,
    
    // Loan Program Requirements
    maxDebtToIncomeRatio: initialInputs?.maxDebtToIncomeRatio || 43,
    maxHousingExpenseRatio: initialInputs?.maxHousingExpenseRatio || 28,
    minCreditScore: initialInputs?.minCreditScore || 620,
    minDownPayment: initialInputs?.minDownPayment || 3.5,
    maxLoanAmount: initialInputs?.maxLoanAmount || 726200,
    
    // Market Information
    marketLocation: initialInputs?.marketLocation || 'Suburban',
    marketCondition: initialInputs?.marketCondition || 'stable',
    marketGrowthRate: initialInputs?.marketGrowthRate || 3,
    
    // Analysis Parameters
    analysisPeriod: initialInputs?.analysisPeriod || 30,
    inflationRate: initialInputs?.inflationRate || 2.5,
    propertyAppreciationRate: initialInputs?.propertyAppreciationRate || 3,
    discountRate: initialInputs?.discountRate || 5,
    
    // Reporting Preferences
    currency: initialInputs?.currency || 'USD',
    displayFormat: initialInputs?.displayFormat || 'currency',
    includeCharts: initialInputs?.includeCharts ?? true,
  });

  const [results, setResults] = useState<MortgageQualificationOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof MortgageQualificationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const validation = validateMortgageQualificationInputs(inputs);
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
      const calculatedResults = calculateMortgageQualification(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
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
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const getQualificationStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'conditional': return 'bg-yellow-100 text-yellow-800';
      case 'denied': return 'bg-red-100 text-red-800';
      case 'requires_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualificationStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'conditional': return <AlertTriangle className="h-4 w-4" />;
      case 'denied': return <AlertCircle className="h-4 w-4" />;
      case 'requires_review': return <Clock className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Mortgage Qualification Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Borrower Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5" />
                      Borrower Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="borrowerIncome">Annual Income</Label>
                      <Input
                        id="borrowerIncome"
                        type="number"
                        value={inputs.borrowerIncome}
                        onChange={(e) => handleInputChange('borrowerIncome', parseFloat(e.target.value) || 0)}
                        placeholder="80000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="borrowerCreditScore">Credit Score</Label>
                      <Input
                        id="borrowerCreditScore"
                        type="number"
                        value={inputs.borrowerCreditScore}
                        onChange={(e) => handleInputChange('borrowerCreditScore', parseFloat(e.target.value) || 0)}
                        placeholder="750"
                      />
                    </div>
                    <div>
                      <Label htmlFor="borrowerEmploymentType">Employment Type</Label>
                      <Select value={inputs.borrowerEmploymentType} onValueChange={(value) => handleInputChange('borrowerEmploymentType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self_employed">Self-Employed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="business_owner">Business Owner</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="borrowerEmploymentLength">Employment Length (Years)</Label>
                      <Input
                        id="borrowerEmploymentLength"
                        type="number"
                        value={inputs.borrowerEmploymentLength}
                        onChange={(e) => handleInputChange('borrowerEmploymentLength', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Co-Borrower Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5" />
                      Co-Borrower Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="coBorrowerIncome">Annual Income</Label>
                      <Input
                        id="coBorrowerIncome"
                        type="number"
                        value={inputs.coBorrowerIncome}
                        onChange={(e) => handleInputChange('coBorrowerIncome', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="coBorrowerCreditScore">Credit Score</Label>
                      <Input
                        id="coBorrowerCreditScore"
                        type="number"
                        value={inputs.coBorrowerCreditScore}
                        onChange={(e) => handleInputChange('coBorrowerCreditScore', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="coBorrowerEmploymentType">Employment Type</Label>
                      <Select value={inputs.coBorrowerEmploymentType} onValueChange={(value) => handleInputChange('coBorrowerEmploymentType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self_employed">Self-Employed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="business_owner">Business Owner</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="coBorrowerEmploymentLength">Employment Length (Years)</Label>
                      <Input
                        id="coBorrowerEmploymentLength"
                        type="number"
                        value={inputs.coBorrowerEmploymentLength}
                        onChange={(e) => handleInputChange('coBorrowerEmploymentLength', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Income Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <DollarSign className="h-5 w-5" />
                      Income Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="baseSalary">Base Salary</Label>
                      <Input
                        id="baseSalary"
                        type="number"
                        value={inputs.baseSalary}
                        onChange={(e) => handleInputChange('baseSalary', parseFloat(e.target.value) || 0)}
                        placeholder="70000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="overtimeIncome">Overtime Income</Label>
                      <Input
                        id="overtimeIncome"
                        type="number"
                        value={inputs.overtimeIncome}
                        onChange={(e) => handleInputChange('overtimeIncome', parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bonusIncome">Bonus Income</Label>
                      <Input
                        id="bonusIncome"
                        type="number"
                        value={inputs.bonusIncome}
                        onChange={(e) => handleInputChange('bonusIncome', parseFloat(e.target.value) || 0)}
                        placeholder="3000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="commissionIncome">Commission Income</Label>
                      <Input
                        id="commissionIncome"
                        type="number"
                        value={inputs.commissionIncome}
                        onChange={(e) => handleInputChange('commissionIncome', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentalIncome">Rental Income</Label>
                      <Input
                        id="rentalIncome"
                        type="number"
                        value={inputs.rentalIncome}
                        onChange={(e) => handleInputChange('rentalIncome', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="investmentIncome">Investment Income</Label>
                      <Input
                        id="investmentIncome"
                        type="number"
                        value={inputs.investmentIncome}
                        onChange={(e) => handleInputChange('investmentIncome', parseFloat(e.target.value) || 0)}
                        placeholder="2000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherIncome">Other Income</Label>
                      <Input
                        id="otherIncome"
                        type="number"
                        value={inputs.otherIncome}
                        onChange={(e) => handleInputChange('otherIncome', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="h-5 w-5" />
                      Property Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="propertyValue">Property Value</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={inputs.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value) || 0)}
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
                          <SelectItem value="condo">Condo</SelectItem>
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
                        onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value) || 0)}
                        placeholder="2000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyAge">Property Age (years)</Label>
                      <Input
                        id="propertyAge"
                        type="number"
                        value={inputs.propertyAge}
                        onChange={(e) => handleInputChange('propertyAge', parseFloat(e.target.value) || 0)}
                        placeholder="15"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Loan Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="h-5 w-5" />
                      Loan Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={inputs.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                        placeholder="320000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                        placeholder="6.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <Input
                        id="loanTerm"
                        type="number"
                        value={inputs.loanTerm}
                        onChange={(e) => handleInputChange('loanTerm', parseFloat(e.target.value) || 0)}
                        placeholder="30"
                      />
                    </div>
                    <div>
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
                          <SelectItem value="hard_money">Hard Money</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
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
                  </CardContent>
                </Card>

                {/* Debt Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingDown className="h-5 w-5" />
                      Debt Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="creditCardDebt">Credit Card Debt</Label>
                      <Input
                        id="creditCardDebt"
                        type="number"
                        value={inputs.creditCardDebt}
                        onChange={(e) => handleInputChange('creditCardDebt', parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="autoLoanDebt">Auto Loan Debt</Label>
                      <Input
                        id="autoLoanDebt"
                        type="number"
                        value={inputs.autoLoanDebt}
                        onChange={(e) => handleInputChange('autoLoanDebt', parseFloat(e.target.value) || 0)}
                        placeholder="8000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentLoanDebt">Student Loan Debt</Label>
                      <Input
                        id="studentLoanDebt"
                        type="number"
                        value={inputs.studentLoanDebt}
                        onChange={(e) => handleInputChange('studentLoanDebt', parseFloat(e.target.value) || 0)}
                        placeholder="2000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personalLoanDebt">Personal Loan Debt</Label>
                      <Input
                        id="personalLoanDebt"
                        type="number"
                        value={inputs.personalLoanDebt}
                        onChange={(e) => handleInputChange('personalLoanDebt', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherDebt">Other Debt</Label>
                      <Input
                        id="otherDebt"
                        type="number"
                        value={inputs.otherDebt}
                        onChange={(e) => handleInputChange('otherDebt', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button onClick={calculate} disabled={isCalculating} className="w-full max-w-md">
                  {isCalculating ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Qualification
                    </>
                  )}
                </Button>
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please fix the following errors:
                    <ul className="mt-2 list-disc list-inside">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <>
                  {/* Qualification Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-6 w-6" />
                        Qualification Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge className={`${getQualificationStatusColor(results.qualificationStatus)} flex items-center gap-2`}>
                            {getQualificationStatusIcon(results.qualificationStatus)}
                            {results.qualificationStatus.toUpperCase()}
                          </Badge>
                          <div className="text-2xl font-bold">{formatPercentage(results.qualificationScore)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Probability of Approval</div>
                          <div className="text-xl font-semibold">{formatPercentage(results.probabilityOfApproval)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground">DTI Ratio</div>
                        </div>
                        <div className="text-2xl font-bold">{formatPercentage(results.debtToIncomeRatio)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground">Housing Ratio</div>
                        </div>
                        <div className="text-2xl font-bold">{formatPercentage(results.housingExpenseRatio)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground">Credit Score</div>
                        </div>
                        <div className="text-2xl font-bold">{results.averageCreditScore}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground">Max Loan</div>
                        </div>
                        <div className="text-2xl font-bold">{formatCurrency(results.maxAffordableLoan)}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Monthly Payment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Payment Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Principal & Interest</div>
                          <div className="text-xl font-semibold">{formatCurrency(results.monthlyPayment)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Total Monthly Payment</div>
                          <div className="text-xl font-semibold">{formatCurrency(results.totalMonthlyPayment)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Payment to Income Ratio</div>
                          <div className="text-xl font-semibold">{formatPercentage(results.paymentToIncomeRatio)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Enter your information and click "Calculate Qualification" to see results.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <>
                  {/* Executive Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Executive Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Qualification Rating</div>
                          <div className="text-lg font-semibold">{results.analysis.qualificationRating}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Approval Rating</div>
                          <div className="text-lg font-semibold">{results.analysis.approvalRating}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Recommendation</div>
                          <div className="text-lg font-semibold">{results.analysis.recommendation}</div>
                        </div>
                      </div>
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
                              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Approval Recommendations</h4>
                          <ul className="space-y-1">
                            {results.analysis.approvalRecommendations.map((rec, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Improvement Suggestions</h4>
                          <ul className="space-y-1">
                            {results.analysis.improvementSuggestions.map((suggestion, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Calculate qualification to see detailed analysis.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {results?.comparisonAnalysis ? (
                <>
                  {/* Loan Type Comparison */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Loan Type Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.comparisonAnalysis.map((comparison, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{comparison.loanType}</h4>
                              <Badge className={getQualificationStatusColor(comparison.qualificationStatus)}>
                                {comparison.qualificationStatus.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Max Loan</div>
                                <div className="font-semibold">{formatCurrency(comparison.maxLoan)}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Rate</div>
                                <div className="font-semibold">{formatPercentage(comparison.rate)}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Payment</div>
                                <div className="font-semibold">{formatCurrency(comparison.payment)}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Status</div>
                                <div className="font-semibold">{comparison.qualificationStatus}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Factors */}
                  {results.riskFactors && results.riskFactors.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Risk Factors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Calculate qualification to see comparison analysis.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}