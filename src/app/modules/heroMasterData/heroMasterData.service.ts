import { IHeroMasterData } from "./heroMasterData.interface";
import { HeroMasterData } from "./heroMasterData.model";

const getHeroMasterData = async (): Promise<IHeroMasterData[]> => {
    const result = await HeroMasterData.find({})
    // .populate('categoryId');

    return result;
}
export const HeroMasterDataService = {
    getHeroMasterData
}