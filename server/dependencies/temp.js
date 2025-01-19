module.exports.tempFunc =  (starttime,endtime,patientsObject,userId,doctor)=>{

    
    const sTime =starttime;
    const eTime = endtime;

   
   
    

    const [sHours, sMinutes] = sTime.split(':').map(Number);
    const [eHours, eMinutes] = eTime.split(':').map(Number);

    const startMinutes = sHours * 60 + sMinutes;
    const endMinutes = eHours * 60 + eMinutes;

    const slotsAvailable = Math.floor((endMinutes - startMinutes) / 15);

    const rawposition = patientsObject.patients.findIndex(
      obj => obj.userId == userId
    );
   

    const position = (rawposition * 15 + startMinutes) / 60;
    

    const hours = Math.floor(position);
    // Extract the remaining minutes
    const minutes = Math.round((position - hours) * 60);
   console.log( `${hours}:${minutes.toString().padStart(2, '0')}`);
   
  return {
    time:  `${hours}:${minutes.toString().padStart(2, '0')}`,
    doctor
  }
      
    

}