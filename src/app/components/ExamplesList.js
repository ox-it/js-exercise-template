import React from 'react';
import { connect } from 'react-redux';
import { selectExampleEntities } from '../store/reducers';

class ExamplesList extends React.Component {
    componentDidMount() {
        this.fetchExamples();
    }
    
    fetchExamples() {
        fetch("/api/example_entity/all")
            .then( (response) => {
                return response.json();
            }).then((json) => {
                this.props.onLoadedData(json)
            }).catch( (err) => {
                console.warn("Error fetching examples data", err);
            });
    };
    
    render() {
        
        return (
            <ul>
                {this.props.examples.map( (ex, i) => 
                    <li key={'example-'+i}>
                        {ex.title}
                    </li>
                )}
            </ul>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        // this is an example on how to use a selector function
        examples: selectExampleEntities(state),
    }
}

const mapDispatchToprops = (dispatch, ownProps) => ({
    onLoadedData: (data) => {
        dispatch({
            type: 'LOAD_EXAMPLE_ENTITIES',
            entities: data
        })
    },
    onAddExample: () => {
        dispatch({
            type: 'LOAD_EXAMPLE_ENTITIES',
        })
    }
})

export default connect(mapStateToProps, mapDispatchToprops)(ExamplesList)