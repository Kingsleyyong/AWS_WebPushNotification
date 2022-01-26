import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const pushMessage = ( topic, title, text, selection ) => {
   let params = {
      Message: `{"topic": "${topic}", "title": "${title}", "text": "${text}", "selection": "${selection}"}`,
      TopicArn: process.env.TopicArn
   }

   console.log(typeof params.Message)

   AWS.config.update({
      region: "us-east-1",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

   })

   let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

   publishTextPromise
      .then(
         function(data) {
            console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            console.log("MessageID is " + data.MessageId);
         }
      ).catch(
         function(err) {
            console.error(err, err.stack);
         }
      );
};

export default pushMessage;
