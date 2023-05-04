import { useEffect, useRef } from 'react'


function Canvas() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = 'blue'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  return (
    <>
      <canvas ref={canvasRef}/>
    </>
  )
}

export default Canvas