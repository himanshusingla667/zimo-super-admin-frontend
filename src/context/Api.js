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
export let desStatus = () =>enviornment.baseUrl + '/api/v1/designation/changeStatus'


// Department api
export let departmentupdate = () =>  enviornment.baseUrl+'/api/v1/department/update'
export let departmentadd = () =>  enviornment.baseUrl+'/api/v1/department/add'
export let departmentlist = () => enviornment.baseUrl+'/api/v1/department/list'
export let departmentDelet = () =>  enviornment.baseUrl+'/api/v1/department/delete'
export let departmentdetails = () =>  enviornment.baseUrl+'/api/v1/department/details'



// skills api
export let skillsList = () => enviornment.baseUrl + '/api/v1/skills/list'  
export let skillsAdd = () => enviornment.baseUrl + '/api/v1/skills/add'
export let skillsDelete = () => enviornment.baseUrl + '/api/v1/skills/delete'
export let skillsEdit = () => enviornment.baseUrl + '/api/v1/skills/edit'
export let skillsDetails = () => enviornment.baseUrl + '/api/v1/skills/details'



// domain api
export let domainAdd = () => enviornment.baseUrl + '/api/v1/domain/addDomain'
export let domainList = () => enviornment.baseUrl + '/api/v1/domain/list' 
export let domainDelete = () => enviornment.baseUrl + '/api/v1/domain/delete'
export let domainEdit = () => enviornment.baseUrl + '/api/v1/domain/edit'
export let domainDetails = () => enviornment.baseUrl + '/api/v1/domain/details'


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