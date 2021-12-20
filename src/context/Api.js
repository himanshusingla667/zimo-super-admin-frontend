import enviornment from "../enviornment/enviornment";



// credential apis
export let login = () => enviornment.baseUrl + '/api/v1/user/login'
export let signUp = () => enviornment.baseUrl + '/api/v1/user/register'
export let logout = () => enviornment.baseUrl + '/api/v1/user/logout'


//designation api
export let adddes = () => enviornment.baseUrl + '/api/v1/designation/add'
export let deslist = () => enviornment.baseUrl + '/api/v1/designation/list'
export let editdes = () => enviornment.baseUrl + '/api/v1/designation/update'
export let detailDes = () => enviornment.baseUrl + '/api/v1/designation/details'
export let delDes = () =>enviornment.baseUrl + '/api/v1/designation/delete' 
export let desToggle = () =>enviornment.baseUrl + '/api/v1/designation/changeStatus'



// Department api
export let departmentupdate = () =>  enviornment.baseUrl+'/api/v1/department/update'
export let departmentadd = () =>  enviornment.baseUrl+'/api/v1/department/add'
export let departmentlist = () => enviornment.baseUrl+'/api/v1/department/list'
export let departmentDelet = () =>  enviornment.baseUrl+'/api/v1/department/delete'
export let departmentdetails = () =>  enviornment.baseUrl+'/api/v1/department/details'
export let departmentToggle= () =>  enviornment.baseUrl+'/api/v1/department/changeStatus'



// skills api
export let skillsList = () => enviornment.baseUrl + '/api/v1/skills/list'  
export let skillsAdd = () => enviornment.baseUrl + '/api/v1/skills/add'
export let skillsDelete = () => enviornment.baseUrl + '/api/v1/skills/delete'
export let skillsEdit = () => enviornment.baseUrl + '/api/v1/skills/edit'
export let skillsDetails = () => enviornment.baseUrl + '/api/v1/skills/details'
export let skillsStatus = () => enviornment.baseUrl + '/api/v1/skills/changeStatus'

// Techknowlogy api
export let tecAdd = () => enviornment.baseUrl + '/api/v1/technology/add'
export let tecList = () => enviornment.baseUrl + '/api/v1/technology/list'
export let tecEdit = () => enviornment.baseUrl + '/api/v1/technology/edit'
export let tecDelete = () => enviornment.baseUrl + '/api/v1/technology/delete'
export let tecDetails = () => enviornment.baseUrl + '/api/v1/technology/details'
export let tecToggle = () => enviornment.baseUrl + '/api/v1/technology/changeStatus'


// domain api
export let domainAdd = () => enviornment.baseUrl + '/api/v1/domain/addDomain'
export let domainList = () => enviornment.baseUrl + '/api/v1/domain/list' 
export let domainDelete = () => enviornment.baseUrl + '/api/v1/domain/delete'
export let domainEdit = () => enviornment.baseUrl + '/api/v1/domain/edit'
export let domainDetails = () => enviornment.baseUrl + '/api/v1/domain/details'
export let domainToggle = () => enviornment.baseUrl + '/api/v1/domain/changeStatus'


// comapny api
export let companyList = () => enviornment.baseUrl + '/api/v1/company/list' 
export let companyDelete = () => enviornment.baseUrl + '/api/v1/company/delete'
export let companyAdd = () => enviornment.baseUrl + '/api/v1/company/add' 



// country api
export let countryList = () => enviornment.baseUrl + '/api/v1/country/list' 
export let countryDelete = () => enviornment.baseUrl + '/api/v1/country/delete'
export let countryAdd = () => enviornment.baseUrl + '/api/v1/country/add' 
export let countryEdit = () => enviornment.baseUrl + '/api/v1/country/edit'
export let countryDetails = () => enviornment.baseUrl + '/api/v1/country/details'
export let countryToggle = () => enviornment.baseUrl + '/api/v1/country/changeStatus'
 
// State api
export let stateAdd = () => enviornment.baseUrl + '/api/v1/state/createState'
export let stateList = () => enviornment.baseUrl + '/api/v1/state/list' 
export let StateEdit = ()=> enviornment.baseUrl + '/api/v1/state/updateData'
export let StateDetails= ()=> enviornment.baseUrl + '/api/v1/state/details'
export let StateDelete= ()=> enviornment.baseUrl + '/api/v1/state/delete'
export let StateToggle= ()=> enviornment.baseUrl + '/api/v1/state/changeStatus'



