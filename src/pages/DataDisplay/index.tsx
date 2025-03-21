import DataGridDisplay from '../../components/DataGridDisplay';
import { FlexItem, Panel, StackLayout, } from "@salt-ds/core";
import { clsx } from "clsx";
import { useAgGridHelpers } from '../../helpers/useAgGridHelpers';
import styles from './index.module.css'
import { defaultColumns, masterDetailColumns } from "../../Datasets";
// import defaultData from '../../Datasets/defaultData.json'
import defaultData10KData from '../../Datasets/defaultData10KData.json'
import { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import GridDataService from '../../services/GridDataService';
import ApiService from '../../services/ApiService';
// import { useGet } from '../../services/ApiService';
const DetailCellRenderer = () => {
  const [nestedData, setNestedData] = useState(null)
  const { containerProps } = useAgGridHelpers();
  const GetData = () => {
    GridDataService.fetchDefaultData()
      .then((res: any) => {
        setNestedData(res)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    GetData()
  }, [])
  return (
    <div
      className={containerProps.className}
      style={{ height: "100%", padding: 20 }}
    >
      <DataGridDisplay
        columnDefs={masterDetailColumns}
        rowData={nestedData}
      />
    </div>
  )
}
export default function DataDisplay() {
  const [defaultData, setDefaultData] = useState(null)
  const { containerProps } = useAgGridHelpers();
  const gridRef = useRef<AgGridReact>(null);
  const TestApi = ApiService.useGet('/todos' , {requestConfig :{baseUrl : "https://jsonplaceholder.typicode.com/"}})

  const createViewportDatasource = () => {
    let initParams: any;
    return {
      init: (params: any) => {
        initParams = params;
        params.setRowCount(defaultData10KData.length);
      },
      setViewportRange() {
        initParams.setRowData(defaultData10KData);
      },
      destroy: () => { },
    };
  };
  const viewportDatasource = useMemo(() => {
    return createViewportDatasource();
  }, []);
  const GetData = () => {
    GridDataService.fetchDefaultData()
      .then((res: any) => {
        setDefaultData(res)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    GetData()
    TestApi.fetchData()
  }, [])
  return (
    <StackLayout align='center'>
      <FlexItem>
        <Panel {...containerProps}
          className={clsx(containerProps.className, {
          }, styles.dataGridBorder, styles.dataGridContainer)} >
          <h1>Using Api Middleware</h1>
          {
            TestApi.loading ?
            <h3>Loading Data ...</h3>
            :
            <table border={1} width={"100%"} cellPadding={10} cellSpacing={0}  >
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
                {
                  TestApi.response?.map((item:any)=>(
                    <tr key={item?.id}>
                      <td>{item?.id}</td>
                      <td>{item?.title}</td>
                      <td>{JSON.stringify(item?.completed)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          }
        </Panel>
        <br />
        <h1>Basic Data Display</h1>
        {/* <Divider variant="tertiary" /> */}
        <br />
        <Panel
          // variant="secondary"
          {...containerProps}
          className={clsx(containerProps.className, {
            // "ag-theme-salt-variant-secondary": true,
            // "ag-theme-salt-variant-secondary" :true,
          }, styles.dataGridBorder, styles.dataGridContainer)}
        >
          <DataGridDisplay
            rowData={defaultData}
            columnDefs={defaultColumns}
            rowSelection={"multiple"}
          />
        </Panel>
      </FlexItem>
      <FlexItem >
        <h1>Master Details Data Display</h1>
        <br />
        <Panel
          // variant="secondary"
          {...containerProps}
          className={clsx(containerProps.className, {
          }, styles.dataGridBorder, styles.dataGridContainer)}
        >
          <DataGridDisplay
            ref={gridRef}
            columnDefs={masterDetailColumns}
            detailCellRenderer={DetailCellRenderer}
            detailCellRendererParams={{
              detailGridOptions: { columnDefs: masterDetailColumns },
              getDetailRowData: (params: {
                successCallback: (rowData: typeof defaultData) => void;
              }) => params.successCallback(defaultData),
            }}
            masterDetail={true}
            detailRowHeight={300}
            rowData={defaultData}
          // onFirstDataRendered={onFirstDataRendered}
          />
        </Panel>
      </FlexItem>
      <FlexItem  >
        <h1>Datatable with 20000 rows</h1>
        <br />
        <Panel
          {...containerProps}
          className={clsx(containerProps.className, styles.dataGridBorder, styles.dataGridContainer)}
        >
          <DataGridDisplay
            rowData={defaultData10KData}
            columnDefs={defaultColumns}
            rowModelType={"viewport"}
            viewportDatasource={viewportDatasource}
          />
        </Panel>
      </FlexItem>
    </StackLayout>
  )
}
