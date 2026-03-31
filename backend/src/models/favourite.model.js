import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    propertyId: { type: String, required: true },
    propertyTitle: { type: String },
    propertyAddress: { type: String },
    propertyPrice: { type: Number },
  },
  { timestamps: true },
);

// This ensures a user can't favourite the same property twice
favouriteSchema.index({ user: 1, propertyId: 1 }, { unique: true });

export default mongoose.model("Favourite", favouriteSchema);
