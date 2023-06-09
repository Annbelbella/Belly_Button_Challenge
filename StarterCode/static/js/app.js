const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

d3.json(url).then(function(data) {
  
let dropdownMenu = d3.select("#selDataset");
// Extract the values for 'names' in the data
let names = data.names;
// Using 'forEach' method to loop through the 'names' array
names.forEach(function(name) {
  dropdownMenu.append("option")
          .text(name)
          .property("value", name);
});

let defaultID = names[0];

updateBarChart(defaultID);

function updateBarChart(id) {
  
  // Filter data to get 10 selected sample's OTUs and sort them in descending order
  let sample = data.samples.filter(function(s) { return s.id === id; })[0];
  let otu_ids = sample.otu_ids.slice(0, 10).reverse();
  let sample_values = sample.sample_values.slice(0, 10).reverse();
  let otu_labels = sample.otu_labels.slice(0, 10).reverse();
  
  // Create the trace for the horizontal bar chart
  let trace1 = {
    x: sample_values,
    y: otu_ids.map(id => `OTU ${id}`),
    text: otu_labels,
    type: "bar",
    orientation: "h"
  };

  
  // Define the layout for the chart
  let layout = {
    title: "Top 10 OTUs Found",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };
  
  // Plot the chart
  Plotly.newPlot("bar", [trace1], layout);
}

//Create a bubble chart that displays each sample
function updateBubbleChart(id) {
  
    // Filter the data to get selected sample's OTUs
    let sample = data.samples.filter(function(s) { return s.id === id; })[0];
    let otu_ids = sample.otu_ids;
    let sample_values = sample.sample_values;
    let otu_labels = sample.otu_labels;
    
    // Create the trace for the bubble chart
    let trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      type: 'bubble',
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colourscale: "Earth"
      }
    };
  
    
    // Define the layout for the chart
    let layout = {
      title: "Sample Bubble Chart",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" }
    };
    
    // Plot the chart
    Plotly.newPlot("bubble", [trace2], layout);
  }

d3.select("#selDataset").on("change", dropdownMenuChanged);

//sample metadata 
function updateMetadata(id) {

    // Filter the data to get the metadata for the selected sample
    let metadata = data.metadata.filter(function(sample) { return sample.id.toString() === id; })[0];
  
    let panelBody = d3.select("#sample-metadata");
    panelBody.html("");
  
    Object.entries(metadata).forEach(function([key, value]) {
      panelBody.append("p").text(`${key}: ${value}`);
    });
  }
  
updateMetadata(defaultID);


updateBubbleChart(defaultID);
  
  function dropdownMenuChanged() {
   let id = d3.select("#selDataset").property("value");
   updateBarChart(id);
   updateBubbleChart(id);
   updateMetadata(id);
 }
 
});
