import express from "express"
let router = express.Router()

import getAllDates from "../control/sick_and_recovery_datesC.js"
import getDatesByIDMember from "../control/sick_and_recovery_datesC.js"
import getReceivingDate from "../control/sick_and_recovery_datesC.js"
import getRecoveryDate from "../control/sick_and_recovery_datesC.js"
import addDates from "../control/sick_and_recovery_datesC.js"

router.get("/",getAllDates.getAllDatesC);
router.get('/:id',getDatesByIDMember.getDatesByIDMemberC);
router.get('/receiving/:id',getReceivingDate.getReceivingDateC);
router.get('/recovery/:id',getRecoveryDate.getRecoveryDateC);


router.post("/",addDates.addDatesC);

export default router;
