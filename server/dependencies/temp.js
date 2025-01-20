const Doctor = require('../db/models/doctor-schema');

module.exports.tempFunc = async (
  starttime,
  endtime,
  patientsObject,
  userId,
  identifyId
) => {
  console.log('object', patientsObject);

  const sTime = starttime;
  const eTime = endtime;

  const [sHours, sMinutes] = sTime.split(':').map(Number);
  const [eHours, eMinutes] = eTime.split(':').map(Number);

  const startMinutes = sHours * 60 + sMinutes;
  const endMinutes = eHours * 60 + eMinutes;

  const slotsAvailable = Math.floor((endMinutes - startMinutes) / 15);

  const rawposition = patientsObject
    .map(obj => {
      if (obj._id== identifyId) {
        return obj.patients.findIndex(objs => objs.userId == userId);
      }

      return undefined;
    })
    .filter(index => index !== undefined);

  console.log(sTime, eTime);

  console.log('!!!!!!!!!Row Position', rawposition);
  console.log('patientobject Position', patientsObject);

  const position = (rawposition * 15 + startMinutes) / 60;

  const hours = Math.floor(position);

  const minutes = Math.round((position - hours) * 60);
  console.log(`Time.....${hours}:${minutes.toString().padStart(2, '0')}`);

  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};
