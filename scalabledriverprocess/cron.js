var osu = require('node-os-utils');
var cpu = osu.cpu;
const cron = require('node-cron');
var Patient = require('../models/Patient');
var bigchain = require('./bigchain');

const targetCPU = 50;
function startScalableDriver () {
    cron.schedule("*/5 * * * * *", () => {
    // cron.schedule("* 20 * * * *", () => {
      console.log('Cron Started');

      var cpuPercent;
      cpu.usage()
        .then(function(status){
            // console.log(status);
            cpuPercent = status;

            if (cpuPercent < targetCPU) {

              console.log("CPU less than", targetCPU);

              Patient.findOne({}, function(error, payload) {
                if (payload){
                  console.log('model: ',payload);

                  bigchain.saveToBigchain(payload)
                      .then(function (status){
                      if (status.ok == 200){


                        Patient.findByIdAndRemove(payload._id, function(err,data)
                        {
                            if(!err){
                                if (data === 1) {
                                    console.log("Deletion Fail");
                                    // resolve({ok:200, data_id:id})
                                }
                                else {
                                    console.log(data + " data deleted");
                                    // reject({ok:400, data_id:id})
                                }
                            }
                        });

                        return true;
                      }
                      else {
                          return false;
                      }
                  });
                  // Patient.findByIdAndRemove(payload._id, function(err,data)
                  //       {
                  //           if(!err){
                  //               if (data === 1) {
                  //                   console.log("Deletion Fail");
                  //                   // resolve({ok:200, data_id:id})
                  //               }
                  //               else {
                  //                   console.log(data + " data deleted");
                  //                   // reject({ok:400, data_id:id})
                  //               }
                  //           }
                  //       });
                  
                }
                else if (error)
                {
                    console.log(error);
                }
            });

            }
            else {
              console.log("CPU load high")
            }

        }).catch(function(err){
            console.log(err);
        })
    });
  }
  

module.exports.startScalableDriver = startScalableDriver;