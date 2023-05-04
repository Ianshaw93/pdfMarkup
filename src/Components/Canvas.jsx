import { useEffect, useRef } from 'react'


function Canvas() {
  const canvasRef = useRef(null)
  // const canvas = canvasRef.current
  // const context = canvas.getContext('2d')
  useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      context.fillStyle = 'blue'
      context.fillRect(0, 0, context.width, context.height)
  }, [])

  function handleClick(event) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      context.fillStyle = 'blue'
      context.fillRect(event.clientX - 50, event.clientY - 50, 10, 10)        
  }

  return (
  <>
      <canvas 
      ref={canvasRef}
      // width={clientWidth}
      // height={context.height}
      className='border border-black rounded-md bg-transparent inset-0 absolute z-10'
      onClick={handleClick}
      />
  </>
  )
}

export default Canvas