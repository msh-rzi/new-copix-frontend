import { AgGridReact, AgGridReactProps } from 'ag-grid-react'

export interface IAgDataGridProps extends AgGridReactProps {
  gridRef: React.LegacyRef<AgGridReact<any>> | undefined
}
