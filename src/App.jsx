import './App.css'
import Canvas from './Components/Canvas'
import { useState } from 'react'

function App() {
  const [ previewImage, setPreviewImage ] = useState();

  return (
    <>
    <div>
      <label>
        <input 
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={({target}) => {
            if (target.files[0]) {
              const file = target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </label>

    </div>
    { previewImage ? <> <img src={previewImage}></img>
    </> : <div> Please upload image </div>}
      <Canvas />
    </>
  )
}

export default App
