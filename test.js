// using watchdog to rejoin the mesh network on disconnect
var watchout = require('watchout');

var watchdog = new watchout(15000, function(haltedTimeout){
    console.log('I should execute much later.');
    //process.exit(1);
   //  seneca.close();

  //    seneca
  //  //  .use('redis-transport',{url: process.env.REDIS_URL})
  //    .use('mesh',
  // {
  //   listen: [
  //    {pin: 'role:system,cmd:watchdog', model:'observe', type:'redis',  port: 6379} 
  //   ],
  //   // required to be detect the base 39999 is the default port
  //   bases: ['127.0.0.1:39999', 'irehearse-habashy.herokuapp.com:80'],
  //   //  host: 'ir-seneca-batch.herokuapp.com'
  // });
})

// redis://h:pbh7cojobnk8s640c0ae3o5squ6@ec2-46-137-186-21.eu-west-1.compute.amazonaws.com:13299
 seneca = require('seneca')({ timeout: 30000,
  log:"test-mesh",
  transport:{
      redis:{
        timeout:2000,
         url:process.env.REDIS_URL||"redis://h:p6kb6mlgljkkqab053a10l4glkq@ec2-46-137-186-21.eu-west-1.compute.amazonaws.com:13569"
      }
    },
  tag: 'test-mesh'})
   .use('redis-transport')
 .client({type:'redis'})
   .listen({type:'redis'})
  // load the mesh plugin
// .use('mesh',
//   {
//     listen: [
//      {model:'observe', type:'redis',  port: 6379} 
//     ],
//     // required to be detect the base 39999 is the default port
//     bases: ['127.0.0.1:39999', 'irehearse-habashy.herokuapp.com:80'],
//     //  host: 'ir-seneca-batch.herokuapp.com'
//   })
  // send a message out into the network
  // the network will know where to send format:hex messages
// first reset it before running 
setTimeout(function(){
  watchdog.reset();
},3000);
seneca.add({role: 'system',cmd: 'watchdog' }, function(args, done){
  // when comes from the server reset the watchdog
  watchdog.reset();
 console.log("done reset");
    done(null, {"test_watch":this.id});

});
seneca.add({role: 'Dummy1', cmd: 'hello'}, function (args, callback) {
            return callback(null, {msg: 'Hello, this is Dummy1'});
        });

