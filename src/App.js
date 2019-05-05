import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import meme_cat from './404_cat.jpg';
import black from './black.jpg';
import supr_pika from './surp_pika.png';
import mock_template from './mock_template.jpg';
import './App.css';

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
  input: {
    marginLeft: 8,
    flex: 1,
    width: 200
  },
  paperroot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 415,
    align: 'center',
  },
  appbar: {

    width: 400,
  
  },
});

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      term: '',
      img: mock_template,
      backDrop: '',
      value: 0, 
    };
  }


  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (

      
        <div >
         <AppBar position="static" className="appbar">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            GetPoster
          </Typography>
        </Toolbar>
        </AppBar> 
        <div>
        <Paper className={classes.paperroot} elevation={1}>
        <InputBase className={classes.input} value={this.state.term} onChange={this.onChange} placeholder="Enter movie name" />
       {/* <TextField
      id="standard-name"
      label="Movie name"
      className={classes.textField}
      value={this.state.term}
      onChange={this.onChange}
      />  */}
        <Button variant="contained" color="primary" className={classes.button}  onClick={this.handleSubmit}>
      Get Poster 
  </Button>
      </Paper> 
      </div>


  <div className="image-border">
<img src={this.state.img}  alt={this.state.term} />
</div>
  

          {/* <BottomNavigation
        value={value}
        onChange={this.handleNaviChange}
        showLabels
        className={classes.naviroot}
      >
        <BottomNavigationAction label="Favourites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Downloads" icon={<DownloadIcon />} />
      </BottomNavigation> */}
      </div>

  

      


    );
  }

  handleNaviChange = (event, value) => {
    this.setState({ value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.term && this.state.term.trim() != ""){
    const api_key = '53848681c64461ef915affdd04ebb440';
    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${this.state.term}`;
    fetch(movieURL)
      .then(response => response.json())
      .then( data => this.fixNull(data))
      // .then(data => this.setState({img: 'https://image.tmdb.org/t/p/w500' + data.results[0].poster_path,
      //  backDrop: 'https://image.tmdb.org/t/p/w1280' + data.results[0].backdrop_path, }))
       
      .catch(e => console.log('error', e)); 
    }else{
      this.setState({img: supr_pika })
    }   
  }

  fixNull(data){
   if(data.results.length){
    this.setState({img: 'https://image.tmdb.org/t/p/w300' + data.results[0].poster_path,
       backDrop: black })
  }else{
      this.setState({img: meme_cat })    
      this.setState({backDrop: black }) 
  }
  }

  // componentDidUpdate() {
  //   document.body.style.backgroundImage = 'url(' + this.state.backDrop + ')';
  // }
  componentDidMount(){
    document.body.style.backgroundImage = 'url(' + black + ')';
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }
}
export default withStyles(styles)(App);
