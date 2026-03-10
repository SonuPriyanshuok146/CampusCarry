import { Order } from "../models/order.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const createOrder = asyncHandler(async (req, res) => {
  const { deliveryService, trackingId, deliveryOtp } = req.body;

  if (!trackingId || !deliveryOtp) {
    throw new ApiError(400, "Tracking ID and OTP are required");
  }

  const order = await Order.create({
    student: req.user._id,
    deliveryService,
    trackingId,
    deliveryOtp,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order added successfully"));
});

const getStudentOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    student: req.user._id,
  }).populate("tokenNumber");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export { createOrder, getStudentOrders };
