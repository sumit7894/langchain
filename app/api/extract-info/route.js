import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from 'next/server';

const openai = process.env.OPENAI_API_KEY;

export async function POST(request,response) {
  const {text}  = await request.json()

  const chatModel = new ChatOpenAI({
    openAIApiKey: openai,
  });

  let final_result = await chatModel.invoke(`Extract the following information only in a key-value JSON format. Do not write any other word except json. Below is a key.
  
  If any key don't have a value print NotFound but do write the all key's even though value is not present keep it Not Found

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
  
  ${text}
  `);
  const extractedInfo = final_result.content;
  return new NextResponse(extractedInfo)
}