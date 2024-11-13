import express from 'express'
import {storeCommand,searchCommand} from '../controllers/command.controller.js'

const router = express.Router();

router.post('/store',storeCommand);
router.get('/search',searchCommand);

export default router;
