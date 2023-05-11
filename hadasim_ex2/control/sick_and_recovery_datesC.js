import connection from "../myDB.js"

//Viewing all dates
const getAllDatesC = async (req, res) => {
  const getAllDates = "SELECT * FROM sick_and_recovery_dates";
  const dates = await connection.query(getAllDates);
  res.send(dates[0]);
}

//view member id by
const getDatesByIDMemberC = async (req, res) => {
    try {
      const { id } = req.params;
      const getDatesByID=`SELECT * FROM sick_and_recovery_dates WHERE hmo_member_id='${id}'`;
      const dates= await connection.query(getDatesByID);
      res.send(dates[0]);
    }
    catch (err) {
      console.log(err)
      res.status(500).send("error");
    }
  }

//Viewing the date of onset of illness by id
  const getReceivingDateC = async (req, res) => {
    try {
      const { id } = req.params;
      const getReceivingDate=`SELECT date_of_receiving_a_positive_result FROM sick_and_recovery_dates WHERE hmo_member_id='${id}'`;
      const date= await connection.query(getReceivingDate);
      res.send(date[0]);
    }
    catch (err) {
      console.log(err)
      res.status(500).send("error");
    }
  }

//View recovery date by id
 const getRecoveryDateC = async (req, res) => {
    try {
      const { id } = req.params;
      const getRecoveryDate=`SELECT date_of_recovery_from_corona FROM sick_and_recovery_dates WHERE hmo_member_id='${id}'`;
      const date= await connection.query(getRecoveryDate);
      res.send(date[0]);
    }
    catch (err) {
      console.log(err)
      res.status(500).send("error");
    }
  }
  
  
//Adding dates of illness and recovery
  const addDatesC = async (req, res) => {
    try {
      const {id, hmo_member_id , date_of_receiving_a_positive_result , date_of_recovery_from_corona } = req.body;
      const date_receiving_string = new Date(date_of_receiving_a_positive_result).toISOString().split('T')[0];
      const date_recovery_string = new Date(date_of_recovery_from_corona).toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
//Checking whether this person is a member of the hmo
      const isMemberExist = `SELECT COUNT(*) AS c FROM hmo_members WHERE hmo_member_id = '${hmo_member_id}'`;
      const [isExist] = await connection.query(isMemberExist);
      const myCount =isExist[0].c;
      if(myCount==0)
    {
         throw "The user isn't a member in hmo";
    }
//Testing whether a person has already been sick once 
    const isSick = `SELECT COUNT(*) AS c FROM sick_and_recovery_dates WHERE hmo_member_id = '${hmo_member_id}'`;
         const [sick] = await connection.query(isSick);
         const c =sick[0].c;
         if(c==1)
            throw "The user was sick";
//Check if the dates are correct
      if(date_receiving_string>date_recovery_string || date_receiving_string>today || date_recovery_string>today)
        throw "The dates are incorrect";
      const addDates=`INSERT INTO sick_and_recovery_dates (id ,hmo_member_id , date_of_receiving_a_positive_result , date_of_recovery_from_corona ) VALUES ('${id}','${hmo_member_id}','${date_receiving_string}','${date_recovery_string}')`;
      const dates= await connection.query(addDates);
      res.send();
    }
    catch (err) {
      console.log(err)
    res.status(500).send(err);
    }
  }



export default{getAllDatesC, getDatesByIDMemberC,getReceivingDateC,getRecoveryDateC, addDatesC}