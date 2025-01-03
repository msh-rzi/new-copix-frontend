import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Card from 'src/@core/components/mui/card'
import { apiEndpoints } from 'src/constants/endpoints'
import { apiGateway } from 'src/utils/api-gateway'

type Coin = {
  availableToWithdraw: string
  coin: string
  equity: string
  locked: string
  walletBalance: string
}

type AccountData = {
  accountIMRate: string
  accountLTV: string
  accountMMRate: string
  accountType: string
  coin: Coin[]
  totalAvailableBalance: string
  totalEquity: string
  totalInitialMargin: string
  totalMaintenanceMargin: string
  totalMarginBalance: string
  totalPerpUPL: string
  totalWalletBalance: string
}

export default function BybitBalance() {
  const [balance, setBalance] = useState<AccountData | null>()

  const getBalance = async () => {
    const req = await apiGateway({
      url: apiEndpoints.exchange.GET_BYBIT_BALANCE,
      method: 'post'
    })

    if (req.isOk) {
      setBalance(req.data.result.balance.at(0))
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  //   console.log({ balance })
  const sortedCoins = balance?.coin.sort((a, b) => +b.walletBalance - +a.walletBalance)

  return (
    <Card
      headerState={`$ ${balance?.totalWalletBalance || 0}`}
      headerAdornment={
        <Button size='small' variant='contained' onClick={getBalance}>
          Refresh
        </Button>
      }
      sx={{
        p: 4
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Locked</TableCell>
              <TableCell align='center'>Equity</TableCell>
              <TableCell align='center'>Available to withdraw</TableCell>
              <TableCell align='center'>Wallet Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCoins &&
              sortedCoins.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align='left' sx={{ display: 'flex', alignItems: 'center' }}>
                      {row.coin}
                    </TableCell>
                    <TableCell align='center'>{row.locked}</TableCell>
                    <TableCell align='center'>{row.equity}</TableCell>
                    <TableCell align='center'>{row.availableToWithdraw}</TableCell>
                    <TableCell align='center'>{row.walletBalance}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
