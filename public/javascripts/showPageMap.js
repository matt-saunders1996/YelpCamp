
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mattjsaunds/ckl0vpbxy0xgh17qo8ukw749r',
  center: campground.geometry.coordinates,
  zoom: 6
});

map.addControl(new mapboxgl.NavigationControl());


const marker = new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset:25})
    .setHTML(
      `<h4>${campground.title}</h4><p>${campground.location}</p>`
    )
    )
  .addTo(map);

  // campground.geometry.coordinates

