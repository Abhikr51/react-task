import SaltAgGrid from "../../hoc/SaltAgGrid";
import { FlexItem, Panel, PanelProps, StackLayout, } from "@salt-ds/core";
import { clsx } from "clsx";
import { useAgGridHelpers } from '../../helpers/useAgGridHelpers';
import styles from './index.module.css'
import { defaultColumns } from "../../Datasets";
import { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import GridDataService from '../../services/GridDataService';
import ApiService from '../../services/ApiService';
import SaltAvatar from "../../hoc/SaltAvatar";

export default function SaltHoc() {
    const [defaultData, setDefaultData] = useState(null)
    const { containerProps } = useAgGridHelpers();
    const gridRef = useRef<AgGridReact>(null);
    const TestApi = ApiService.useGet('/todos', { requestConfig: { baseUrl: "https://jsonplaceholder.typicode.com/" } })
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
    interface PanelWrapperProps extends PanelProps {
        headerTitle: string
    }
    return (
        <StackLayout align='center'>
            <FlexItem>
                <h1>Ag Grid</h1>
                <br />
                <Panel
                    {...containerProps}
                    className={clsx(containerProps.className, styles.dataGridBorder, styles.dataGridContainer)}
                >
                    <SaltAgGrid
                        rowData={defaultData}
                        columnDefs={defaultColumns}
                        rowSelection={"multiple"}
                    />
                </Panel>
            </FlexItem>
            <FlexItem>
                <h1>Avatar</h1>
                <br />
                <Panel
                    {...containerProps}
                    className={clsx(containerProps.className, styles.dataGridBorder, styles.dataGridContainer )}
                    style={{ height : 100 }}
                >
                    <SaltAvatar
                       name="Alex Brailescu"
                    />
                </Panel>
            </FlexItem>
            
        </StackLayout>
    )
}
