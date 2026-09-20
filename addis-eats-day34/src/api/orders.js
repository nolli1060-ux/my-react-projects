export async function placeOrder(form) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (form.phone.replace(/\s/g, "") === "0900000000") {
    const error = new Error("Order could not be placed");
    error.status = 422;
    error.fieldErrors = { phone: "That number is not registered with TeleBirr" };
    throw error;
  }

  return { id: Date.now() };
}
