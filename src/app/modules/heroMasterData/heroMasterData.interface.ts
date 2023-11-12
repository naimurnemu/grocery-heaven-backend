import { Model, Types } from "mongoose";
import { ICategory } from "../category/category.interface";


export type IHeroMasterData = {
    title: string;
    offerPercentage: number;
    categoryId: Types.ObjectId | ICategory;
    isActive: boolean;
    startPrice: number;
    img: string;
}

export type HeroMasterDataModel = Model<IHeroMasterData, Record<string, unknown>>;