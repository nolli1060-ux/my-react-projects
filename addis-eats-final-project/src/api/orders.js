/**
 * Mock Orders API for Addis Eats.
 * Simulates server latency and validation responses.
 */
export async function placeOrder(orderData, items) {
  // Simulate network request latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cleanPhone = (orderData.phone || "").replace(/\s/g, "");

  // Mock server-side rejection for test phone number
  if (cleanPhone === "0900000000") {
    const err = new Error("Order placement failed");
    err.status = 422;
    err.fieldErrors = {
      phone: "That phone number is not currently registered with TeleBirr.",
    };
    throw err;
  }

  // Success response with generated order id
  return {
    id: `ADDIS-${Math.floor(100000 + Math.random() * 900000)}`,
    items,
    customer: orderData,
    placedAt: new Date().toISOString(),
  };
}
