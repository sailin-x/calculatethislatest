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
  ChartBar,
  Building,
  Key,
  PiggyBank,
  Scale,
  ArrowUpDown,
  HomeIcon,
  Building2
} from 'lucide-react';

import { MortgageVsRentInputs, MortgageVsRentOutputs, MortgageVsRentAnalysis } from './types';
import { calculateMortgageVsRent } from './formulas'; // Will be created next
import { validateMortgageVsRentInputs } from './validation'; // Will be created next
import { validateField } from './quickValidation'; // Will be created next

interface MortgageVsRentCalculatorProps {
  onCalculate?: (results: MortgageVsRentOutputs) => void;
  initialInputs?: Partial<MortgageVsRentInputs>;
}

export function MortgageVsRentCalculator({ onCalculate, initialInputs }: MortgageVsRentCalculatorProps) {
  const [inputs, setInputs] = useState<MortgageVsRentInputs>({
    // Property Information
    propertyValue: 350000,
    propertyAddress: '123 Main St, Anytown, USA',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    
    // Mortgage Information
    loanAmount: 280000,
    interestRate: 4.5,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    
    // Down Payment Information
    downPayment: 70000,
    downPaymentPercentage: 20,
    downPaymentSource: 'savings',
    
    // Rent Information
    monthlyRent: 2000,
    annualRent: 24000,
    rentIncreaseRate: 3.0,
    rentEscalationClause: false,
    rentEscalationRate: 2.5,
    
    // Insurance and Taxes
    propertyInsurance: 1200,
    propertyTaxes: 3500,
    hoaFees: 0,
    floodInsurance: 0,
    mortgageInsurance: 0,
    rentersInsurance: 300,
    
    // Maintenance and Utilities
    maintenanceCosts: 2400,
    utilityCosts: 1800,
    rentIncludesUtilities: false,
    utilitiesIncluded: [],
    
    // Closing Costs and Fees
    closingCosts: 5000,
    originationFee: 1000,
    appraisalFee: 500,
    titleInsuranceFee: 800,
    recordingFee: 200,
    attorneyFee: 300,
    otherFees: 2200,
    
    // Market Information
    marketLocation: 'Suburban',
    marketCondition: 'stable',
    marketGrowthRate: 3.0,
    propertyAppreciationRate: 3.0,
    rentGrowthRate: 2.5,
    
    // Borrower Information
    borrowerIncome: 80000,
    borrowerCreditScore: 750,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed',
    borrowerTaxRate: 25,
    
    // Investment Assumptions
    investmentReturnRate: 7.0,
    inflationRate: 2.5,
    discountRate: 5.0,
    analysisPeriod: 30,
    
    // Lifestyle Factors
    expectedStayDuration: 7,
    flexibilityNeeded: false,
    maintenancePreference: 'medium',
    locationStability: 'stable',
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs,
  });

  const [results, setResults] = useState<MortgageVsRentOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof MortgageVsRentInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Quick validation
    const validation = validateField(field, value, newInputs);
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
    const validation = validateMortgageVsRentInputs(inputs);
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
      const calculatedResults = calculateMortgageVsRent(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ calculation: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Buy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Consider Buying': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Consider Renting': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-6 w-6" />
            Mortgage vs. Rent Calculator
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
                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building className="h-5 w-5" />
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
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                        placeholder="350000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyAddress">Property Address</Label>
                      <Input
                        id="propertyAddress"
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
                          <SelectItem value="multi_family">Multi Family</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
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
                      <Label htmlFor="propertyAge">Property Age (years)</Label>
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

                {/* Mortgage Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="h-5 w-5" />
                      Mortgage Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={inputs.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value))}
                        placeholder="280000"
                      />
                    </div>
                    <div>
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
                    <div>
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <Input
                        id="loanTerm"
                        type="number"
                        value={inputs.loanTerm}
                        onChange={(e) => handleInputChange('loanTerm', parseFloat(e.target.value))}
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

                {/* Rent Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building2 className="h-5 w-5" />
                      Rent Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="monthlyRent">Monthly Rent</Label>
                      <Input
                        id="monthlyRent"
                        type="number"
                        value={inputs.monthlyRent}
                        onChange={(e) => handleInputChange('monthlyRent', parseFloat(e.target.value))}
                        placeholder="2000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="annualRent">Annual Rent</Label>
                      <Input
                        id="annualRent"
                        type="number"
                        value={inputs.annualRent}
                        onChange={(e) => handleInputChange('annualRent', parseFloat(e.target.value))}
                        placeholder="24000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentIncreaseRate">Rent Increase Rate (%)</Label>
                      <Input
                        id="rentIncreaseRate"
                        type="number"
                        step="0.01"
                        value={inputs.rentIncreaseRate}
                        onChange={(e) => handleInputChange('rentIncreaseRate', parseFloat(e.target.value))}
                        placeholder="3.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentEscalationRate">Rent Escalation Rate (%)</Label>
                      <Input
                        id="rentEscalationRate"
                        type="number"
                        step="0.01"
                        value={inputs.rentEscalationRate}
                        onChange={(e) => handleInputChange('rentEscalationRate', parseFloat(e.target.value))}
                        placeholder="2.5"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Additional inputs can be added here */}
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={calculate} 
                  disabled={isCalculating || Object.keys(errors).length > 0}
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
                      Calculate Comparison
                    </>
                  )}
                </Button>
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
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
                <div className="space-y-6">
                  {/* Recommendation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Recommendation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Badge className={`text-lg px-4 py-2 ${getRecommendationColor(results.recommendation)}`}>
                          {results.recommendation}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Based on your inputs and market conditions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Monthly Cost Difference</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.monthlyCostDifference)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {results.monthlyCostDifference > 0 ? 'Rent is cheaper' : 'Mortgage is cheaper'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Break-Even (Months)</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {results.breakEvenMonths.toFixed(0)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {results.breakEvenMonths > 0 ? 'Time to break even' : 'Immediate benefit'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Total Cost Difference</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.totalCostDifference)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Over {inputs.analysisPeriod} years
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Risk Score</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {results.riskScore.toFixed(0)}/100
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {results.riskScore < 30 ? 'Low Risk' : results.riskScore < 70 ? 'Medium Risk' : 'High Risk'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Detailed Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Monthly Payments</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Mortgage Payment:</span>
                              <span className="font-medium">{formatCurrency(results.monthlyMortgagePayment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Rent Payment:</span>
                              <span className="font-medium">{formatCurrency(results.monthlyRentPayment)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Difference:</span>
                              <span className={results.monthlyCostDifference > 0 ? 'text-red-600' : 'text-green-600'}>
                                {formatCurrency(Math.abs(results.monthlyCostDifference))}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">Total Costs (30 Years)</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Total Mortgage Cost:</span>
                              <span className="font-medium">{formatCurrency(results.totalMortgageCost)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Rent Cost:</span>
                              <span className="font-medium">{formatCurrency(results.totalRentCost)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Savings:</span>
                              <span className={results.costSavings > 0 ? 'text-green-600' : 'text-red-600'}>
                                {formatCurrency(Math.abs(results.costSavings))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Enter your information and click "Calculate Comparison" to see results
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <div className="space-y-6">
                  {/* Executive Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Executive Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Badge className={`${getRecommendationColor(results.analysis.recommendation)}`}>
                            {results.analysis.recommendation}
                          </Badge>
                          <Badge variant="outline">{results.analysis.valueRating}</Badge>
                          <Badge variant="secondary">{results.analysis.confidenceRating} Confidence</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {results.analysis.costSummary}
                        </p>
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

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Optimization Suggestions</h4>
                          <ul className="space-y-1">
                            {results.analysis.optimizationSuggestions.map((suggestion, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Next Steps</h4>
                          <ul className="space-y-1">
                            {results.analysis.nextSteps.map((step, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Calculate results to see detailed analysis
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {results?.comparisonAnalysis ? (
                <div className="space-y-6">
                  {/* Comparison Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Scale className="h-5 w-5" />
                        Side-by-Side Comparison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Metric</th>
                              <th className="text-center p-2">Mortgage</th>
                              <th className="text-center p-2">Rent</th>
                              <th className="text-center p-2">Difference</th>
                              <th className="text-center p-2">Advantage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.comparisonAnalysis.map((item, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2 font-medium">{item.metric}</td>
                                <td className="p-2 text-center">{formatCurrency(item.mortgage)}</td>
                                <td className="p-2 text-center">{formatCurrency(item.rent)}</td>
                                <td className="p-2 text-center">{formatCurrency(item.difference)}</td>
                                <td className="p-2 text-center">
                                  <Badge variant={item.advantage === 'Mortgage' ? 'default' : 'secondary'}>
                                    {item.advantage}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timeline Analysis */}
                  {results.timelineAnalysis && results.timelineAnalysis.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp2 className="h-5 w-5" />
                          Timeline Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {results.timelineAnalysis.slice(0, 6).map((year, index) => (
                              <div key={index} className="border rounded-lg p-4">
                                <h4 className="font-semibold">Year {year.year}</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Mortgage Cost:</span>
                                    <span>{formatCurrency(year.mortgageCost)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Rent Cost:</span>
                                    <span>{formatCurrency(year.rentCost)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Equity:</span>
                                    <span>{formatCurrency(year.equity)}</span>
                                  </div>
                                  <div className="flex justify-between font-medium">
                                    <span>Net Benefit:</span>
                                    <span className={year.netBenefit > 0 ? 'text-green-600' : 'text-red-600'}>
                                      {formatCurrency(year.netBenefit)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Calculate results to see comparison analysis
                    </p>
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