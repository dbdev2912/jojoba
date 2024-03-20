/**
 *  @props
 *  - criteria: {
 *      name: <String>
 *      options: <Option>[]
 *  }
 * 
 *  - cpnID: <String> <Unique>
 *  - parentId: <String>
 * 
 * 
 * 
 * @note
 *  Option: {
 *      label: <String>,
 *      url: <String>,
 *  }
 * 
 * 
 */

export default ( props ) => {    
    const { name, options } = props.criteria

    

    const { cpnID, parentId } = props
    

    return (
        <div class="card">
            <div class="card-heading">
                <a data-toggle="collapse" data-target={`#${cpnID}`}>{ name }</a>
            </div>
            <div id={cpnID} class="collapse" data-parent={`#${ parentId }`}>
                <div class="card-body">
                    <ul>
                        {
                            options.map( option => <li><a href={ option.url }>{ option.label }</a></li> )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}