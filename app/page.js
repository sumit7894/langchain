'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";
import axios from 'axios';
import ConvertApi from 'convertapi-js';



export default function HomePage() {
  const [file, setFile] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const formData = new FormData();
      formData.append('file', file);
      const myFile = formData.get('file')

      let convertApi = ConvertApi.auth('CjYYyJjXuUk1tW1m')
      let params = convertApi.createParams()
      params.add('File', myFile);
      let result = await convertApi.convert('pdf', 'txt', params)
      let text = await axios.get(result.dto.Files[0].Url)

      //const data = await response.json();

      
      const response = await axios.post('http://localhost:3000/api/extract-info', {text:`${text.data}`})
      console.log(response.data)
      console.log(response.data.ClaimNumber)
     // setExtractedInfo(response.data);

    } catch (error) {
      console.error(error);
      alert('Failed to extract information');
    }
  };

  return <>
    <div className={styles.body}>
      <div>
      <input
      type="file"
      accept=".pdf" 
      onChange={handleFileChange} 
      />
      <button
      className={styles.upload__button}
      onClick={handleSubmit}
      >
      Upload
      </button>
      </div>
      {extractedInfo}
      </div>
    </>
}
