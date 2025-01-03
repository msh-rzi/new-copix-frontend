import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseSocketOptions {
  url: string // The Socket.IO server URL
  eventHandlers?: { [event: string]: (data: any) => void } // Handlers for incoming events
  options?: Parameters<typeof io>[1] // Options for the Socket.IO client
}

export const useSocket = ({ url, eventHandlers = {}, options }: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const socketInstance = io(url, options)

  useEffect(() => {
    setSocket(socketInstance)

    socketInstance.on('connect', () => {
      setIsConnected(true)
      console.log('Socket.IO connected')
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
      console.log('Socket.IO disconnected')
    })

    // Attach event handlers
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socketInstance.on(event, handler)
    })

    return () => {
      socketInstance.disconnect()
      setSocket(null)
    }
  }, [url, options, eventHandlers])

  const emitEvent = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data)
      console.log(`Emitted event: ${event}`, data)
    } else {
      console.error('Socket is not connected')
    }
  }

  return { isConnected, emitEvent, socket }
}
