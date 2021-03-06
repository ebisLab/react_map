import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//import SideBar from './SideBar';
import { slide as Menu } from 'react-burger-menu';
import ListItem from './ListItem';
import ErrorBoundary from './ErrorBoundary';
import escapeRegExp from 'escape-string-regexp'

window.gm_authFailure = ()=>{alert("Please check your Google API key")}

class App extends Component {
  constructor(props){
    super(props);
    this.map=null;
  }

  state = {
    venues: [],
    query: ''
  }

  showSettings (event) {
    event.preventDefault();
  }

  //Render Map 
  //Life cycle event
  componentDidMount() {
    this.getVenues()
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  updateQuery(query){
    this.setState({query: query.trim() });
  }

  filterVenues(query) {
    this.myVenue.marker.forEach(marker =>{
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ? 
      marker.setVisible(true) :
      marker.setVisible(false);
      //marker.setState({venues})
    });
    this.setState({query});

  }

  //**renderMap = loadMap

  renderMap = () => {
    try {
    loadScript("https://maps.googleapis.com/maps/api/js?client=gme-nianticinc&callback=initMap")
    window.initMap = this.initMap
  }
  catch(err) {
console.error(err)
    alert('An error occured. Please check your google settings. ')
  }
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const keys = {
      client_id: "02ONRBOTCO3H1QD0Y3U3ZL2V2BP1PYHPNXFQEXRAJOOIJHB1",
      client_secret: "IP01UHEG5AKED10WFOJYIBXWN34SMOWIPAM2W3A421KTUAFN",
      query: "tech startup",
      near: "Indianapolis", 
      v: "20181110"
    }

    axios.get(endPoint + new URLSearchParams(keys))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap() )//callback function
    })
    .catch(error =>{
      alert('Some error occurred while retrieving the data from Foursquare. Please check console for details')
    })
  }

//handleItemClick=venues;

  initMap = () => {

    const markersArr=[];
    this.setState({handleItemClick: this.state.venues});/**/
    const scaledSize = new window.google.maps.Size(26, 43)
     const redMarker = {url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png',
            scaledSize
          }
          let greenMarker = {
            url: 'https://www.google.com/mapfiles/marker_green.png',
            //scaledSize
          }
    //Map Created
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.768, lng: -86.158},
          zoom: 11
        })
        this.map = map;


        //Create an InfoWindow
          var infowindow = new window.google.maps.InfoWindow({
  });

        //loop over our venues
        //dynamic markers
        this.state.venues.map(myVenue => {
         const address = myVenue.venue.location.address ? 
         myVenue.venue.location.address : ''

          var contentString = `<h3>${myVenue.venue.name} </h3>
          <p>${address}</p>
            
            <p>${myVenue.venue.location.city} ${myVenue.venue.location.state} ${myVenue.venue.location.postalCode}</p>
            <p><strong>
        ${'<a href="https://foursquare.com/v/' +
          myVenue.venue.id +
          '" target="_blank">Learn More...</a>'}
       </strong> </p>`
            //<Img src=linkvar/>`

          //Create markers
           myVenue.marker = new window.google.maps.Marker({
    position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
    map: map, 
    title: myVenue.venue.name,
    id: myVenue.venue.id,
    scaledSize,//marker size matches default size

    animation: window.google.maps.Animation.DROP
  });
           myVenue.marker.isOpen = false;
           markersArr.push(myVenue);

          //Link marker and infowindow together
          myVenue.marker.addListener('click', function() {
            //Change the content
            infowindow.setContent(contentString);
            console.log(myVenue.marker);

            markersArr.forEach(venue => {
              console.log(venue);
              venue.isOpen = false;
              venue.marker.setIcon(redMarker);
            });

              //Markers switch color when another marker is selected. 
              myVenue.marker.isOpen = true
              //console.log(myVenue.marker.isOpen)
              myVenue.marker.setIcon(greenMarker);
              myVenue.marker.setZIndex(window.google.maps.Marker.MAX_ZINDEX + 1);
              this.map.setCenter(myVenue.marker.position);

            //open an infowindow
            
            infowindow.open(map, myVenue.marker);
          });

          return myVenue.marker;
       });

      window.google.maps.event.addListener(infowindow, "closeclick", ()=>
        {
          this.state.venues.forEach(venue => {
            venue.isOpen = false;
            venue.marker.setIcon(redMarker);
          });
        });

       window.google.maps.event.addListener(infowindow, "click", ()=>
        {
          this.state.venues.forEach(venue => {
            infowindow.close();
            venue.isOpen = false;
            venue.marker.setIcon(redMarker);
          });
        });     
      };

//NOTES*****
//There seems to be undefined in one of the venues' address

  render() {

    const { venues, query } = this.state
    //console.log(venues)

    let filteredVenues
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredVenues = venues.filter((venue)=> {
        const isMatch = match.test(venue.venue.name);
        console.log(venue);
        if (isMatch) {
          venue.marker.setMap(this.map);
        } else {
          venue.marker.setMap(null);
        }
        return isMatch;
      
        //match.test(venue.venue.name))
      //}
    });} else {
      filteredVenues = venues
    }

    return (
      

      
 
  
    <div id="App">
    
    <ErrorBoundary>
<Menu tabIndex="0">
<input type={"search"} id={"search"} placeholder={"filter Venues"} 
onChange={(event)=> this.updateQuery(event.target.value)} 
aria-label = "Search Venues"  tabIndex = "0" role="search"/>
              
                {filteredVenues.map((venue, index) => (
                  <ListItem 
                    className="bm-item"
                    key={index}
                    venue={venue}
                    aria-label = {venue.venue.name}
                    
                    />
                    
                ))}
                </Menu>
                </ErrorBoundary>
      <div id="map"></div>
      
      </div>
      
      
  


    );
  }
}




function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}

export default App;