import connection from "../myDB.js"


//View all vaccines
const getAllVaccinationsC = async (req, res) => {
  const getAllVaccinations = "SELECT * FROM vaccination_details";
  const vaccinations = await connection.query(getAllVaccinations);
  res.send(vaccinations[0]);
}


//Viewing vaccinations of a specific user by ID
const getVaccinationsByIDMemberC = async (req, res) => {
  try {
    const { id } = req.params;
    const getMyVaccines=`SELECT * FROM vaccination_details WHERE hmo_vaccine_member_id='${id}'`;
    const vaccines= await connection.query(getMyVaccines);
    res.send(vaccines[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}


//Viewing vaccines by vaccine number
const getVaccinesByNumC = async (req, res) => {
  try {
    const { vaccination_number } = req.params;
    const getVaccines=`SELECT * FROM vaccination_details WHERE vaccination_number='${vaccination_number}'`;
    const vaccines= await connection.query(getVaccines);
    res.send(vaccines[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}


//View vaccines by manufacturer
const getVaccinesByManufacturerC = async (req, res) => {
  try {
    const { manufacturer_of_vaccine } = req.params;
    const getVaccines=`SELECT * FROM vaccination_details WHERE manufacturer_of_vaccine='${manufacturer_of_vaccine}'`;
    const vaccines= await connection.query(getVaccines);
    res.send(vaccines[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}


//Viewing the vaccine by vaccine number and ID
const getVaccinesByIDAndNumVaccineC = async (req, res) => {
  try {
    const { hmo_vaccine_member_id, vaccination_number } = req.params;
    const getVaccines=`SELECT * FROM vaccination_details WHERE hmo_vaccine_member_id='${hmo_vaccine_member_id}' AND vaccination_number=${vaccination_number}`;
    const vaccines= await connection.query(getVaccines);
    res.send(vaccines[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}


//Viewing the number of vaccinations a certain patient has had (the maximum number of vaccinations - the last)
const getNumVaccinesC = async (req, res) => {
  try {
    const { hmo_vaccine_member_id } = req.params;
    const getNumVaccines=`SELECT MAX(vaccination_number) AS max_vaccine_number FROM vaccination_details WHERE hmo_vaccine_member_id='${hmo_vaccine_member_id}'`;
    const num= await connection.query(getNumVaccines);
    res.send(num[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}



//Adding a vaccine to a specific hmo member
const addVaccineC = async (req, res) => {
    try {
      const { id, hmo_vaccine_member_id , date_receiving_the_vaccine , vaccination_number , manufacturer_of_vaccine } = req.body;
       //Input integrity check
     //Checking whether this person is a member of the hmo
      const isMemberExist = `SELECT COUNT(*) AS c FROM hmo_members WHERE hmo_member_id = '${hmo_vaccine_member_id}'`;
      const [isExist] = await connection.query(isMemberExist);
      const myCount =isExist[0].c;
      if(myCount==0)
         throw "The user isn't a member in hmo";
      //check that it is the correct number - the number following the previous vaccination
      const getNumVaccines = `SELECT COUNT(*) AS num_vaccines FROM vaccination_details WHERE hmo_vaccine_member_id='${hmo_vaccine_member_id}'`;
       const [result] = await connection.query(getNumVaccines);
       const num = result[0].num_vaccines;
      if(vaccination_number<1 || vaccination_number>4)
          throw "The vaccine number is incorrect";
       if(vaccination_number!=num+1)
           throw "It is not possible to skip a vaccination or repeat a previous vaccination";
      const date_receiving_the_vaccine_string = new Date(date_receiving_the_vaccine).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      //Check that the date is correct
      if(date_receiving_the_vaccine_string>today)
          throw "The date is incorrect";
      const addVaccine=`INSERT INTO vaccination_details (id, hmo_vaccine_member_id , date_receiving_the_vaccine , vaccination_number ,manufacturer_of_vaccine ) VALUES ('${id}','${hmo_vaccine_member_id}','${date_receiving_the_vaccine}','${vaccination_number}','${manufacturer_of_vaccine}')`;
      const vaccine= await connection.query(addVaccine);
      res.send();
    }
    catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
  }
  
  
export default { getAllVaccinationsC, getVaccinationsByIDMemberC, getVaccinesByNumC,getVaccinesByManufacturerC, getVaccinesByIDAndNumVaccineC,getNumVaccinesC, addVaccineC }
