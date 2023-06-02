d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let sampleNames = data.names;
    let sampleMetadata = data.metadata; 
    let samples = data.samples;
    let sampleNumber = 940
    let resultsArray = samples.filter(sampleObj => sampleObj.id == sampleNumber)

    let firstResult = resultsArray[0]

    let otu_labels = firstResult.otu_labels
    let otu_ids = firstResult.otu_ids; 
    let sample_values = firstResult.sample_values;

    let barData = [
        {
            x:sample_values.slice(0,10).reverse(),
            y:otu_ids.slice(0,10).reverse() ,
            text: otu_labels.slice(0,10),
            type: 'bar',
            orientation : 'h'
            
        }
    ]

    let barLayout = {
        title: "Bar Graph",
    }

    Plotly.newPlot("bar", barData, barLayout)

    var bubbleData = [{
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
        }
      }];
            
      var bubbleLayout = {
        title: 'Bubble Chart',
        xaxis: {title: "OTU IDs"},
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);

      var gaugeData = [
        {
        x: [0],
        y: [0],
          type: "scatter",
        },{
          values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
          title: { text: "Speed", font: { size: 24 } },
          delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 250], color: "cyan" },
              { range: [250, 400], color: "royalblue" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
      var gaugeLayout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', gaugeData, gaugeLayout);

})