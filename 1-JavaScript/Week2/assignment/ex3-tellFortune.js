/* jshint esversion: 6 */
function selectRandomly(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

export function tellFortune(numKids, partnerNames, locations, jobTitles) {
  const selectNumKids = selectRandomly(numKids);
  const selectPartnerNames = selectRandomly(partnerNames);
  const selectLocations = selectRandomly(locations);
  const selectJobTitles = selectRandomly(jobTitles);
  //const f=selectRandomly();
  return `You will be a ${selectJobTitles} in ${selectLocations} , 
    married to ${selectPartnerNames} with numKids ${selectNumKids}.`;
}

function main() {
  const numKids = [
    1, 2, 3, 4, 5
  ];

  const partnerNames = [
    'Ahmed', 'Mohammed', 'Ali', 'Adam', 'Omar'
  ];

  const locations = [
    'Amsterdam', 'Dubai', 'Egypt', 'Oman', 'Al Doha'
  ];

  const jobTitles = [
    'pilot', 'engineer', 'doctor', 'accountant', 'lawyer'
  ];

  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
  console.log(tellFortune(numKids, partnerNames, locations, jobTitles));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}