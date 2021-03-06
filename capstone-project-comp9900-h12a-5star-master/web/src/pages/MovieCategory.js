import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header,Grid} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';

export default class RecentReleased extends Component {

    //Constructor called at the time of page load
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            feats: []
        };
    }

    // function called when the components are loaded onto the page.It gets executed right after the constructor.
    // Performs an operation to pull the recomendations of the for the user from the database.
    componentDidMount() {

        console.log(this.props.match.params.movieId)
        console.log(window.sessionStorage.getItem('username'))
        var feat = this.props.match.params.features;
        this.state.feats = feat.split(',');

        
        console.log(this.state.feats)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.props.match.params.movieId, user: window.sessionStorage.getItem('username') , selection:this.props.match.params.features  })
            
        };

        fetch("http://127.0.0.1:8000/api/moviedetail", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result,

                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            
    }

    render() {

        var columnsCategory = null
        var category = null

        if (this.props.match.params.category === "RecommendMore"){
            if (this.state.items.recomendations) {
                console.log("recommending")
                category = "More Like This"
                columnsCategory = _.times(2, (i) => (
                    <Grid.Row key={i}>{
                        _.times(3, (j) => (
                            <Grid.Column>
                                <MovieTile 
                                    title={this.state.items.recomendations[i*4+j].movieTitle} 
                                    poster={this.state.items.recomendations[i*4+j].poster} 
                                    release={this.state.items.recomendations[i*4+j].releaseDate} 
                                    rating={this.state.items.recomendations[i*4+j].rating} 
                                    description={this.state.items.recomendations[i*4+j].description} 
                                    movieId={this.state.items.recomendations[i*4+j].movieID} 
                                />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                ))
            }
        }
        
        return (
            <>
                <Container style={{ margin: 20 }}>
                    <Header as='h1'>{category}</Header>
                    <Grid columns='equal'>{columnsCategory}</Grid>
                </Container>
            </>
        )
    }

}