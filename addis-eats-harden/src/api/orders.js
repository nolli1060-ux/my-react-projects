export async function placeOrder(orderData, items) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cleanPhone = (orderData.phone || "").replace(/\s/g, "");

  if (cleanPhone === "0900000000") {
    const error = new Error("Order placement failed.");
    error.status = 422;
    error.fieldErrors = {
      phone: "That phone number is not currently registered with TeleBirr."
    };
    throw error;
  }

  return {
    id: `ADDIS-${Math.floor(100000 + Math.random() * 900000)}`,
    items,
    customer: orderData,
    placedAt: new Date().toISOString()
  };
}