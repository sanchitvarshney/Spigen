import { Button } from '@/components/ui/button';

import ActionCellRender from './ActionCellRender';
import { Copy } from 'lucide-react';
import { ColDef } from '@ag-grid-community/core';


export const columnDefs: ColDef[] = [
  { 
    headerName: 'ID', 
    field: 'id', 
    valueGetter: 'node.rowIndex + 1', 
    sortable: true, 
    filter: true,
   maxWidth:80
  },
  { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
  { headerName: 'SKU', field: 'sku', sortable: true, filter: true, cellRenderer: (params:any) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {params.value}
      <Button   className='p-[2px] bg-transparent border-none shadow-none text-cyan-700 hover:bg-transparent' style={{ marginLeft: '10px' }} onClick={() => handleCopy(params.value)}>
        <Copy className='h-[20px] w-[20px] '/>
      </Button>
    </div>
  )},
  { headerName: 'Unit', field: 'unit', sortable: true, filter: true },
  { headerName: 'Category', field: 'category', sortable: true, filter: true , cellRenderer:()=>"Good"},
  { 
    headerName: 'Actions', 
    field: 'actions', 
    cellRenderer: () => (
      <div>
       <ActionCellRender/>
      </div>
    ) 
  }
];

// Handle Copy Button
const handleCopy = (value: any) => {
  navigator.clipboard.writeText(value);
};

// Open Modal Function

export interface RowData {
    id: number;
    productName: string;
    sku: string;
    unit: string;
    category: string;
  }