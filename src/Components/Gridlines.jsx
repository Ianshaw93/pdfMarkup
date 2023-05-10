import { useEffect, useRef } from 'react'

// TODO: send in 
// eslint-disable-next-line react/prop-types
function Gridlines({pixelsPerMesh}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        // TODO: needs to redraw all elements each frame
        // TODO: need to add finished polygon or points to object array
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        // FUTURE: recalc gridlines depending on viewport
        // allow zoom and pan of pdf floor plan
        // all gridlines

        let rows = Math.floor(canvas.height / pixelsPerMesh)

        context.lineWidth = 0.2
        for (let i=0; i<rows; i++) {
            // later make 1 long svg -> may have issue removing particular points
            let path_text = 'M 0,' + `${(i+1)*pixelsPerMesh}` + ' h ' + canvas.width + ' '
            let path = new Path2D(path_text);
            context.stroke(path);

        }
        let cols = Math.floor(canvas.width / pixelsPerMesh)

        context.lineWidth = 0.2
        for (let i=0; i<cols; i++) {
            // later make 1 long svg -> may have issue removing particular points
            let path_text = `M ${(i+1)*10}, 0, v ${canvas.width}`
            let path = new Path2D(path_text);
            context.stroke(path);

        }
    }, [])

// should be width and height of image
  return (
  <>
      <canvas 
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className='border border-black rounded-md bg-transparent inset-0 absolute z-5'
      />
  </>
  )
}

export default Gridlines