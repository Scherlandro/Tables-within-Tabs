import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Column {
  id: 'name' | 'code' ;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

interface Column2 {
  id:  'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 }
]
const columns2: Column2[] = [
  {
    id: 'population',
    label: 'Population',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
}

interface Data2 {
  population: number;
  size: number;
  density: number;
}

function createData( name: string, code: string): Data {
  return { name, code };
}

function createData2( population: number,  size: number): Data2 {
  const density = population / size;
  return {  population, size, density };
}

const rows = [
  createData('India', 'IN'),
  createData('China', 'CN'),
  createData('Italy', 'IT'),
  createData('United States', 'US'),
  createData('Canada', 'CA'),
  createData('Australia', 'AU'),
  createData('Germany', 'DE'),
  createData('Ireland', 'IE'),
  createData('Mexico', 'MX'),
  createData('Japan', 'JP'),
  createData('France', 'FR'),
  createData('United Kingdom', 'GB'),
  createData('Russia', 'RU'),
  createData('Nigeria', 'NG'),
  createData('Brazil', 'BR'),
];

const rows2 = [
  createData2( 1324171354, 3287263),
  createData2( 1403500365, 9596961),
  createData2( 60483973, 301340),
  createData2( 327167434, 9833520),
  createData2( 37602103, 9984670),
  createData2( 25475400, 7692024),
  createData2(83019200, 357578),
  createData2(4857000, 70273),
  createData2( 126577691, 1972550),
  createData2(126317000, 377973),
  createData2( 67022000, 640679),
  createData2( 67545757, 242495),
  createData2( 146793744, 17098246),
  createData2( 200962417, 923768),
  createData2( 210147125, 8515767),
];



function TabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function tabIndex(index:any) {
  return {    id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`   };
}


export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab label="Country" {...tabIndex(0)} />
      <Tab label="Density" {...tabIndex(1)} />
    </Tabs>
  <TabPanel value={value} index={0}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (    
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >            
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value) : value}
                        </TableCell>
                      );  })}
                  </TableRow>
                );
              })}
          </TableBody>  
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />      
  </TabPanel>

  <TabPanel  value={value} index={1}  >
  <TableHead>
            <TableRow>
              {columns2.map((column) => (    
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >            
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>   

  <TableBody >
            {rows2
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.density}>
                    {columns2.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>

          <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TabPanel>
    </Paper>
  );
}

