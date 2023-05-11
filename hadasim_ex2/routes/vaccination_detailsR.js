import express from "express"
let router = express.Router()

import getAllVaccinations from "../control/vaccination_detailsC.js"
import getVaccinationsByIDMember from "../control/vaccination_detailsC.js"
import getVaccinesByNum from "../control/vaccination_detailsC.js"
import getVaccinesByManufacturer from "../control/vaccination_detailsC.js"
import getVaccinesByIDAndNumVaccine from "../control/vaccination_detailsC.js"
import addVaccine from "../control/vaccination_detailsC.js"
import getNumVaccines from "../control/vaccination_detailsC.js"

router.get("/",getAllVaccinations.getAllVaccinationsC);
router.get('/member/:id',getVaccinationsByIDMember.getVaccinationsByIDMemberC);
router.get('/vaccine/:vaccination_number',getVaccinesByNum.getVaccinesByNumC);
router.get('/manufacturer/:manufacturer_of_vaccine',getVaccinesByManufacturer.getVaccinesByManufacturerC);
router.get('/vaccine/:hmo_vaccine_member_id/:vaccination_number',getVaccinesByIDAndNumVaccine.getVaccinesByIDAndNumVaccineC);
router.get('/numVaccines/:hmo_vaccine_member_id',getNumVaccines.getNumVaccinesC);
router.post("/",addVaccine.addVaccineC);

export default router;
