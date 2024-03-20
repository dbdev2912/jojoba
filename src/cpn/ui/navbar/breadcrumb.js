/**
 * 
 *  props: path <Path>
 * 
 *  Path: {
 *      name: <String>,
 *      url: <String>,
 *      icon: <FontAwsomeIconName> <String>  [ example: "fa fa-home" ]
 *  }
 * 
 * 
 */

export default (props) => {
    const { path } = props

    if( path && Array.isArray(path) ){

        const previousPages = path.slice( 0, path.length - 1 )
        const lastPage = path.pop()

        return (
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                {
                                    previousPages.map( (page, index) => <a href={ page.url } key={index} >
                                       { page.icon && <i className={ page.icon }></i> } { page.name }
                                    </a> )
                                }                                
                                <span> { lastPage.name } </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}