export interface SellerDiscount {
  fixedDiscount: number | null | undefined;
  percentageDiscount: number | null | undefined;
}

export interface SellerPriceBreakdown {
  /** List price, before any seller discount. */
  originalPrice: number;
  /** What is actually taken off: always `originalPrice - finalPrice`. */
  discountAmount: number;
  /** Base the API charges commission on and pays the seller from. */
  finalPrice: number;
}

/**
 * Seller-facing price after their own discount.
 *
 * Mirrors the API's `calculateSellerBase` (calculateProductPriceWebBreakdown),
 * which is the same base `calculateSellerTotal` pays the seller from. Deriving
 * the discount from the final price rather than the other way round is what
 * keeps the rows adding up: rounding both halves independently drifts by one
 * peso when the percentage lands exactly on .5, and then price - discount no
 * longer equals the final price.
 *
 * A fixed discount wins over a percentage one, as it does in the API.
 */
export function calculateSellerPriceBreakdown(
  originalPrice: number,
  { fixedDiscount, percentageDiscount }: SellerDiscount,
): SellerPriceBreakdown {
  const basePrice = Math.max(originalPrice, 0);
  const finalPrice = Math.max(resolveFinalPrice(basePrice, fixedDiscount, percentageDiscount), 0);

  return {
    originalPrice: basePrice,
    discountAmount: basePrice - finalPrice,
    finalPrice,
  };
}

function resolveFinalPrice(
  basePrice: number,
  fixedDiscount: number | null | undefined,
  percentageDiscount: number | null | undefined,
): number {
  if (fixedDiscount) return basePrice - Math.round(fixedDiscount);
  if (percentageDiscount) {
    return Math.floor((basePrice * (100 - percentageDiscount)) / 100 + 0.5);
  }
  return basePrice;
}
