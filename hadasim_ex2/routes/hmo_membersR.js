import express from "express"
let router = express.Router()

import getAllMembers from "../control/hmo_membersC.js"
import getMemberByID from "../control/hmo_membersC.js"
import getMembersByCity from "../control/hmo_membersC.js"
import addMember from "../control/hmo_membersC.js"
import getAllDetails from "../control/hmo_membersC.js"

router.get("/",getAllMembers.getAllMembersC);
router.get('/all_details/:id',getAllDetails.getAllDetailsC);
router.get('/:id',getMemberByID.getMemberByIDC);
router.get('/cities/:city',getMembersByCity.getMembersByCityC);
router.post("/",addMember.addMemberC);

export default router;
