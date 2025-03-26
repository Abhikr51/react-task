import { FlexItem, Panel, StackLayout, } from "@salt-ds/core";
import { clsx } from "clsx";
import { useAgGridHelpers } from '../../helpers/useAgGridHelpers';
import styles from './index.module.css'
import { useEffect } from 'react';
import { JSON_PLACEHOLDER_URL } from "../../app.config";
import Endpoints from "../../endpoints";
import { useGet } from "../../services/ApiMiddleware/useApiMethods";
//todo : create separate
interface userType {
    // completed: boolean,
    // id: number,
    title: string,
    userId: number
}
export default function MiddlewareDemo() {
    const { containerProps } = useAgGridHelpers();
    const TestApi = useGet<userType[]>(Endpoints.todos, {
        overriddenConfig: {
            baseURL: JSON_PLACEHOLDER_URL
        }
    })
    const TestApi2 = useGet(`${Endpoints.todos}/1`)

    useEffect(() => {
        TestApi.load()
        TestApi2.load()
    }, [])
    return (
        <StackLayout align='center'>
            <FlexItem>
                <h1>Middleware Demo</h1>
                <br />
                <Panel {...containerProps}
                    className={clsx(containerProps.className, {
                    }, styles.dataGridBorder, styles.dataGridContainer)} >
                        <h3>Test Api 2</h3>
                    {
                        TestApi2.loading ? <p>Loading 2....</p> : <p>{JSON.stringify(TestApi2.data)}</p>
                    }
                    <h1>Test Api 1</h1>
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
                                        TestApi.data?.map((item: any) => (
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
            </FlexItem>

        </StackLayout>
    )
}
