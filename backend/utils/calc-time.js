const m = 60;
const h = m * 60;

module.exports = (time) => {
  const hour = Math.floor(time / h);
  const min = Math.floor((time - hour * h) / m);
  const sec = Math.floor(time - hour * h - min * m);
  return { hour, min, sec };
};





// const Time =(() => {
//     let min = 60;
//     let hour= min*60;
//     let day= hour*24;
//     let week= day*7;
//     let month = week*4;
//     let year = month*12;
//     return { min, hour, day, week, month, year}
// })();

// const calcTime = (time) => {
    
// }




// const TimeTextMap = {
//     [TimeMap.min]: "분",
//     [TimeMap.hour]: "시간",
//     [TimeMap.day]: "일",
//     [TimeMap.week]: "주",
//     [TimeMap.month]: "개월",
//     [TimeMap.year]: "년",
// }

// function transformUser(user){
    // const email = user.email
    // const {first, last} = user.name
    // const name = `${first} ${last}`
    // const pictureUrl = user.picture.large;
    // const username = user.login.username;
    // const {state, city, country} = user.location
    // const location = `${country}, ${state}, ${city}`
    // const age = user.dob.age
    // return { email, name, pictureUrl, username, location, age }

