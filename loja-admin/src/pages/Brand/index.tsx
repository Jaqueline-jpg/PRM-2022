import { ColumnActionsMode, IColumn, Panel, PanelType, SelectionMode, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { IBrand } from "@typesCustom";
import { useEffect, useState } from "react";
import { PageToolBar } from "../../components/PageToolBar";
import { listBrands } from "../../services/server";

export function BrandPage() {
    
    //Entities
    const [brand, setBrand] = useState<IBrand>({} as IBrand);
    const [brands, setBrands] = useState<IBrand[]>([]);

    //State - Mensagens
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setmessageSuccess] = useState('');

    //State - Carregando
    const [loading, setLoading] = useState(true);

    //State - Loading
    const [loading, setLoading] = useState(true);

    //Colunas
    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Nome da Marca',
            fieldName: 'name',
            minWidth: 100,
            isResizable: false,
            columnActionsMode: ColumnActionsMode.disabled

        }
    ]

    useEffect( () => {

        listBrands()
            .then( result => {
                setBrands(result.data)
            })
            .catch( error => {
                setMessageError(error.message);
                setInterval(() => {
                    handleDemissMessageBar('');
                }, 10000);
            })
            .finally( ())

    }, [])

    function handledNew() {
        setBrand({
            name: ''
        });
        
        setOpenPanel(true);

    }

    return(
        <div id="brand-page" className="main-content">
            <Stack horizontal={false}>
                <PageToolBar
                    currentPageTitle="Marcas"
                    loading={loading}
                    onNew={ handledNew }/>

                <MesssageBarCustom
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    onDismiss={handleDemissMessageBar} />

                <div className="data-list">
                    <ShimmeredDetailsList
                        items={brands}
                        columns={columns}
                        setKey="set"
                        enableShimmer={loading}
                        selectionMode={SelectionMode.none} />
                </div>
            </Stack>

            <Panel
                className="panel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de marca"
                isFooterAtBottom={true}
                onDismiss= {() => setOpenPanel(false)}>

                <p>Preencha TODOS os campos obrigatórios identificados por <span className= "required">*</span></p>

                <Stack horizontal={false} className="panel-form-content">
                    <TextField
                        label="Nome da Marca"
                        required
                        value={brand.name}
                        onChange={event => setBrand({...brand, name: (event.target as HTMLInputElement).value})}
                </Stack>
            </Panel>
        </div>
    )
}