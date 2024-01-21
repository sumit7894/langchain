import ConvertApi from 'convertapi-js';
import axios from 'axios';
import { ChatOpenAI } from "@langchain/openai";
import NextCors from 'nextjs-cors';
import { NextResponse } from 'next/server';

//const openai = new OpenAI(process.env.OPENAI_API_KEY);
/*
export default async function handler(req, res) {
  try {


    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   });



    const { file } = req.body;

    let convertApi = ConvertApi.auth('CjYYyJjXuUk1tW1m')
    let params = convertApi.createParams()
    params.add('File', file);
    let result = await convertApi.convert('pdf', 'txt', params)
    let text = await axios.get(result.dto.Files[0].Url)

    const chatModel = new ChatOpenAI({
      openAIApiKey: "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",
    });

    let final_result = await chatModel.invoke(`Extract the following information only in a key-value JSON format. Do not write any other word except json. Below is a key.
    
    If any key don't have a value print NotFound

    Policy Holder Name
    Date Of Birth
    Policy Number
    Claim Number
    Surgery Date
    Type Of Surgery
    Surgeon Name
    Medical Provider Address
    Total Surgery Cost
    Deductible Paid
    Conditions related to work
    Date Of First Symptoms
    Address for Correspondence
    Phone Number
    Email Address
    Employer Name 
    
    
    ${text.data}
    
    `);
    const extractedInfo = final_result.content;
    console.log(extractedInfo)

    //res.status(200).json(extractedInfo);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to extract information' });
  }
}

*/



export async function POST(req,res) {
  console.log(req)

  const myFile  =await req.body
  console.log(myFile)
  console.log(res)
  return new NextResponse(myFile)

}

export async function GET(){
  const data = {
      name: 'Bishal Shrestha',
      age: '27'
  }
  return NextResponse.json({data})
}