"use client";

import { fetchGoldPrice, setGrams, setMoneySpent } from "@/lib/features/gold-slice";
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/lib/hooks";
import { useGoldProfit } from "@/hooks/use-gold-profit.hook";
import { ChangeEvent } from "react";

export default function Home() {
  const { loading, grams, moneySpent } = useAppSelector((state) => state.gold);
  const { totalValue, totalProfit, profitPercentage, gram_price } = useGoldProfit();
  const dispatch = useAppDispatch();

  const handleGramsChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setGrams(e.target.value));
  const handleMoneySpentChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setMoneySpent(e.target.value));
  const handleRefresh = async () => dispatch(fetchGoldPrice());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-yellow-600">Gold Profit Calculator</h1>
        <p className="text-center text-gray-500 italic">Invest wisely, profit patiently.</p>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Grams of Gold</label>
            <input
              type="number"
              value={grams}
              onChange={handleGramsChange}
              placeholder="Enter grams"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Money Spent on Gold</label>
            <input
              type="number"
              value={moneySpent}
              onChange={handleMoneySpentChange}
              placeholder="Enter amount"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg text-center mt-4">
          <h2 className="text-lg font-medium text-gray-800">Current Gold Price per Gram</h2>
          <p className="text-xl font-bold text-gray-700">{gram_price}</p>
        </div>

        {/* Calculated Total Price */}
        <div className="bg-yellow-100 p-4 rounded-lg text-center mt-4">
          <h2 className="text-xl font-semibold text-yellow-800">Total Value of Gold</h2>
          <p className="text-2xl font-bold text-yellow-600">{totalValue}</p>
        </div>

        {/* Calculated Total Price */}
        <div className="bg-green-100 p-4 rounded-lg text-center mt-4">
          <h2 className="text-xl font-semibold text-green-800">Total Profit</h2>
          <p className="text-2xl font-bold text-green-600">{totalProfit}</p>
          <p className="text-2xl font-bold text-green-600">{profitPercentage}</p>
        </div>

        {/* Refresh Button */}
        <div className="pt-4">
          <button onClick={handleRefresh} className="btn btn-accent text-white w-full" disabled={loading}>
            {loading ? "Refreshing Data" : "Refresh Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
