import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { BondTradingInputs, BondTradingOutputs } from './types';
import { calculateBondTrading } from './formulas';
import { validateBondTradingInputs } from './validation';
import { validateField } from './quickValidation';

export default function BondTradingCalculator() {
  const [inputs, setInputs] = useState<BondTradingInputs>({
    // Bond Information
    bondName: '',
    bondType: 'corporate',
    issuer: '',
    cusip: '',
    faceValue: 1000,
    couponRate: 5.0,
    couponFrequency: 'semi-annual',
    maturityDate: '',
    issueDate: '',
    callable: false,
    callDate: '',
    callPrice: 0,
    putable: false,
    putDate: '',
    putPrice: 0,
    
    // Market Information
    currentPrice: 1000,
    yieldToMaturity: 5.0,
    yieldToCall: 0,
    yieldToPut: 0,
    currentYield: 5.0,
    bidPrice: 995,
    askPrice: 1005,
    bidYield: 5.1,
    askYield: 4.9,
    spread: 10,
    
    // Trading Information
    quantity: 100,
    tradeType: 'buy',
    orderType: 'market',
    limitPrice: 0,
    stopPrice: 0,
    commission: 5,
    fees: 0,
    
    // Risk Metrics
    duration: 5.0,
    modifiedDuration: 4.8,
    convexity: 25.0,
    creditRating: 'BBB',
    creditSpread: 150,
    liquidityScore: 7,
    
    // Market Data
    benchmarkYield: 4.5,
    benchmarkDuration: 5.2,
    marketVolatility: 15,
    interestRateEnvironment: 'stable',
    economicOutlook: 'neutral',
    
    // Analysis Parameters
    analysisPeriod: 5,
    reinvestmentRate: 4.0,
    taxRate: 25,
    inflationRate: 2.5,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeProjections: true
  });

  const [results, setResults] = useState<BondTradingOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateBondTradingInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateBondTrading(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating bond trading metrics' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: keyof BondTradingInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Auto-calculate related fields
    if (field === 'currentPrice' && inputs.faceValue > 0) {
      const currentYield = (inputs.couponRate * inputs.faceValue / 100) / value * 100;
      newInputs.currentYield = currentYield;
    }

    if (field === 'bidPrice' && field === 'askPrice') {
      const spread = inputs.askPrice - inputs.bidPrice;
      newInputs.spread = spread;
    }

    // Quick validation
    const fieldValidation = validateField(field, value, newInputs);
    if (!fieldValidation.isValid) {
      setErrors(prev => ({ ...prev, [field]: fieldValidation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    if (fieldValidation.warning) {
      setWarnings(prev => ({ ...prev, [field]: fieldValidation.warning || '' }));
    } else {
      setWarnings(prev => {
        const newWarnings = { ...prev };
        delete newWarnings[field];
        return newWarnings;
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Bond Trading Calculator</h1>
        <p className="text-muted-foreground">
          Analyze bond trading opportunities, calculate yields, and assess risk
        </p>
      </div>

      <Tabs defaultValue="inputs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bond Information */}
            <Card>
              <CardHeader>
                <CardTitle>Bond Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bondName">Bond Name</Label>
                  <Input
                    id="bondName"
                    value={inputs.bondName}
                    onChange={(e) => handleInputChange('bondName', e.target.value)}
                    className={errors.bondName ? 'border-red-500' : ''}
                  />
                  {errors.bondName && <p className="text-sm text-red-500">{errors.bondName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bondType">Bond Type</Label>
                  <Select value={inputs.bondType} onValueChange={(value) => handleInputChange('bondType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="municipal">Municipal</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="faceValue">Face Value</Label>
                  <Input
                    id="faceValue"
                    type="number"
                    value={inputs.faceValue}
                    onChange={(e) => handleInputChange('faceValue', parseFloat(e.target.value) || 0)}
                    className={errors.faceValue ? 'border-red-500' : ''}
                  />
                  {errors.faceValue && <p className="text-sm text-red-500">{errors.faceValue}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couponRate">Coupon Rate (%)</Label>
                  <Input
                    id="couponRate"
                    type="number"
                    step="0.01"
                    value={inputs.couponRate}
                    onChange={(e) => handleInputChange('couponRate', parseFloat(e.target.value) || 0)}
                    className={errors.couponRate ? 'border-red-500' : ''}
                  />
                  {errors.couponRate && <p className="text-sm text-red-500">{errors.couponRate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couponFrequency">Coupon Frequency</Label>
                  <Select value={inputs.couponFrequency} onValueChange={(value) => handleInputChange('couponFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maturityDate">Maturity Date</Label>
                  <Input
                    id="maturityDate"
                    type="date"
                    value={inputs.maturityDate}
                    onChange={(e) => handleInputChange('maturityDate', e.target.value)}
                    className={errors.maturityDate ? 'border-red-500' : ''}
                  />
                  {errors.maturityDate && <p className="text-sm text-red-500">{errors.maturityDate}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Market Information */}
            <Card>
              <CardHeader>
                <CardTitle>Market Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">Current Price</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    step="0.01"
                    value={inputs.currentPrice}
                    onChange={(e) => handleInputChange('currentPrice', parseFloat(e.target.value) || 0)}
                    className={errors.currentPrice ? 'border-red-500' : ''}
                  />
                  {errors.currentPrice && <p className="text-sm text-red-500">{errors.currentPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yieldToMaturity">Yield to Maturity (%)</Label>
                  <Input
                    id="yieldToMaturity"
                    type="number"
                    step="0.01"
                    value={inputs.yieldToMaturity}
                    onChange={(e) => handleInputChange('yieldToMaturity', parseFloat(e.target.value) || 0)}
                    className={errors.yieldToMaturity ? 'border-red-500' : ''}
                  />
                  {errors.yieldToMaturity && <p className="text-sm text-red-500">{errors.yieldToMaturity}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentYield">Current Yield (%)</Label>
                  <Input
                    id="currentYield"
                    type="number"
                    step="0.01"
                    value={inputs.currentYield}
                    onChange={(e) => handleInputChange('currentYield', parseFloat(e.target.value) || 0)}
                    className={errors.currentYield ? 'border-red-500' : ''}
                  />
                  {errors.currentYield && <p className="text-sm text-red-500">{errors.currentYield}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bidPrice">Bid Price</Label>
                  <Input
                    id="bidPrice"
                    type="number"
                    step="0.01"
                    value={inputs.bidPrice}
                    onChange={(e) => handleInputChange('bidPrice', parseFloat(e.target.value) || 0)}
                    className={errors.bidPrice ? 'border-red-500' : ''}
                  />
                  {errors.bidPrice && <p className="text-sm text-red-500">{errors.bidPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="askPrice">Ask Price</Label>
                  <Input
                    id="askPrice"
                    type="number"
                    step="0.01"
                    value={inputs.askPrice}
                    onChange={(e) => handleInputChange('askPrice', parseFloat(e.target.value) || 0)}
                    className={errors.askPrice ? 'border-red-500' : ''}
                  />
                  {errors.askPrice && <p className="text-sm text-red-500">{errors.askPrice}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spread">Bid-Ask Spread</Label>
                  <Input
                    id="spread"
                    type="number"
                    step="0.01"
                    value={inputs.spread}
                    onChange={(e) => handleInputChange('spread', parseFloat(e.target.value) || 0)}
                    className={errors.spread ? 'border-red-500' : ''}
                  />
                  {errors.spread && <p className="text-sm text-red-500">{errors.spread}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Trading Information */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={inputs.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                    className={errors.quantity ? 'border-red-500' : ''}
                  />
                  {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tradeType">Trade Type</Label>
                  <Select value={inputs.tradeType} onValueChange={(value) => handleInputChange('tradeType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="hold">Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select value={inputs.orderType} onValueChange={(value) => handleInputChange('orderType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                      <SelectItem value="stop-limit">Stop-Limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission">Commission</Label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.01"
                    value={inputs.commission}
                    onChange={(e) => handleInputChange('commission', parseFloat(e.target.value) || 0)}
                    className={errors.commission ? 'border-red-500' : ''}
                  />
                  {errors.commission && <p className="text-sm text-red-500">{errors.commission}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees">Other Fees</Label>
                  <Input
                    id="fees"
                    type="number"
                    step="0.01"
                    value={inputs.fees}
                    onChange={(e) => handleInputChange('fees', parseFloat(e.target.value) || 0)}
                    className={errors.fees ? 'border-red-500' : ''}
                  />
                  {errors.fees && <p className="text-sm text-red-500">{errors.fees}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Yield Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Yield Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Yield to Maturity:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.yieldToMaturity)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Yield:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.currentYield)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield to Call:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.yieldToCall)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yield to Put:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.yieldToPut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real Yield:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.realYield)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Price Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Clean Price:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.cleanPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dirty Price:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.dirtyPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accrued Interest:</span>
                    <span className="font-bold">{formatCurrency(results.metrics.accruedInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price Change:</span>
                    <span className={`font-bold ${results.metrics.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.metrics.priceChange)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price Change %:</span>
                    <span className={`font-bold ${results.metrics.priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(results.metrics.priceChangePercent)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-bold">{results.metrics.duration.toFixed(2)} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Modified Duration:</span>
                    <span className="font-bold">{results.metrics.modifiedDuration.toFixed(2)} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Convexity:</span>
                    <span className="font-bold">{results.metrics.convexity.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Spread:</span>
                    <span className="font-bold">{formatPercentage(results.metrics.creditSpread)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liquidity Score:</span>
                    <span className="font-bold">{results.metrics.liquidityScore}/10</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trading Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Trading Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Trading Recommendation:</span>
                      <Badge variant={results.tradingAnalysis.recommendation === 'buy' ? 'default' : 
                                     results.tradingAnalysis.recommendation === 'hold' ? 'secondary' : 'destructive'}>
                        {results.tradingAnalysis.recommendation.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence Level:</span>
                      <Badge variant={results.tradingAnalysis.confidenceLevel >= 7 ? 'default' : 
                                     results.tradingAnalysis.confidenceLevel >= 4 ? 'secondary' : 'destructive'}>
                        {results.tradingAnalysis.confidenceLevel}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.tradingAnalysis.keyFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Risks:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.tradingAnalysis.risks.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Opportunities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.tradingAnalysis.opportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Market Position:</span>
                      <Badge variant={results.marketAnalysis.marketPosition === 'undervalued' ? 'default' : 
                                     results.marketAnalysis.marketPosition === 'fair-value' ? 'secondary' : 'destructive'}>
                        {results.marketAnalysis.marketPosition}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Risk:</span>
                      <Badge variant={results.marketAnalysis.marketRisk === 'low' ? 'default' : 
                                     results.marketAnalysis.marketRisk === 'medium' ? 'secondary' : 'destructive'}>
                        {results.marketAnalysis.marketRisk}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Market Factors:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.marketAnalysis.marketFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Market Outlook:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {results.marketAnalysis.marketOutlook.map((outlook, index) => (
                        <li key={index}>{outlook}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          {results && (
            <div className="space-y-6">
              {/* Trading Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle>Trading Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Strategy</th>
                          <th className="text-right p-2">Entry Price</th>
                          <th className="text-right p-2">Exit Price</th>
                          <th className="text-right p-2">Profit/Loss</th>
                          <th className="text-right p-2">Risk Level</th>
                          <th className="text-right p-2">Time Horizon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.tradingStrategies.map((strategy, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{strategy.name}</td>
                            <td className="text-right p-2">{formatCurrency(strategy.entryPrice)}</td>
                            <td className="text-right p-2">{formatCurrency(strategy.exitPrice)}</td>
                            <td className={`text-right p-2 font-bold ${strategy.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(strategy.profitLoss)}
                            </td>
                            <td className="text-right p-2">
                              <Badge variant={strategy.riskLevel === 'low' ? 'default' : 
                                            strategy.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                                {strategy.riskLevel}
                              </Badge>
                            </td>
                            <td className="text-right p-2">{strategy.timeHorizon}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {results && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Risk Metrics Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.riskMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{metric.name}</span>
                          <span>{formatPercentage(metric.value)}</span>
                        </div>
                        <Progress value={Math.abs(metric.value)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formatPercentage(results.metrics.yieldToMaturity)}</div>
                      <div className="text-sm text-gray-600">YTM</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.metrics.duration.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{formatPercentage(results.metrics.creditSpread)}</div>
                      <div className="text-sm text-gray-600">Credit Spread</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{results.metrics.liquidityScore}/10</div>
                      <div className="text-sm text-gray-600">Liquidity</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

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

      {Object.keys(warnings).length > 0 && (
        <Alert>
          <AlertDescription>
            Warnings:
            <ul className="list-disc list-inside mt-2">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}