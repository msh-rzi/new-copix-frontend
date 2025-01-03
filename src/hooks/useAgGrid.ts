import { useCallback, useRef } from 'react'
import { ColDef } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

type ColumnsType<RowType> = ColDef<RowType, any>[]

const useAgGrid = <RowType>() => {
  const gridRef = useRef<AgGridReact<RowType>>(null)

  const updateColumns = useCallback(
    (columns: ColumnsType<RowType>) => {
      gridRef.current!.api.setGridOption('columnDefs', columns)
    },
    [gridRef]
  )

  const addRows = useCallback((removePrevRows: boolean, newRows: RowType[]) => {
    const rowData: any[] = []
    if (removePrevRows) {
      gridRef.current!.api.forEachNode(function (node) {
        rowData.push(node.data)
      })
    }
    gridRef.current!.api.applyTransaction({
      remove: removePrevRows ? rowData : null,
      add: newRows
    })!
  }, [])

  const updateAsyncRows = useCallback(
    (newRows: RowType[]) => {
      gridRef.current!.api.applyTransactionAsync({ update: newRows })
    },
    [gridRef]
  )

  const updateCell = useCallback(
    (rowId: string, column: string, data: any) => {
      const rowNode = gridRef.current!.api.getRowNode(rowId)!
      console.log(gridRef)
      console.log({ rowNode })
      if (rowNode) rowNode.setDataValue(column, data)
    },
    [gridRef]
  )

  return {
    gridRef,
    updateColumns,
    addRows,
    updateAsyncRows,
    updateCell
  }
}

export default useAgGrid
