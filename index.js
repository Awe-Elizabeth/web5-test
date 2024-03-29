// import express from 'express';
// import bodyParser from 'body-parser';
// import { Web5 } from '@web5/api';
// // import errorHandler from './utils/error.js';

// /*
// Needs globalThis.crypto polyfill.
// This is *not* the crypto you're thinking of.
// It's the original crypto...CRYPTOGRAPHY.
// */
// import { webcrypto } from 'node:crypto';
// import { read } from 'node:fs';

// // @ts-ignore
// if (!globalThis.crypto) globalThis.crypto = webcrypto;
// // const { web5, did: lizzyDid } = await Web5.connect();

// // export const { web5, did } = await Web5.connect({ sync: '5s' });

// // console.log(connection);

// // const publicKey =  await connection.web5.agent.didManager._agent.keyManager._defaultSigningKey.publicKey.did;
// // console.log(publicKey);

// const app = express();

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: false }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// //  console.log('this is in query local protocol')
// const queryLocalProtocol = async (web5) => {
//   return await web5.dwn.protocols.query({
//     message: {
//       filter: {
//         protocol: 'https://airrove/tickets',
//       },
//     },
//   });
// };

// //console.log('this is where Query remote protocol is')
// const queryRemoteProtocol = async (web5, did) => {
//   return await web5.dwn.protocols.query({
//     from: did,
//     message: {
//       filter: {
//         protocol: 'https://airrove/tickets',
//       },
//     },
//   });
// };

// // console.log('this is where we install local protocol')
// const installLocalProtocol = async (web5, protocolDefinition) => {
//   return await web5.dwn.protocols.configure({
//     message: {
//       definition: protocolDefinition,
//     },
//   });
// };

// //  console.log('this is where we install remote protocol')
// const installRemoteProtocol = async (web5, did, protocolDefinition) => {
//   const { protocol } = await web5.dwn.protocols.configure({
//     message: {
//       definition: protocolDefinition,
//     },
//   });
//   return await protocol.send(did);
// };

// export const defineNewProtocol = () => {
//   return {
//     protocol: 'https://airrove/test',
//     published: true,
//     types: {
//       publishedTickets: {
//         schema: 'https://schema.org/test',
//         dataFormats: ['application/json'],
//       },
//       userTickets: {
//         schema: 'https://schema.org/test',
//         dataFormats: ['application/json'],
//       },
//     },
//     structure: {
//       publishedTickets: {
//         $actions: [
//           { who: 'anyone', can: 'read' },
//           { who: 'author', of: 'publishedTickets', can: 'write' },
//         ],
//       },
//       userTickets: {
//         $actions: [
//           { who: 'author', of: 'userTickets', can: 'read' },
//           { who: 'recipient', of: 'userTickets', can: 'read' },
//           { who: 'anyone', can: 'write' },
//         ],
//       },
//     },
//   };
// };

// const configureProtocol = async (web5, did) => {
//   const protocolDefinition = defineNewProtocol();
//   const protocolUrl = protocolDefinition.protocol;

//   const { protocols: localProtocols, status: localProtocolStatus } =
//     await queryLocalProtocol(web5, protocolUrl);
//   if (localProtocolStatus.code !== 200 || localProtocols.length === 0) {
//     const result = await installLocalProtocol(web5, protocolDefinition);
//     console.log({ result });
//     console.log('Protocol installed locally');
//   }

//   const { protocols: remoteProtocols, status: remoteProtocolStatus } =
//     await queryRemoteProtocol(web5, did, protocolUrl);
//   if (remoteProtocolStatus.code !== 200 || remoteProtocols.length === 0) {
//     const result = await installRemoteProtocol(web5, did, protocolDefinition);
//     console.log({ result });
//     console.log('Protocol installed remotely');
//   }
// };

// // import routes from './routes/ticket.router.js';

// // app.use('/api/', routes);

// // app.use(errorHandler)

// app.post('/create', async (req, res, next) => {
//   const publishTicketProtocol = defineNewProtocol();
//   try {
//     const {
//       departureState,
//       arrivalState,
//     } = req.body;
//     const { record } = await web5.dwn.records.create({
//       data: {
//         departureState,
//         arrivalState,
//       },
//       message: {
//         protocol: publishTicketProtocol.protocol,
//         protocolPath: 'publishedTickets',
//         dataFormat: 'application/json',
//         schema: publishTicketProtocol.types.publishedTickets.schema,
//         published: true,
//       },
//     });

//     let readResult = await record.data.json();
//     res.status(200).json({
//       success: true,
//       data: readResult,
//     });
//   } catch (error) {
//     return next(new ErrorResponse("Couldn't write record: " + error, 400));
//   }
// });

// app.get('/all', async (req, res, next) => {
//   try {
//     const response = await web5.dwn.records.query({
//       from: did,
//       message: {
//         filter: {
//           protocol: 'https://airrove/test',
//           protocolPath: "publishedTickets"
//           //   schema: 'https://schema.org/travel-tickets',
//         },
//       },
//     });

//     let userTickets;
//     if (response.status.code === 200) {
//       userTickets = await Promise.all(
//         response.records.map(async (record) => {
//           const data = await record.data.json();
//           if (data) {
//             return {
//               ...data,
//               recordId: record.id,
//               did,
//             };
//           }
//         })
//       );
//     }
//     res.status(201).json({
//       success: true,
//       userTickets,
//     });
//   } catch (error) {
//     console.log(error);
//     // return next(new ErrorResponse('Error occurred ' + error, 400));
//   }
// });

