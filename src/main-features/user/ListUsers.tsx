import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FilterMatchMode} from "primereact/api";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {IRootState} from "../../shared/reducers";
import {connect} from "react-redux";
import {addRemoveAdmin, blockedUnblockedUser, getEntities, resetListUsers} from "../../shared/reducers/user-reducer";
import {IUser} from "../../shared/model/user.model";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {hasAnyAuthority} from "../../shared/utils/utils-functions";
import {AUTHORITIES} from "../../shared/constants/authorities";



export interface IListUsersProps extends StateProps, DispatchProps{}

export const ListUsers = (props: IListUsersProps) => {
    const [openBlockedModal, setOpenBlockedModal] = React.useState(false);
    const [openRemoveAddModal, setOpenRemoveAddModal] = React.useState(false);
    const [userBlocked, setUserBlocked] = React.useState<IUser>({});
    const [userAddRemoveAdmin, setUserAddRemoveAdmin] = React.useState<IUser>({});
    const [titleAddRemoveAdmin, setTitleAddRemoveAdmin] = React.useState<string>('');
    const [descriptionAddRemoveAdmin, setDescriptionAddRemoveAdmin] = React.useState<string>('');
    const [customers, setCustomers] = React.useState<IUser[]>([]);
    const [filters, setFilters] = React.useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = React.useState(true);
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


    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Customers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const representativeBodyAcitvityTemplate = (rowData: IUser) => {
        return (
            <React.Fragment>
                {
                    !hasAnyAuthority(rowData.authorities || [], [AUTHORITIES.SUPER_ADMIN]) ?
                        <Button label={rowData.blockedByAdmin ? 'UnBlock' : 'Block'} className={rowData.blockedByAdmin ? 'p-button-info' : 'p-button-warning'} onClick={() => onOpenBlockedModal(rowData)}/> : null
                }

                {
                    !hasAnyAuthority(rowData.authorities || [], [AUTHORITIES.SUPER_ADMIN]) ?
                        <Button label={hasAnyAuthority(rowData.authorities || [], [AUTHORITIES.ADMIN]) ? 'Remove Admin' : 'Add Admin'}
                                className="p-button-success"
                                onClick={() => onOpenAddRemovedModal(rowData)}/> : null
                }


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

    const statusRowFilterTemplateSourceRegister = (options: any) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e: any) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option: any) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue2(value);
    }

    const header = renderHeader();

    React.useEffect(() => {
        setLoading(true);
        props.getEntities(0, 20, '');
    }, [])

    React.useEffect(() => {
        if(props.entitiesList?.length){
            setCustomers(props.entitiesList.slice());
            setLoading(false);
        }
    }, [props.entitiesList])


    const renderFooterBlockedModal = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHideBlockedModal()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => confirmBlockedUser()} autoFocus />
            </div>
        );
    }

    const renderFooterAddRemoveAdminModal = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHideAddRemoveModal()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => confirmAddRemoveAdmindUser()} autoFocus />
            </div>
        );
    }

    const onOpenBlockedModal = (user: IUser) => {
        setOpenBlockedModal(true);
        setUserBlocked(user);
    }
    const onHideBlockedModal = () => {
        setOpenBlockedModal(false);
    }

    const onOpenAddRemovedModal = (user: IUser) => {
        setOpenRemoveAddModal(true);
        setUserAddRemoveAdmin(user);
        setTitleAddRemoveAdmin(hasAnyAuthority(user.authorities || [], [AUTHORITIES.ADMIN]) ? 'Remove Admin' : 'Add Admin');
        setDescriptionAddRemoveAdmin(hasAnyAuthority(user.authorities || [], [AUTHORITIES.ADMIN]) ? 'Are you sur to remove this user admin ?' : 'Are you sur to add this user admin ?');
    }
    const onHideAddRemoveModal = () => {
        setOpenRemoveAddModal(false);
    }

    const confirmBlockedUser = () => {
        console.log('userBlocked ', userBlocked);
        setOpenBlockedModal(false);
        props.blockedUnblockedUser(userBlocked.id, (!userBlocked?.blockedByAdmin).toString());
    }

    const confirmAddRemoveAdmindUser = () => {
        console.log('userAddRemoveAdmin ', !hasAnyAuthority(userAddRemoveAdmin.authorities || [], [AUTHORITIES.ADMIN]));
        setOpenRemoveAddModal(false);
        props.addRemoveAdmin(userAddRemoveAdmin.id, (!hasAnyAuthority(userAddRemoveAdmin.authorities || [], [AUTHORITIES.ADMIN])).toString());
    }

    React.useEffect(() => {
        if(props.blockedUnblockedUserSuccess){
            props.resetListUsers();
            setLoading(true);
            props.getEntities(0, 20, '');
        }
    }, [props.blockedUnblockedUserSuccess])

    React.useEffect(() => {
        if(props.addRemoveAdminSuccess){
            props.resetListUsers();
            setLoading(true);
            props.getEntities(0, 20, '');
        }
    }, [props.addRemoveAdminSuccess])

    return (
        <div className="card">
            <h5>Filter Row</h5>
            <p>Filters are displayed inline within a separate row.</p>
            <DataTable value={customers}
                       paginator
                       className="p-datatable-customers"
                       rows={10}
                       dataKey="id"
                       filters={filters}
                       filterDisplay="row"
                       loading={loading}
                       responsiveLayout="scroll"
                       globalFilterFields={['name', 'phone', 'email', 'status', 'email']}
                       header={header}
                       emptyMessage="No customers found.">
                <Column header="Name" field="name" filter filterPlaceholder="Search by FirstName/LastName" body={representativeBodyTemplateName} style={{ minWidth: '12rem' }}/>
                <Column header="Email" filterField="email" field="email" filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }}/>
                <Column header="Phone" filterField="phone" field="phone" filter filterPlaceholder="Search by phone" style={{ minWidth: '12rem' }}/>
                <Column header="RegisterDate" filterField="registerDate" style={{ minWidth: '12rem' }} field="registerDate" filter filterPlaceholder="Search by registerDate" />
                <Column header="Address" filterField="address" style={{ minWidth: '12rem' }} field="address.city" filter filterPlaceholder="Search by sourceRegister" />
                <Column header="SourceRegister" filterField="sourceRegister" field="sourceRegister" filter filterElement={statusRowFilterTemplateSourceRegister} filterPlaceholder="Search by sourceRegister" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} />
                <Column header="Activated Register" filterField="activatedAccount" field="activatedAccount" filter filterElement={statusRowFilterTemplateSourceRegister} filterPlaceholder="Search by activated" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} />
                <Column header="Activity" sortable  body={representativeBodyAcitvityTemplate} style={{ minWidth: '12rem' }}/>
            </DataTable>

            <Dialog header="Blocked user" visible={openBlockedModal} footer={renderFooterBlockedModal()} onHide={() => onHideBlockedModal()}>
                <p>Are you sur to block this user ?</p>
            </Dialog>

            <Dialog header={titleAddRemoveAdmin} visible={openRemoveAddModal} footer={renderFooterAddRemoveAdminModal()} onHide={() => onHideAddRemoveModal()}>
                <p>{descriptionAddRemoveAdmin}</p>
            </Dialog>
        </div>
    );
}


const mapStateToProps = ({user}: IRootState) => ({
    entitiesList: user.entitiesUser,
    loadingList: user.loadingEntitiesUser,
    blockedUnblockedUserSuccess: user.blockedUnblockedUserSuccess,
    addRemoveAdminSuccess: user.addRemoveAdminSuccess
});

const mapDispatchToProps = {
    getEntities,
    blockedUnblockedUser,
    resetListUsers,
    addRemoveAdmin
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);