import React from 'react'

// ** Mui
import Stack from '@mui/material/Stack'

// ** Ag-Grid and register module
import { AgGridReact } from 'ag-grid-react'
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  RowApiModule,
  ValidationModule,
  ClientSideRowModelApiModule,
  HighlightChangesModule,
  CustomFilterModule,
  DateFilterModule,
  NumberFilterModule,
  TextFilterModule,
  NumberEditorModule,
  TextEditorModule
} from 'ag-grid-community'

import { SetFilterModule, MultiFilterModule, GroupFilterModule } from 'ag-grid-enterprise'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowApiModule,
  ValidationModule,
  ClientSideRowModelApiModule,
  HighlightChangesModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  SetFilterModule,
  MultiFilterModule,
  GroupFilterModule,
  CustomFilterModule,
  NumberEditorModule,
  TextEditorModule
])

// ** types
import { IAgDataGridProps } from './types'
import useAgGridDefaults from './useAgGridDefaults'

const AgDataGrid = <RowType,>({ gridRef, ...props }: IAgDataGridProps) => {
  const defaults = useAgGridDefaults()
  return (
    <Stack sx={{ height: '600px' }}>
      <AgGridReact<RowType> {...defaults} {...props} ref={gridRef} />
    </Stack>
  )
}

export default AgDataGrid
