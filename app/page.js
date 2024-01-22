'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";
import axios from 'axios';
import ConvertApi from 'convertapi-js';

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const [tableData,setTableData] = useState();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const formData = new FormData();
      formData.append('file', file);
      const myFile = formData.get('file')

      let convertApi = ConvertApi.auth('4B3TUXRUHfqdihbj')
      console.log("here is auth detail",convertApi);
      let params = convertApi.createParams()
      params.add('File', myFile);
      let result = await convertApi.convert('pdf', 'txt', params)
      let text = await axios.get(result.dto.Files[0].Url)

      const response = await axios.post('http://localhost:3000/api/extract-info', {text:`${text.data}`})
      setTableData(response.data);

    } catch (error) {
      console.error(error);
      alert('Failed to extract information');
    }
  };


    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <div>
            <label className={styles.fileInputLabel} htmlFor="fileInput">
              Choose a PDF file
            </label>
            <input
              id="file__input"
              className={styles.fileInput}
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
          {tableData ? (
            <p>Below is the processed data in table format</p>
          ) : (
            <p>Processing..</p>
          )}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData ? (
              Object.entries(tableData).map(([field, value]) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>{value}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    );
}
