import { Token } from "../models/token.models.js";
import { Order } from "../models/order.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const assignToken = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const token = await Token.findOne({ isAvailable: true });

  if (!token) {
    throw new ApiError(400, "No tokens available");
  }

  token.isAvailable = false;
  token.assignedOrder = order._id;
  token.assignedByGuard = req.user._id;
  token.assignedAt = Date.now();

  await token.save();

  order.tokenNumber = token._id;
  order.status = "token_assigned";

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, token, "Token assigned successfully"));
});

const releaseToken = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;

  const token = await Token.findById(tokenId);

  if (!token) {
    throw new ApiError(404, "Token not found");
  }

  token.isAvailable = true;
  token.assignedOrder = null;
  token.assignedByGuard = null;
  token.assignedAt = null;

  await token.save();

  return res
    .status(200)
    .json(new ApiResponse(200, token, "Token released successfully"));
});

export { assignToken, releaseToken };
