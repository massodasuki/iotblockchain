
// const axios = require('axios');

// var Patient = require('../models/Biodata');
// var bigchain = require('../task/bgchain');

// var config = require('../config/config');
// const host = 'http://'+ config.host_ip + config.host_port + '/bigchain';

// // USE BY CRONS
// function getOneBiodata ()
// {   
//     return new Promise(function(resolve, reject){
//         //  get the first  data from monggo
//         Biodata.findOne({}, function(error, data) {
//             if (data){
//                 resolve({ok:200, data:data})
//             }
//             else if (error)
//             {
//                 console.log(error)
//                 reject({err:404})
//             }
//         });
//     })
   
// }

// //send biodata to bigchaindb
// function sendOneBiodata(payload)
// { 
//     return new Promise(async function(resolve,reject){

//         // var host = 'http://192.168.15.17:5000/bigchain'
//         console.log('Patient age :' + payload.age);
//         // send data to BigchainDBS

//         // const instance = axios.create({
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     }
//         // })
        
//         bigchain.saveToBigchain(payload)
//             .then(function (status){
//             if (status.ok == 200){
//                 resolve({ok:200, data_id:status.data_id})
//             }
//             else {
//                 res.status(400)
//             }
//         })
//     })
// }

// function deleteOneBiodata (id)
// {   
//     return new Promise(async function(resolve,reject){
//         // delete data from monggo 
//         Biodata.findByIdAndRemove(id, function(err,data)
//         {
//             if(!err){
//                 if (data === 1) {
//                     console.log("Deletion Fail");
//                     resolve({ok:200, data_id:id})
//                 }
//                 else {
//                     console.log(data + " data deleted");
//                     reject({ok:400, data_id:id})
//                 }
//             }
//         });
//     });
  
// }

// function transferBiodata (host)
// {   
//     return new Promise(async function(resolve,reject){
//         // var payload = getOneBiodata();
        
//         getOneBiodata()
//             .then(function(status){
//             if (status.ok == 200 && status.data)
//             {
//                 // console.log("transferBiodata :",status.data._id)
//                 sendOneBiodata(status.data)
//                 .then(function(status){
//                     console.log("Ready to delete data :",status.data_id)
//                     deleteOneBiodata(status.data_id)
//                     .then(function(status){
//                            console.log(status)
//                         }).catch (function(err){
//                             console.log(err);
//                         });

//                 }).catch(function(err){
//                     console.log(err);
//                 })

//             } else {
//                 reject ({status:404})
//             }
            
//         }).catch (function(err){
//             console.log(err);
//         });
        
//     })
// }

// // module.exports.getOneBiodata = getOneBiodata;
// // module.exports.sendOneBiodata = sendOneBiodata;
// // module.exports.deleteOneBiodata = deleteOneBiodata;
// module.exports.transferBiodata = transferBiodata;