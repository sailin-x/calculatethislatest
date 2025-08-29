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
  Lock, 
  Unlock, 
  Calendar, 
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
  Timer
} from 'lucide-react';

import { MortgageRateLockInputs, MortgageRateLockOutputs, MortgageRateLockAnalysis } from './types';
import { calculateMortgageRateLock } from './formulas';
import { validateMortgageRateLockInputs } from './validation';
import { validateField } from './quickValidation';

interface MortgageRateLockCalculatorProps {
  onCalculate?: (results: MortgageRateLockOutputs) => void;
  initialInputs?: Partial<MortgageRateLockInputs>;
}

export function MortgageRateLockCalculator({ onCalculate, initialInputs }: MortgageRateLockCalculatorProps) {
  const [inputs, setInputs] = useState<MortgageRateLockInputs>({
    // Loan Information
    loanAmount: 300000,
    lockedRate: 4.5,
    currentMarketRate: 4.75,
    loanTerm: 30,
    loanType: 'conventional',
    paymentType: 'principal_interest',
    
    // Rate Lock Information
    lockDate: new Date().toISOString().split('T')[0],
    lockExpirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lockDuration: 30,
    lockType: 'free',
    lockFee: 0,
    lockFeeType: 'none',
    
    // Property Information
    propertyValue: 375000,
    propertyAddress: '123 Main St, Anytown, USA',
    propertyType: 'single_family',
    propertySize: 2000,
    propertyAge: 15,
    
    // Closing Information
    estimatedClosingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    actualClosingDate: '',
    closingDelay: 0,
    extensionFee: 0,
    extensionFeeType: 'fixed',
    
    // Market Information
    marketLocation: 'Suburban',
    marketCondition: 'stable',
    marketVolatility: 15,
    rateTrend: 'rising',
    
    // Rate Forecast
    rateForecast: [
      { date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], predictedRate: 4.8, confidence: 75 },
      { date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], predictedRate: 4.9, confidence: 70 },
      { date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], predictedRate: 5.0, confidence: 65 },
    ],
    
    // Borrower Information
    borrowerIncome: 75000,
    borrowerCreditScore: 720,
    borrowerDebtToIncomeRatio: 35,
    borrowerEmploymentType: 'employed',
    
    // Analysis Parameters
    analysisPeriod: 30,
    inflationRate: 2.5,
    propertyAppreciationRate: 3.5,
    discountRate: 5,
    
    // Risk Tolerance
    riskTolerance: 'moderate',
    maxRateIncrease: 0.5,
    minRateDecrease: 0.25,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<MortgageRateLockOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof MortgageRateLockInputs, value: any) => {
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
    const validation = validateMortgageRateLockInputs(inputs);
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
      const calculatedResults = calculateMortgageRateLock(inputs);
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
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getLockStatusColor = () => {
    if (!results) return 'bg-gray-100';
    if (results.lockRemainingDays <= 0) return 'bg-red-100 text-red-800';
    if (results.lockRemainingDays <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getRateTrendIcon = () => {
    switch (inputs.rateTrend) {
      case 'rising': return <TrendingUp2 className="h-4 w-4 text-red-500" />;
      case 'falling': return <TrendingDown2 className="h-4 w-4 text-green-500" />;
      case 'volatile': return <Zap className="h-4 w-4 text-yellow-500" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Lock className="h-8 w-8 text-blue-600" />
            Mortgage Rate Lock Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Analyze your rate lock strategy and optimize your mortgage timing
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Clock3 className="h-4 w-4 mr-1" />
          Rate Lock Analysis
        </Badge>
      </div>

      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inputs" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
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
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Loan Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={inputs.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value))}
                      placeholder="300000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockedRate">Locked Rate (%)</Label>
                    <Input
                      id="lockedRate"
                      type="number"
                      step="0.01"
                      value={inputs.lockedRate}
                      onChange={(e) => handleInputChange('lockedRate', parseFloat(e.target.value))}
                      placeholder="4.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentMarketRate">Current Market Rate (%)</Label>
                    <Input
                      id="currentMarketRate"
                      type="number"
                      step="0.01"
                      value={inputs.currentMarketRate}
                      onChange={(e) => handleInputChange('currentMarketRate', parseFloat(e.target.value))}
                      placeholder="4.75"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={inputs.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', parseInt(e.target.value))}
                      placeholder="30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                </div>
              </CardContent>
            </Card>

            {/* Rate Lock Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Rate Lock Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lockDate">Lock Date</Label>
                    <Input
                      id="lockDate"
                      type="date"
                      value={inputs.lockDate}
                      onChange={(e) => handleInputChange('lockDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockExpirationDate">Expiration Date</Label>
                    <Input
                      id="lockExpirationDate"
                      type="date"
                      value={inputs.lockExpirationDate}
                      onChange={(e) => handleInputChange('lockExpirationDate', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lockDuration">Lock Duration (Days)</Label>
                    <Input
                      id="lockDuration"
                      type="number"
                      value={inputs.lockDuration}
                      onChange={(e) => handleInputChange('lockDuration', parseInt(e.target.value))}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockType">Lock Type</Label>
                    <Select value={inputs.lockType} onValueChange={(value) => handleInputChange('lockType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="float_down">Float Down</SelectItem>
                        <SelectItem value="extended">Extended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lockFee">Lock Fee</Label>
                    <Input
                      id="lockFee"
                      type="number"
                      value={inputs.lockFee}
                      onChange={(e) => handleInputChange('lockFee', parseFloat(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lockFeeType">Fee Type</Label>
                    <Select value={inputs.lockFeeType} onValueChange={(value) => handleInputChange('lockFeeType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyAddress">Property Address</Label>
                  <Input
                    id="propertyAddress"
                    value={inputs.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    placeholder="123 Main St, Anytown, USA"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={inputs.propertyValue}
                      onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                      placeholder="375000"
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={inputs.propertySize}
                      onChange={(e) => handleInputChange('propertySize', parseInt(e.target.value))}
                      placeholder="2000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyAge">Property Age (years)</Label>
                    <Input
                      id="propertyAge"
                      type="number"
                      value={inputs.propertyAge}
                      onChange={(e) => handleInputChange('propertyAge', parseInt(e.target.value))}
                      placeholder="15"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="marketLocation">Market Location</Label>
                  <Input
                    id="marketLocation"
                    value={inputs.marketLocation}
                    onChange={(e) => handleInputChange('marketLocation', e.target.value)}
                    placeholder="Suburban"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                        <SelectItem value="volatile">Volatile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rateTrend">Rate Trend</Label>
                    <Select value={inputs.rateTrend} onValueChange={(value) => handleInputChange('rateTrend', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="falling">Falling</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="rising">Rising</SelectItem>
                        <SelectItem value="volatile">Volatile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="marketVolatility">Market Volatility (%)</Label>
                  <Input
                    id="marketVolatility"
                    type="number"
                    step="0.1"
                    value={inputs.marketVolatility}
                    onChange={(e) => handleInputChange('marketVolatility', parseFloat(e.target.value))}
                    placeholder="15"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button 
              onClick={calculate} 
              disabled={isCalculating}
              className="px-8 py-3 text-lg"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Rate Lock Analysis
                </>
              )}
            </Button>
          </div>

          {/* Error Display */}
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
          {!results ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Enter your rate lock information and click Calculate to see results</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rate Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Rate Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Rate Difference:</span>
                    <span className={`font-semibold ${results.rateDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(Math.abs(results.rateDifference))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate Savings:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.rateSavings)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Rate:</span>
                    <span className="font-semibold">
                      {formatPercentage(results.effectiveRate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate Risk:</span>
                    <span className="font-semibold text-red-600">
                      {formatPercentage(results.rateRisk)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSignIcon className="h-5 w-5" />
                    Payment Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Locked Payment:</span>
                    <span className="font-semibold">
                      {formatCurrency(results.lockedPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Payment:</span>
                    <span className="font-semibold">
                      {formatCurrency(results.currentPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Difference:</span>
                    <span className={`font-semibold ${results.paymentDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(results.paymentDifference))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Savings:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.paymentSavings)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Lock Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Lock Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Days Remaining:</span>
                    <span className={`font-semibold ${getLockStatusColor()}`}>
                      {results.lockRemainingDays} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lock Value:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.lockValue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <span className="font-semibold text-red-600">
                      {results.riskScore.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break-Even Point:</span>
                    <span className="font-semibold">
                      {results.breakEvenPoint} days
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {!results ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Calculate results to see detailed analysis</p>
                </div>
              </CardContent>
            </Card>
          ) : (
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.analysis.lockRating}</div>
                      <div className="text-sm text-gray-600">Lock Rating</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{results.analysis.valueRating}</div>
                      <div className="text-sm text-gray-600">Value Rating</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.analysis.recommendation}</div>
                      <div className="text-sm text-gray-600">Recommendation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.analysis.riskFactors.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{risk}</span>
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
                    <Info className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Lock Recommendations:</h4>
                    <ul className="space-y-1">
                      {results.analysis.lockRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Optimization Suggestions:</h4>
                    <ul className="space-y-1">
                      {results.analysis.optimizationSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {!results ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Calculate results to see timeline analysis</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Timeline Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Rate Lock Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.timelineAnalysis.map((event, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600 min-w-[100px]">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{event.event}</div>
                          <div className="text-sm text-gray-600">
                            Rate: {formatPercentage(event.rate)} | 
                            Payment: {formatCurrency(event.payment)} | 
                            Cost: {formatCurrency(event.cost)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Break-Even Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Break-Even Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.breakEvenAnalysis.map((analysis, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <div className="font-medium">{analysis.days} days</div>
                          <div className="text-sm text-gray-600">
                            Rate Increase: {formatPercentage(analysis.rateIncrease)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatPercentage(analysis.breakEvenRate)}</div>
                          <div className="text-sm text-green-600">
                            {formatCurrency(analysis.savings)} savings
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}