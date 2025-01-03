import { ColDef, GetRowIdParams } from 'ag-grid-community'
import { useCallback, useMemo } from 'react'

const useAgGridDefaults = () => {
  const getRowId = useCallback((params: GetRowIdParams) => {
    return params.data.id
  }, [])

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      editable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }, [])

  return { getRowId, defaultColDef }
}

export default useAgGridDefaults
