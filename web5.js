// import { Web5 } from '@web5/api';

/*
Needs globalThis.crypto polyfill. 
This is *not* the crypto you're thinking of.
It's the original crypto...CRYPTOGRAPHY.
*/
// import { webcrypto } from 'node:crypto';

// if (!globalThis.crypto) globalThis.crypto = webcrypto;
// const { web5, did:lizzyDid} = await Web5.connect();



// const resolution = await web5.did.resolve(lizzyDid);
// console.log(resolution);

// let { record } = await web5.dwn.records.query({
//     message: {
//       filter: {
//         recordId: "bafyreifppcp3lik5zulnmus2xhudqmbi5xfvxosr3sqaojqliu45ux673a",
//       }
//     }
//   });
  

// const { record } = await web5.dwn.records.create({
//   data:JSON.stringify(message),
//   message: {
//     dataFormat: 'application/json',
//   },
// });

// let readResult = await record.data.json();

  // assuming the record has a text payload
  // const text = await record.data.json();
  
  // console.log(readResult);

// let { response } = await web5.dwn.records.query({
//     message: {
//       filter: {
//         protocol: "https://airrove/tickets"
//       }
//     }
//   });

//   console.log(response);