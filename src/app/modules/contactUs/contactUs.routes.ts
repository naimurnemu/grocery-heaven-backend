import express from 'express';
import { ContactUsController } from './contactUs.controller';

const router = express.Router();

router.post('/', ContactUsController.sendContactInformation);

export const ContactUsRoutes = router;