import enviornment from "../enviornment/enviornment";



// credential apis
export let login = () => enviornment.baseUrl + '/api/v1/user/login'
export let signUp = () => enviornment.baseUrl + '/api/v1/user/register'



//designation api
export let adddes = () => enviornment.baseUrl + '/api/v1/designation/add'
export let deslist = () => enviornment.baseUrl + '/api/v1/designation/list'
export let editdes = () => enviornment.baseUrl + '/api/v1/designation/update'
export let detailDes = () => enviornment.baseUrl + '/api/v1/designation/details'
export let delDes = () =>enviornment.baseUrl + '/api/v1/designation/delete'



// Department api
export let departmentupdate = () =>  enviornment.baseUrl+'/api/v1/department/update'
export let departmentadd = () =>  enviornment.baseUrl+'/api/v1/department/add'
export let departmentlist = () => enviornment.baseUrl+'/api/v1/department/list'
export let departmentDelet = () =>  enviornment.baseUrl+'/api/v1/department/delete'
export let departmentdetails = () =>  enviornment.baseUrl+'/api/v1/department/details'
