import { useEffect, useMemo } from "react";

import { fetchGoldPrice } from "@/lib/features/gold-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { currencyFormat } from "@/utils/currency-format";

export function useGoldProfit() {
  const { local_price_for_gram, grams, moneySpent, currency } = useAppSelector((state) => state.gold);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!local_price_for_gram) {
      dispatch(fetchGoldPrice());
    }
  }, [dispatch, local_price_for_gram]);

  const calculations = useMemo(() => {
    if (!local_price_for_gram || !grams || !moneySpent) {
      return { totalValue: "0.00", totalProfit: "0.00", profitPercentage: "0.00%", gram_price: 0 };
    }

    const totalValue = local_price_for_gram * parseFloat(grams);
    const totalProfit = totalValue - parseFloat(moneySpent);
    const profitPercentage = ((totalProfit / (parseFloat(moneySpent) || 1)) * 100).toFixed(2);

    const formattedTotalValue = currencyFormat(totalValue, currency);

    const formattedTotalProfit = currencyFormat(totalProfit, currency);

    const formattedGramPrice = currencyFormat(local_price_for_gram, currency);

    return {
      totalValue: formattedTotalValue,
      totalProfit: formattedTotalProfit,
      profitPercentage: `${profitPercentage}%`,
      gram_price: formattedGramPrice,
    };
  }, [local_price_for_gram, grams, moneySpent, currency]);

  return calculations;
}
