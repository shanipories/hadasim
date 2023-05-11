import connection from "../myDB.js"


//View all members
const getAllMembersC = async (req, res) => {
  const getAllMembers = "SELECT * FROM hmo_members";
  const members = await connection.query(getAllMembers);
  res.send(members[0]);
}


//View member by id
const getMemberByIDC = async (req, res) => {
  try {
    const { id } = req.params;
    const getMemberByID=`SELECT * FROM hmo_members WHERE hmo_member_id='${id}'`;
    const member= await connection.query(getMemberByID);
    res.send(member[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}

//Viewing all hmo member data by ID
const getAllDetailsC = async (req, res) => {
  try {
    const { id } = req.params;
    const getAllDetailes=`SELECT * FROM hmo_members JOIN vaccination_details ON hmo_members.hmo_member_id = vaccination_details.hmo_vaccine_member_id JOIN sick_and_recovery_dates ON  vaccination_details.hmo_vaccine_member_id = sick_and_recovery_dates.hmo_member_id WHERE hmo_members.hmo_member_id='${id}'`;
    const details= await connection.query(getAllDetailes);
    res.send(details[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}


//Viewing members by city
const getMembersByCityC = async (req, res) => {
  try{
    const { city } = req.params;
    const getMembers = `SELECT * FROM hmo_members WHERE city='${city}'`;
    const members = await connection.query(getMembers);
    res.send(members[0]);
  }
  catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
}


//Add member
const addMemberC = async (req, res) => {
    try {
      const { hmo_member_id ,first_name ,last_name , city , street ,building_number ,date_of_birth ,phone , mobile_phone } = req.body;
      //Input integrity check
      const date_of_birth_string = new Date(date_of_birth).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      if(date_of_birth_string>today)
        throw "The date is incorrect";
      const addMember=`INSERT INTO hmo_members (hmo_member_id , first_name , last_name ,city ,street , building_number ,date_of_birth ,phone ,mobile_phone ) VALUES ('${hmo_member_id}','${first_name}','${last_name}','${city}','${street}','${building_number}','${date_of_birth}','${phone}','${mobile_phone}')`;
      const member= await connection.query(addMember);
      res.send();
    }
    catch (err) {
      console.log(err)
    res.status(500).send(err);
    }
  }

  
export default { getAllMembersC, getMemberByIDC,getAllDetailsC, getMembersByCityC,  addMemberC }
