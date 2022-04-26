import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FilterMatchMode} from "primereact/api";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {Dropdown} from "primereact/dropdown";
import {classNames} from "primereact/utils";
import {TriStateCheckbox} from "primereact/tristatecheckbox";
import {IRootState} from "../../shared/reducers";
import {connect} from "react-redux";
import {ListDescriptionAddOffer} from "../offer/ListDescriptionAddOffer";
import {getEntities} from "../../shared/reducers/user-reducer";
import {IUser} from "../../shared/model/user.model";



export interface IListUsersProps extends StateProps, DispatchProps{}

export const ListUsers = (props: IListUsersProps) => {
    const [customers2, setCustomers2] = React.useState<IUser[]>([]);
    const [filters2, setFilters2] = React.useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading2, setLoading2] = React.useState(true);
    const [globalFilterValue2, setGlobalFilterValue2] = React.useState('');
    const representatives = [
        {name: "Amy Elsner", image: 'amyelsner.png'},
        {name: "Anna Fali", image: 'annafali.png'},
        {name: "Asiya Javayant", image: 'asiyajavayant.png'},
        {name: "Bernardo Dominic", image: 'bernardodominic.png'},
        {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
        {name: "Ioni Bowcher", image: 'ionibowcher.png'},
        {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
        {name: "Onyama Limba", image: 'onyamalimba.png'},
        {name: "Stephen Shaw", image: 'stephenshaw.png'},
        {name: "XuXue Feng", image: 'xuxuefeng.png'}
    ];
    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];

    const countryBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                {/*<img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />*/}
                {/*<span className="image-text">{rowData.country.name}</span>*/}
            </React.Fragment>
        );
    }

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const representativesItemTemplate = (option: any) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`images/avatar/${option.image}`} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    const representativeBodyTemplate = (rowData: IUser) => {
        return (
            <React.Fragment>
                <img alt={rowData.imageUrl} src={`images/avatar/${rowData.imageUrl}`} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.email}</span>
            </React.Fragment>
        );
    }

    const representativeBodyTemplateName = (rowData: IUser) => {
        return (
            <React.Fragment>
                <img alt={rowData.imageUrl} src={rowData.imageUrl} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.firstName} {rowData.lastName}</span>
            </React.Fragment>
        );
    }

    const representativeRowFilterTemplate = (options: any) => {
        return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" maxSelectedLabels={1} />;
    }

    const statusBodyTemplate = (rowData: any) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const statusRowFilterTemplate = (options: any) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e: any) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusRowFilterTemplateSourceRegister = (options: any) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e: any) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option: any) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const verifiedBodyTemplate = (rowData: any) => {
        return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified})}></i>;
    }

    const verifiedRowFilterTemplate = (options: any) => {
        return <TriStateCheckbox value={options.value} onChange={(e: any) => options.filterApplyCallback(e.value)} />
    }

    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2['global'].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    }

    const header2 = renderHeader2();

    React.useEffect(() => {
        setLoading2(true);
        props.getEntities(0, 20, '');
    }, [])

    React.useEffect(() => {
        if(props.entitiesList?.length){
            setCustomers2(props.entitiesList.slice());
            setLoading2(false);
        }
    }, [props.entitiesList])

    return (
        <div className="card">
            <h5>Filter Row</h5>
            <p>Filters are displayed inline within a separate row.</p>
            <DataTable value={customers2}
                       paginator
                       className="p-datatable-customers"
                       rows={10}
                       dataKey="id"
                       filters={filters2}
                       filterDisplay="row"
                       loading={loading2}
                       responsiveLayout="scroll"
                       globalFilterFields={['name', 'phone', 'email', 'status']}
                       header={header2}
                       emptyMessage="No customers found.">
                <Column header="Name" field="name" filter filterPlaceholder="Search by FirstName/LastName" style={{ minWidth: '12rem' }}  body={representativeBodyTemplateName}/>
                <Column header="Email" filterField="email" field="email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }}/>
                <Column header="Phone" filterField="phone" field="phone" filter filterPlaceholder="Search by phone" style={{ minWidth: '12rem' }}/>
                <Column header="RegisterDate" filterField="registerDate" style={{ minWidth: '12rem' }} field="registerDate" filter filterPlaceholder="Search by registerDate" />
                <Column header="Address" filterField="address" style={{ minWidth: '12rem' }} field="address.city" filter filterPlaceholder="Search by sourceRegister" />
                <Column header="SourceRegister" filterField="sourceRegister" field="sourceRegister" filter filterElement={statusRowFilterTemplateSourceRegister} filterPlaceholder="Search by sourceRegister" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} />
            </DataTable>
        </div>
    );
}


const mapStateToProps = ({user}: IRootState) => ({
    entitiesList: user.entitiesUser,
    loadingList: user.loadingEntitiesUser
});

const mapDispatchToProps = {
    getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);