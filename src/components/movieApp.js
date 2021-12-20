import React, {Component} from 'react';

class MovieApp extends Component {
    state = {
        currentid: 0,
        //searchTerm: "",
        addTitle: "",
        addYear: 0,
        addPoster: "",
        addDescription: "",
        currentMovie: null,
        movieList: [],
    };

    /*
    updateSearch = (e) => {
        e.preventDefault();
        this.setState({searchTerm: e.target.value})
    }

    findMovies = () => {
        console.log(this.state.searchTerm);
    }
    */

    addTitle = (e) => {
        e.preventDefault();
        this.setState({addTitle: e.target.value});
    }

    addYear = (e) => {
        e.preventDefault();
        this.setState({addYear: e.target.value});
    }

    addPoster = (e) => {
        e.preventDefault();
        this.setState({addPoster: e.target.value});
    }

    addDescription = (e) => {
        e.preventDefault();
        this.setState({addDescription: e.target.value});
    }

    onExit = () => {
        console.log(this.state.currentMovie)
        this.setState({currentMovie: null});
    }

    onDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }
        fetch(`https://jmdb-391740.herokuapp.com/${this.state.currentMovie.id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
        this.onExit()
    }

    fetchMovies = () => {
        fetch('https://jmdb-391740.herokuapp.com/movies/',{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({movieList: response})
        });
    }

    componentDidMount() {
        this.fetchMovies();
    }

    setMovie = (e) => {
        this.setState({currentMovie: this.state.movieList[Number(e.target.id)]})
    }

    showMovie = () => {
        if(this.state.currentMovie){
            return (
                <div className="card">
                    <div class="movie-title">{this.state.currentMovie && this.state.currentMovie.title} {this.state.currentMovie && this.state.currentMovie.year}</div>
                    <div className="card-content">
                        <img class="movie-poster" src={this.state.currentMovie && this.state.currentMovie.poster}/>
                        <p>
                            <hr/>
                            <h4>Description: </h4>
                            <div className='movie-description'>
                                {this.state.currentMovie && this.state.currentMovie.description}
                            </div>
                        </p>
                        <div className='movie-buttons'>
                            <button onClick={this.onExit}>Exit</button> <button onClick={this.onDelete}>Delete</button><br/>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="card">
                    <div className="card-content">
                        <div>No movie selected</div>
                    </div>
                </div>
            )
        }
    }

    getMovies = () => {
        if(this.state.movieList.length < 0){
            return(
                <div>No movies found</div>
            );
        }
        else{
            return(
                this.state.movieList.map((movie,i) => {
                    return(
                        <div>
                            <a onClick={this.setMovie} id={i} href="#">{movie.title} ({movie.year})</a>
                        </div>
                    )
                })
            );
        }
    }

    addMovie = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: this.state.addTitle,
                year: this.state.addYear,
                poster: this.state.addPoster,
                description: this.state.addDescription,
            })
        }
        fetch('https://jmdb-391740.herokuapp.com', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
    
    render() {
        return (
            <div className="App-body">
                <div className="leftside">
                <div>
                    {/*
                    <form className="card">
                    <div className='card-title'>
                        Search Movie:
                    </div>
                    <div className='card-content'>
                        <div className='form-divider'>
                        <label>
                            Title: <input type="text" onChange={this.updateSearch}/>
                        </label>
                        <button className='form-button' onClick={this.findMovies}>
                            Search
                        </button>
                        </div>
                    </div>
                    </form>
                    */}
                    <form className="card">
                        <div className='card-title'>
                            Add Movie:
                        </div>
                        <div className='card-content'>
                            <div className='form-divider'>
                            <div>
                                <label>
                                Title: <input type="text" onChange={this.addTitle}/>
                                </label><br/>
                                <label>
                                Year: <input type="number" onChange={this.addYear}/>
                                </label>
                            </div>
                            <div className='empty'></div>
                            <div>
                                <label>
                                Poster URL: <input type="text" onChange={this.addPoster}/>
                                </label><br/>
                                <label>
                                Description: <input type="text" onChange={this.addDescription}/>
                                </label>
                            </div>
                            <div className='form-button'>
                                <br/>
                                <button onClick={this.addMovie}>
                                Add
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
                <div className='card'>
                    <div className='card-title'>
                        Movies:
                    </div>
                    <div className='card-content'>    
                        {this.getMovies()}
                    </div>
                </div>
                </div>
                <div className="rightside">
                    {this.showMovie()}
                </div>
            </div>
        );
    }
}

export default MovieApp;