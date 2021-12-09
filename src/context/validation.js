let genralConfig
export default genralConfig = {
  pattern: {
    NAME: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    NAMENumber: /^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/,
    CLAIMNUMBER: /^[ A-Za-z0-9]*$/,
    REPORTNAME: /^[ A-Za-z]*$/,
    CODE: /^[ A-Za-z_@./#&+-/'/"]*$/,
    DURATION: /^[0-9]{0,3}$/,
    PRICING: /^[0-9.]{0,30}$/,
    CITY: /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
    EMAIL: /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    POSTAL_CODE: /^\d{5}-\d{4}|\d{4}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
    PHONE_NO: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/,
    FIRM_NUMBER: /^[a-z0-9\-]+$/,
    ALPHANUM: /^[a-zA-Z0-9]+$/,
    MOB_NO: /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&]{6,}/,
    DESCRIPTION: /^[ !@#$%^&*()~:;{}?'"=<>A-Za-z0-9_@./#&+-,-]*$/,
    REFNO: /^[ 0-9_@./#&+-,-]*$/,
    TASK_CODE: /^[0-9999]{1,4}$/,
    SUB_DOMAIN: /^[/a-z/A-Z][a-zA-Z0-9-]*[^/-/./0-9]$/,
    PHONE_NO_MASK: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    IVR_ACTION_KEY: /^[0-9]*$/,
    IVR_NUMBER: /^[1-9]*$/,
    RADIUS: /^[0-9]*(?:.)([0-9])+$/,
    LATLONG: /^\s*(\-?\d+(\.\d+)?)$/,
    SSN: /^((\d{3}-?\d{2}-?\d{4})|(X{3}-?X{2}-?X{4}))$/,
    SSN_MASK: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    PRACTICE_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
    USERNAME: /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){1,14}[a-zA-Z0-9]$/,
    USERNAME_MIN_SIZ: /^[a-zA-Z0-9_](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9_]){4,18}[a-zA-Z0-9_]$/,
    WICARE_USERNAME: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{1,}/,
    YEAR_MASK: /d{4}/,
    DECIMAL: /\d+(\.\d{1,2})?/,
    NUMBERnDECIMAL: '^\\d+(\\.\\d+)?$',
    WHITESPACE: /^(?![\s-])[\w\s-]+$/,
    MAXLENGTH: 50,
    MINLENGTH: 3,
    PASSWORDMINLENGTH: 6,
    PASSWORDMAXLENGTH: 15,
    MINIMUMVACANCY: 1,
    MAXIMUMVACANCY: 2,
    BACKSPACE: /^((?!\s{2,}).)*$/,
    // BACKSPACE:.*\\S.*[a-zA-z0-9 ],
    URL: '^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$',
  }
}
