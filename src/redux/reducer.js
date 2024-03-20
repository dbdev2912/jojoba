import apiProxy from './api-proxy';

import defaultBranch from './route/default-branch';
import databaseBranch from './route/database-branch';

import lang from './configs/lang'
import functions from './configs/functions'

const currentLang = localStorage.getItem('lang')



const initialState = {
    apiProxy,
    lang: lang[currentLang] ?  lang[currentLang] : lang['vi'],
    functions,
}


export default ( state = initialState, action ) => {
    switch (action.branch) {
        case "db": /* This is not has been used yet */
            return databaseBranch( state, action );
            break;
        default: /* The branch always goes here */
            return defaultBranch( state, action )
            break;
    }
}
