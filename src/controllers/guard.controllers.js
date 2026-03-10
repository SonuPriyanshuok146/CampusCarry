import { Order } from "../models/order.models.js";
import { DeliveryVerification } from "../models/deliveryVerification.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const verifyDelivery = asyncHandler(async (req, res) => {
  const { trackingId, otp } = req.body;

  const order = await Order.findOne({ trackingId });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.deliveryOtp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }

  const verification = await DeliveryVerification.create({
    order: order._id,
    verifiedByGuard: req.user._id,
    trackingLastFourDigits: trackingId.slice(-4),
    otpUsed: otp,
  });

  order.status = "verified";
  order.verifiedByGuard = req.user._id;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, verification, "Delivery verified successfully"));
});

export { verifyDelivery };
