import React, { useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

import Card from 'src/@core/components/mui/card'
import { Button, Stack } from '@mui/material'
import { apiEndpoints } from 'src/constants/endpoints'
import { apiGateway } from 'src/utils/api-gateway'
import { CustomCellRendererProps } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import useAgGrid from 'src/hooks/useAgGrid'
import AgDataGrid from 'src/@core/components/ag-grid'

type Row = {
  id: string
  crypto: string
  image: string
  name: string
  symbol: string
  price?: number
  marketCapRank?: number
}

function mapToRow(data: any): Row {
  return {
    id: data.id,
    crypto: data.crypto,
    image: data.imageUrl,
    name: data.name,
    symbol: data.symbol,
    price: data.price || 0,
    marketCapRank: data.marketCapRank
  }
}

const CoinsGrid = () => {
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null)
  const { gridRef, updateCell, addRows } = useAgGrid<Row>()
  const [cols] = useState<ColDef<Row, any>[]>([
    { headerName: '#', field: 'marketCapRank', width: 50, flex: 0 },
    {
      headerName: 'Name',
      field: 'crypto',
      cellRenderer: (params: CustomCellRendererProps) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
            <img src={params.data.image} alt={params.data.name} style={{ width: 24, height: 24, marginRight: 8 }} />
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: 4, height: '100%' }}>
              <span>{params.data.name}</span>
              <span style={{ color: '#b3b3b3', fontSize: '12px' }}>( {params.data.symbol.toUpperCase()} )</span>
            </span>
          </div>
        )
      }
    },
    { headerName: 'Price', field: 'price' }
  ])
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    const socket = io('http://localhost:3000')
    setSocketInstance(socket)

    const handleConnect = () => {
      console.log('Connected to socket.io server')
      onGetCoinsClick()
      setIsSocketConnected(true)
      socket.emit('request-coins-price')
    }

    const handleDisconnect = () => {
      console.log('Disconnected from socket.io server')
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('coin-data')
      socket.off('disconnect', handleDisconnect)
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    onCoinPriceUpdate()
  }, [socketInstance])

  const onGetCoinsClick = async () => {
    const req = await apiGateway({
      url: apiEndpoints.cryptocurrency.GET_ALL_COINS
    })

    if (req.isOk) {
      const newRows = req.data.map((r: Row) => mapToRow(r))
      const isNeedToRemoveOlderRows = !gridRef.current?.api.isRowDataEmpty()
      addRows(isNeedToRemoveOlderRows, newRows)
      // setRows(newRows)
    }
  }

  const onCoinPriceUpdate = () => {
    if (!socketInstance) return

    const handleCoinData = (data: { coinId: string; priceUsd: string }[]) => {
      console.log({ data })
      data.forEach(d => {
        updateCell(d.coinId, 'price', +d.priceUsd)
      })
    }
    socketInstance.on('coin-data', handleCoinData)
  }

  return (
    <Card
      headerState='Coins'
      headerAdornment={
        <>
          <Button size='small' variant='contained' onClick={onGetCoinsClick}>
            Get Coins
          </Button>
          <Button size='small' variant='contained' onClick={onCoinPriceUpdate}>
            update price
          </Button>
        </>
      }
      sx={{
        p: 4
      }}
    >
      <Stack sx={{ height: '600px' }}>
        <AgDataGrid<Row> gridRef={gridRef} rowData={rows} columnDefs={cols} />
      </Stack>
    </Card>
  )
}

export default CoinsGrid
