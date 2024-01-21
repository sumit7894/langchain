'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";
import axios from 'axios';



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

     const response = await fetch('/api/extract-info', {
        method: 'POST',
        body: myFile,
      }); 


      //const data = await response.json();
      //setExtractedInfo(data.extractedInfo);

      console.log(myFile)

      //const myFile= formData.get('file')
/*       await axios.post('http://localhost:3000/api/extract-info', {myFile})
      .then(function (response) {
        console.log(response);
      })
 */
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
