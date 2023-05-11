import hmo_members from  "./routes/hmo_membersR.js";
import sick_and_recovery_dates from "./routes/sick_and_recovery_datesR.js";
import vaccination_details from "./routes/vaccination_detailsR.js";


import  express  from "express";
// import path from "path";
// import cors from "cors";

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }


var app = express();
app.use(express.json());
// app.use(cors(corsOptions));
app.use("/hmo_members",hmo_members);
app.use("/sick_and_recovery_dates",sick_and_recovery_dates);
app.use("/vaccination_details",vaccination_details);

app.listen(8080);
