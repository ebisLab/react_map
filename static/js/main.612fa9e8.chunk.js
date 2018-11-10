(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,n,t){e.exports=t(66)},26:function(e,n,t){},28:function(e,n,t){},66:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(10),i=t.n(r),c=(t(26),t(3)),s=t(4),l=t(6),u=t(5),m=t(7),p=(t(28),t(18)),d=t.n(p),h=t(19),v=function(e){var n=e.venue.venue.name;return o.a.createElement("ol",{className:"venueList","aria-label":"Ordered List of Venues"},o.a.createElement("li",{className:"venueList","aria-label":e.venue.name,tabIndex:"0",role:"link",onClick:function(){!function(){var n=e.venue;window.google.maps.event.trigger(n.marker,"click")}()}},n))},g=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(l.a)(this,Object(u.a)(n).call(this,e))).state={hasError:!1,errorInfo:null},t}return Object(m.a)(n,e),Object(s.a)(n,[{key:"componentDidCatch",value:function(e,n){this.setState({hasError:!0,errorInfo:n})}},{key:"render",value:function(){return this.state.hasError?o.a.createElement("h1",null,"Google Maps API has failed. Please check your connection and try again."):this.props.children}}]),n}(a.Component),f=t(20),w=t.n(f);window.gm_authFailure=function(){alert("Please check your Google API key")};var k=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(l.a)(this,Object(u.a)(n).call(this,e))).state={venues:[],query:""},t.renderMap=function(){try{!function(e){var n=window.document.getElementsByTagName("script")[0],t=window.document.createElement("script");t.src=e,t.async=!0,t.defer=!0,n.parentNode.insertBefore(t,n)}("https://maps.googleapis.com/maps/api/js?client=gme-nianticinc&callback=initMap"),window.initMap=t.initMap}catch(e){console.error(e),alert("An error occured. Please check your google settings. ")}},t.getVenues=function(){d.a.get("https://api.foursquare.com/v2/venues/explore?"+new URLSearchParams({client_id:"02ONRBOTCO3H1QD0Y3U3ZL2V2BP1PYHPNXFQEXRAJOOIJHB1",client_secret:"IP01UHEG5AKED10WFOJYIBXWN34SMOWIPAM2W3A421KTUAFN",query:"hotel",near:"Sydney",v:"20181007"})).then(function(e){t.setState({venues:e.data.response.groups[0].items},t.renderMap())}).catch(function(e){alert("Some error occurred while retrieving the data from Foursquare. Please check console for details")})},t.initMap=function(){var e=[];t.setState({handleItemClick:t.state.venues});var n=new window.google.maps.Size(26,43),a={url:"https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",scaledSize:n},o={url:"https://www.google.com/mapfiles/marker_green.png"},r=new window.google.maps.Map(document.getElementById("map"),{center:{lat:-33.783,lng:151.177},zoom:11});t.map=r;var i=new window.google.maps.InfoWindow({});t.state.venues.map(function(t){var c=t.venue.location.address?t.venue.location.address:"",s="<h3>".concat(t.venue.name," </h3>\n          <p>").concat(c,"</p>\n            \n            <p>").concat(t.venue.location.city," ").concat(t.venue.location.state," ").concat(t.venue.location.postalCode,"</p>\n            <p><strong>\n        ").concat('<a href="https://foursquare.com/v/'+t.venue.id+'" target="_blank">Learn More...</a>',"\n       </strong> </p>");return t.marker=new window.google.maps.Marker({position:{lat:t.venue.location.lat,lng:t.venue.location.lng},map:r,title:t.venue.name,id:t.venue.id,scaledSize:n,animation:window.google.maps.Animation.DROP}),t.marker.isOpen=!1,e.push(t),t.marker.addListener("click",function(){i.setContent(s),console.log(t.marker),e.forEach(function(e){console.log(e),e.isOpen=!1,e.marker.setIcon(a)}),t.marker.isOpen=!0,t.marker.setIcon(o),t.marker.setZIndex(9999),i.open(r,t.marker)}),t.marker}),window.google.maps.event.addListener(i,"closeclick",function(){t.state.venues.forEach(function(e){e.isOpen=!1,e.marker.setIcon(a)})}),window.google.maps.event.addListener(i,"click",function(){t.state.venues.forEach(function(e){i.close(),e.isOpen=!1,e.marker.setIcon(a)})})},t.map=null,t}return Object(m.a)(n,e),Object(s.a)(n,[{key:"showSettings",value:function(e){e.preventDefault()}},{key:"componentDidMount",value:function(){this.getVenues()}},{key:"handleStateChange",value:function(e){this.setState({menuOpen:e.isOpen})}},{key:"updateQuery",value:function(e){this.setState({query:e.trim()})}},{key:"filterVenues",value:function(e){this.myVenue.marker.forEach(function(n){!0===n.name.toLowerCase().includes(e.toLowerCase())?n.setVisible(!0):n.setVisible(!1)}),this.setState({query:e})}},{key:"render",value:function(){var e,n=this,t=this.state,a=t.venues,r=t.query;if(r){var i=new RegExp(w()(r),"i");e=a.filter(function(e){var t=i.test(e.venue.name);return console.log(e),t?e.marker.setMap(n.map):e.marker.setMap(null),t})}else e=a;return o.a.createElement("div",{id:"App"},o.a.createElement(g,null,o.a.createElement(h.slide,{tabIndex:"0"},o.a.createElement("input",{type:"search",id:"search",placeholder:"filter Venues",onChange:function(e){return n.updateQuery(e.target.value)},"aria-label":"Search Venues",tabIndex:"0",role:"search"}),e.map(function(e,n){return o.a.createElement(v,{className:"bm-item",key:n,venue:e,"aria-label":e.venue.name})}))),o.a.createElement("div",{id:"map"}))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.612fa9e8.chunk.js.map