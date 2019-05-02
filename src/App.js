import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  naviroot: {
    flexGrow: 1,
  },
});

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      term: '',
      img: '',
      backDrop: '',
      value: 0, 
    };
  }


  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="bottom">
        <Toolbar>
          <IconButton className={classes.menuButton} color="RED" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            GetPoster
          </Typography>
        </Toolbar>
        </AppBar>
        <div>
      <TextField
      id="standard-name"
      label="Movie name"
      className={classes.textField}
      value={this.state.term}
      onChange={this.onChange}
  /> 
  </div>
  <div>
  <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
      Get Poster
  </Button>
  <div id="image-div">
<img src={this.state.img}  alt={this.state.term} />
</div>
  </div>
        <BottomNavigation
        value={value}
        onChange={this.handleNaviChange}
        showLabels
        className={classes.naviroot}
      >
        <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Downloads" icon={<DownloadIcon />} />
      </BottomNavigation>
</div>

    );
  }

  // hideImage = () => {
  //   document.getElementById("image-div").style = 'display: none';
  // }

  handleNaviChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const api_key = '53848681c64461ef915affdd04ebb440';
    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${this.state.term}`;
    fetch(movieURL)
      .then(response => response.json())
      .then(data => this.setState({img: 'https://image.tmdb.org/t/p/w500' + data.results[0].poster_path,
       backDrop: 'https://image.tmdb.org/t/p/w1280' + data.results[0].poster_path }))
      .catch(e => console.log('error', e));    
  }

  // componentDidUpdate() {
  //   document.body.style.backgroundImage = 'url(' + this.state.backDrop + ')';
  // }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }
}
export default withStyles(styles)(App);
