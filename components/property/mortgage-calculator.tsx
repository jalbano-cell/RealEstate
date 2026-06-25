"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Calculator } from "lucide-react";

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(Math.round(propertyPrice * 0.2));
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(25);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    if (monthlyRate === 0) {
      setResult(principal / numPayments);
    } else {
      const payment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      setResult(payment);
    }
  };

  return (
    <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="h-5 w-5 text-amber-600" />
        <h3 className="font-semibold text-neutral-900">Mortgage Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Purchase Price (CAD)</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Down Payment (CAD)</Label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
          <p className="text-xs text-neutral-500">
            {price > 0 ? Math.round((downPayment / price) * 100) : 0}% of purchase price
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Interest Rate (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Amortization (yrs)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </div>

        <Button variant="primary" className="w-full" onClick={calculate}>
          Calculate Payment
        </Button>

        {result !== null && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <p className="text-xs text-amber-700 mb-1">Estimated Monthly Payment</p>
            <p className="text-2xl font-bold text-amber-800">{formatPrice(result)}</p>
            <p className="text-xs text-amber-600 mt-1">Principal + Interest only</p>
          </div>
        )}
      </div>
    </div>
  );
}
