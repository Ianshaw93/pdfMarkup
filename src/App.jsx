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
    <div>
      { previewImage ? (<>
        <div className='pointer-events-none'> 
        {/* unclear why height of img is not changed */}
        <img 
        src={previewImage}
        className='inset-0 absolute z-0 pointer-events-none user-drag-none'
        height={window.innerHeight}
        width={window.innerWidth}
        />
        </div>
        <Canvas tool={"polyline"}/>
      </>
      ) : <div> Please upload image </div>}
    </div>
    </>
  )
}

export default App
