// Number of points in the Voronoi diagram
const numPoints = 300;

// Generate random points
const points = d3.range(numPoints).map(() => [Math.random() * window.innerWidth, Math.random() * window.innerHeight]);

// Create Voronoi diagram
const voronoi = d3.Delaunay.from(points).voronoi([0, 0, window.innerWidth, window.innerHeight]);

// Append Voronoi polygons to the background
const svg = d3.select("#voronoi-background")
  .append("svg")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight);

// Store Voronoi cells in a variable for later use
const cells = svg.selectAll("path")
  .data(voronoi.cellPolygons())
  .enter()
  .append("path")
  .attr("d", (d, i) => "M" + d.join("L") + "Z")
  .attr("fill", "none") // Remove the fill color for transparent polygons
  .attr("stroke", getRandomColor()) // Generate a random color for the stroke
  .attr("stroke-width", .5);

// Voronoi hover effect that follows the cursor
svg.on("mousemove", function () {
  const [x, y] = d3.mouse(this); // Get the cursor position relative to the SVG

  // Find the Voronoi cell that contains the cursor position
  const index = voronoi.find(x, y);

  // Apply the hover effect to the corresponding cell
  cells.attr("fill", (d, i) => (i === index) ? "#ffcc00" : "none");
});

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to update Voronoi background size based on window size
function updateVoronoiBackgroundSize() {
  d3.select("#voronoi-background svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);
}

// Update Voronoi background size on window resize
window.addEventListener("resize", updateVoronoiBackgroundSize);

// Initialize Voronoi background size
updateVoronoiBackgroundSize();

const mySwiper = new Swiper ('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed: 300,
 mousewheel: true,
 coverflowEffect: {
  rotate: 30,
  slideShadows: true
},
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
