import mongoose, { Schema, model } from "mongoose";
import { HeroMasterDataModel, IHeroMasterData } from "./heroMasterData.interface";

const heroMasterDataSchema = new Schema<IHeroMasterData>(
    {
        title: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        offerPercentage: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false
        },
        isActive: {
            type: Boolean,
            required: true
        },
        startPrice: {
            type: Number,
            required: true
        }
    }
);

export const HeroMasterData = model<IHeroMasterData, HeroMasterDataModel>('HeroMasterData', heroMasterDataSchema);

