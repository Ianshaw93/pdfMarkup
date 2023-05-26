import './App.css'
import Canvas from './Components/Canvas'
import { useRef, useState } from 'react'
// import { pdfjs } from "react-pdf";
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/es5/build/pdf';
// import PDFJSWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';

const pdfjs = await import('pdfjs-dist/build/pdf');
const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// GlobalWorkerOptions.workerSrc = PDFJSWorker;


function App() {
  const [ previewImage, setPreviewImage ] = useState();
  const pdfCanvasRef = useRef()

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file && pdfCanvasRef.current) {
      setPreviewImage(true)
      const loadingTask = pdfjs.getDocument(URL.createObjectURL(file))
      loadingTask.promise.then((pdf) => {

        const pageNumber = 1
        pdf.getPage(pageNumber).then((page) => {
          console.log("setting up pdf")
          const canvas = pdfCanvasRef.current
          const context = canvas.getContext("2d")
  
          const scale = 1.5
          const viewport = page.getViewport({ scale: scale })
  
            // Prepare canvas using PDF page dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;
  
            // Render PDF page into canvas context
            var renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(() => {
              console.log("Page rendered");
            });
            
        })
      })
    }  
  }
  return (
    <>
    <div>
      <label>
        <input 
          id="image"
          name="image"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </label>

    </div>
    <div>
      { previewImage ? (<>
        <div className='pointer-events-none'> 
        {/* unclear why height of img is not changed */}
        {/* {previewImage && <img 
        src={previewImage}
        className='inset-0 absolute z-0 pointer-events-none user-drag-none'
        height={window.innerHeight}
        width={window.innerWidth}
        />} */}
        </div>
        <Canvas tool={"polyline"}/>
      </>
      ) : <div> Please upload image </div>}
      <canvas 
      ref={pdfCanvasRef}
      className='z-100'
      />
    </div>
    </>
  )
}

export default App