// const PORT = 5000;
// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// //Handle unhandled rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   server.close(() => process.exit(1));
// });

// const { web5, did } = await Web5.connect({ sync: '5s' })
// await configureProtocol(web5, did);

import express from 'express';
import bodyParser from 'body-parser';
import { Web5 } from '@web5/api';
// import errorHandler from './utils/error.js';

/*
Needs globalThis.crypto polyfill. 
This is *not* the crypto you're thinking of.
It's the original crypto...CRYPTOGRAPHY.
*/
import { webcrypto } from 'node:crypto';
import { read } from 'node:fs';

// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;
// const { web5, did: lizzyDid } = await Web5.connect();

// export const { web5, did } = await Web5.connect({ sync: '5s' });

// console.log(connection);

// const publicKey =  await connection.web5.agent.didManager._agent.keyManager._defaultSigningKey.publicKey.did;
// console.log(publicKey);

const app = express();
// import server from 'http';
// server.createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  console.log('this is in query local protocol')
const queryLocalProtocol = async (web5) => {
  return await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'https://airrove/tickets',
      },
    },
  });
};

//console.log('this is where Query remote protocol is')
const queryRemoteProtocol = async (web5, did) => {
  return await web5.dwn.protocols.query({
    from: did,
    message: {
      filter: {
        protocol: 'https://airrove/tickets',
      },
    },
  });
};

// console.log('this is where we install local protocol')
const installLocalProtocol = async (web5, protocolDefinition) => {
  return await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });
};

//  console.log('this is where we install remote protocol')
const installRemoteProtocol = async (web5, did, protocolDefinition) => {
  const { protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });
  return await protocol.send(did);
};

export const defineNewProtocol = () => {
  return {
    protocol: 'https://airrove/test',
    published: true,
    types: {
      publishedTickets: {
        schema: 'https://schema.org/test',
        dataFormats: ['application/json'],
      },
      userTickets: {
        schema: 'https://schema.org/test',
        dataFormats: ['application/json'],
      },
    },
    structure: {
      publishedTickets: {
        $actions: [
          { who: 'anyone', can: 'read' },
          { who: 'author', of: 'publishedTickets', can: 'write' },
        ],
      },
      userTickets: {
        $actions: [
          { who: 'author', of: 'userTickets', can: 'read' },
          { who: 'recipient', of: 'userTickets', can: 'read' },
          { who: 'anyone', can: 'write' },
        ],
      },
    },
  };
};

const configureProtocol = async (web5, did) => {
  const protocolDefinition = defineNewProtocol();
  const protocolUrl = protocolDefinition.protocol;

  const { protocols: localProtocols, status: localProtocolStatus } =
    await queryLocalProtocol(web5, protocolUrl);
  if (localProtocolStatus.code !== 200 || localProtocols.length === 0) {
    const result = await installLocalProtocol(web5, protocolDefinition);
    console.log({ result });
    console.log('Protocol installed locally');
  }

  const { protocols: remoteProtocols, status: remoteProtocolStatus } =
    await queryRemoteProtocol(web5, did, protocolUrl);
  if (remoteProtocolStatus.code !== 200 || remoteProtocols.length === 0) {
    const result = await installRemoteProtocol(web5, did, protocolDefinition);
    console.log({ result });
    console.log('Protocol installed remotely');
  }
};

// import routes from './routes/ticket.router.js';

// app.use('/api/', routes);

// app.use(errorHandler)

let myweb5, mydid;
app.get('/', async (req, res) => {
  const { web5, did } = await Web5.connect({ sync: '5s' });
  myweb5 = web5;
  mydid = did;
  await configureProtocol(myweb5, mydid);

  res.status(200).json({
    success: true,
    data: mydid,
  });
});

app.post('/create', async (req, res, next) => {
  const publishTicketProtocol = defineNewProtocol();
  try {
    const { departureState, arrivalState } = req.body;
    const { record } = await myweb5.dwn.records.create({
      data: {
        departureState,
        arrivalState,
      },
      message: {
        protocol: publishTicketProtocol.protocol,
        protocolPath: 'publishedTickets',
        dataFormat: 'application/json',
        schema: publishTicketProtocol.types.publishedTickets.schema,
        published: true,
      },
    });

    let readResult = await record.data.json();
    res.status(200).json({
      success: true,
      data: readResult,
    });
  } catch (error) {
    return next(new ErrorResponse("Couldn't write record: " + error, 400));
  }
});

app.get('/all', async (req, res, next) => {
  try {
    const response = await myweb5.dwn.records.query({
      from: mydid,
      message: {
        filter: {
          protocol: 'https://airrove/test',
          protocolPath: 'publishedTickets',
          //   schema: 'https://schema.org/travel-tickets',
        },
      },
    });

    let userTickets;
    if (response.status.code === 200) {
      userTickets = await Promise.all(
        response.records.map(async (record) => {
          const data = await record.data.json();
          if (data) {
            return {
              ...data,
              recordId: record.id,
              mydid,
            };
          }
        })
      );
    }
    res.status(201).json({
      success: true,
      userTickets,
    });
  } catch (error) {
    console.log(error);
    // return next(new ErrorResponse('Error occurred ' + error, 400));
  }
});

const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
