import React from 'react'

import Card from 'src/@core/components/mui/card'
import Stack from '@mui/material/Stack'
import ApexCandlestickChart from 'src/views/components/apex-charts/ApexCandlestickChart'
import { apiEndpoints } from 'src/constants/endpoints'
import { apiGateway } from 'src/utils/api-gateway'
import { Button } from '@mui/material'

type ChartDataType = {
  data: {
    x: string
    y: number[]
  }[]
}[]

type chartRawDataType = {
  coinId: string
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  marketCap: number
}

const CandleChart = () => {
  const [chartRawData, setChartRawData] = React.useState<chartRawDataType[]>([])
  const initialChartData = async () => {
    const req = await apiGateway({
      method: 'POST',
      url: apiEndpoints.cryptocurrency.GET_CANDELSTICK_DATA,
      data: {
        id: 'bitcoin',
        vs_currency: 'usd',
        days: 365
      }
    })

    if (req.isOk) {
      setChartRawData(req.data)
    }
  }

  const chartData: ChartDataType = [
    {
      data: chartRawData.map(item => ({
        x: new Date(item.date).toLocaleDateString(),
        y: [+item.open.toFixed(2), +item.high.toFixed(2), +item.low.toFixed(2), +item.close.toFixed(2)]
      }))
    }
  ]

  console.log({ chartData })

  return (
    <Card
      headerState='Charts'
      headerAdornment={
        <Button size='small' variant='contained' onClick={initialChartData}>
          Get Data
        </Button>
      }
      sx={{
        p: 4
      }}
    >
      <Stack>
        <ApexCandlestickChart series={chartData} />
      </Stack>
    </Card>
  )
}

export default CandleChart
