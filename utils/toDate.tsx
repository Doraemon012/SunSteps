
// import React from 'react';

// export default function toDate(timestamp: { nanoseconds: number; seconds: number; }) {
//     // Create a Date object from the seconds
//     const date = new Date(timestamp.seconds * 1000);
    
//     // Get individual date components
//     // const options: Intl.DateTimeFormatOptions = {
//     //     timeZone: 'Asia/Kolkata'
//     // };
//     const formatter = new Intl.DateTimeFormat('en-US');
//     const parts = formatter.formatToParts(date);
    
//     const month = parts.find(part => part.type === 'month')?.value;
//     const day = parts.find(part => part.type === 'day')?.value;
//     const year = parts.find(part => part.type === 'year')?.value;
//     const hour = parts.find(part => part.type === 'hour')?.value;
//     const minute = parts.find(part => part.type === 'minute')?.value;
//     const second = parts.find(part => part.type === 'second')?.value;
//     const dayPeriod = parts.find(part => part.type === 'dayPeriod')?.value;
    
//     // Construct the formatted date string
//     // const formattedDate = `${month} ${day}, ${year} at ${hour}:${minute}:${second} ${dayPeriod}`;

//     // return object
//     const formattedDate = {
//         month: month,
//         day: day,
//         year: year,
//         hour: hour,
//         minute: minute,
//         second: second,
//         dayPeriod: dayPeriod
//     }
    
//     return formattedDate;
//     }

// // const timestamp = {"nanoseconds": 0, "seconds": 1722715200};

// // // Create a Date object from the seconds
// // const date = new Date(timestamp.seconds * 1000);

// // // Get individual date components
// // const options: Intl.DateTimeFormatOptions = {
// //   timeZone: 'Asia/Kolkata'
// // };
// // const formatter = new Intl.DateTimeFormat('en-US', options);
// // const parts = formatter.formatToParts(date);

// // const month = parts.find(part => part.type === 'month')?.value;
// // const day = parts.find(part => part.type === 'day')?.value;
// // const year = parts.find(part => part.type === 'year')?.value;
// // const hour = parts.find(part => part.type === 'hour')?.value;
// // const minute = parts.find(part => part.type === 'minute')?.value;
// // const second = parts.find(part => part.type === 'second')?.value;
// // const dayPeriod = parts.find(part => part.type === 'dayPeriod')?.value;

// // // Construct the formatted date string
// // const formattedDate = `${month} ${day}, ${year} at ${hour}:${minute}:${second} ${dayPeriod} UTC+5:30`;

// // console.log(formattedDate);

// utils/toDate.ts
// utils/toDate.ts
export const toDate = (timestamp: { seconds: number, nanoseconds: number }): Date => {
    return new Date(timestamp.seconds * 1000);
  }
  