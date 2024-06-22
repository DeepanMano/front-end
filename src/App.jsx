import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState(null)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const termFileInputRef = useRef(null)

  const supportFileExtensions = useRef(["*/image"]);


  const fetchdataTwo = (data) => {
    setIsLoading(true)
    const formdata = new FormData();
    formdata.append("image", data);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("https://DM03.pythonanywhere.com/api/metadata/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result)
        setIsLoading(false)
        console.log(result)
      })
      .catch((error) => console.error(error));
  }

  
  const onInputClick = (event) => {
    event.target.value = ''
    setFile(null)
    setData(null)
}


  const handleFileUpload = (e) => {
    setFile(e.target.files[0])
    fetchdataTwo(e.target.files[0])
  }

  const handleInputClick = () => {
    termFileInputRef.current.click()
}

  return (
    <div className='main'>
      <div className='main-wrapper'>
        {/* <input type='file' onChange={handleFileUpload} /> */}
        <div className='left-side-bar'>
          {file == null ? (<div class="dropzone-wrapper" onClick={handleInputClick} >
            <div class="dropzone-desc">
              <i class="glyphicon glyphicon-download-alt"></i>
              <p>Choose an image file or drag it here.</p>
            </div>
            {/* <input type="file" name="img_logo" onChange={handleFileUpload} class="dropzone" /> */}
            <input
                type="file"
                ref={termFileInputRef} 
                accept={supportFileExtensions.current.join(",")}
                onChange={(e) => handleFileUpload(e)}
                onClick={onInputClick}
                hidden
            />
          </div>) : (
            <>
            <span className='close' onClick={onInputClick}></span>
            <img src={window.URL.createObjectURL(file)} />
            </>
          )}
        </div>
        <div className='splitter'></div>
        <div className='right-side-bar'>
          {isLoading ?(
            <div>
              <div class="ocrloader">
                <em></em>
                <div>
                    <img style={{width:'100%',height:'100%'}} src={window.URL.createObjectURL(file)} />
                </div>
                <span></span>
              </div>
            </div>
          ) : (<>
          {data != null && <div className='image-info'>
            <h2 style={{color: '#000000'}}>Image Information:</h2>
            <ul>
              {Object?.keys(data)?.map(key => (
                <li key={key}>
                  <span>{`- `}</span>
                   <strong>{key}:</strong> {typeof data[key] === 'boolean' ? (data[key] ? 'Yes' : 'No') :  data[key]}
                </li>
              ))}
            </ul>
          </div>}
          </>)}
        </div>
        {/* <button onClick={fetchdataTwo}>click hello api</button> */}
      </div>
    </div>

  )
}

export default App
