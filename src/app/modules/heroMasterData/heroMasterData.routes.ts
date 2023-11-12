import express from 'express';
// import { HeroMasterDataService } from './heroMasterData.service';
import { HeroMasterDataController } from './heroMasterData.controller';


const router = express.Router();

router.get('/', HeroMasterDataController.getHeroMasterData);

export const HeroMasterDataRoutes = router;