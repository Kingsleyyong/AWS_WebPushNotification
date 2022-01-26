import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import SNS from './SNS_sendNotification.js';

const
   app = express(),
   PORT = 8000;

app.use(cors());
app.use(bodyparser.json({ limit: '50mb' }));

app.post('/', (req, res) => {
   try {
      console.log(req.body)
      const { topic, title, text, selection } = req.body;
      SNS(topic, title, text, selection);
      res.status(200).json(req.body);
   }
   catch (e) {
      console.log(e);
      res.status(404).json({ message: error.message });
   }

})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})