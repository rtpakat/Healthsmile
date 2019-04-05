const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()

app.get('/', (req, res) => res.send('online'))
//รับค่าจากฟอร์มในDialogflow
app.post('/', express.json(), (req, res) => {
    //รับค่าที่ได้จากฟอร์ม
    let _package = req.body.queryResult.queryText;
    //เรียก WebhookClient
  const agent = new WebhookClient({ request: req, response: res })
  
  function selectPackage(agent){
    if(_package == "แพ็กเก็ตดูแลสุขภาพ"){
        agent.add("คุณเลือก แพ็กเก็ตดูแลสุขภาพ");
    }else if(_package == "แพ็กเก็ตรักษาประจำ"){
        agent.add("คุณเลือก แพ็กเก็ตรักษาประจำ");
    }else{
        agent.add("Helloให้ A.I. ช่วยเลือกแพคเกจตรวจสุขภาพที่เหมาะสมกับคุณ");
    }
}

//เรียก callIntentที่เราต้องการเรียก และ โยนฟังชั่น
  let intentMap = new Map()
  intentMap.set('Package Intents', selectPackage)
  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 7777)