// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const candlestickColors = {
  series1: '#28c76f',
  series2: '#ea5455'
}

type ApexCandlestickChartProps = {
  series?: ApexOptions['series']
}

const ApexCandlestickChart = ({ series }: ApexCandlestickChartProps) => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: {
        enabled: false,
        type: 'xy',
        autoScaleYaxis: true,
        allowMouseWheelZoom: true,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4
          }
        }
      }
    },
    plotOptions: {
      bar: { columnWidth: '40%' },
      candlestick: {
        colors: {
          upward: candlestickColors.series1,
          downward: candlestickColors.series2
        }
      }
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      type: 'datetime',
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Stocks Prices'
        subheader='$50,863.98'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts type='candlestick' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexCandlestickChart
