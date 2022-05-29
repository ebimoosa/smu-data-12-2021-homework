$(document).ready(function() {
    doWork();

    $('#selDataset').on('change', function() {
       doWork()
    })

});

//  Read in data and print to console
function doWork() {
    d3.json('static/data/samples.json').then(function(data) {
        console.log(data);
        subjectID(data);
        demoInfo(data);
        barchart(data);
        bubblechart(data);
    })
}

// Get test Subject ID drop down to function
function subjectID(data) {
    var subject = data.names;
    for (let i = 0; i < subject.length; i++) {
        let id = subject[i]
        let list = `<option>${id}</option>`;
        $('#selDataset').append(list);
    }
}

// Fill in Demographic Info
function demoInfo(data) {
    // get Subject ID selected in dropdown
    let id = $('#selDataset').val();
    
    // get data to line up with Subject ID
    let info = data.metadata.filter(x => x.id == id)[0];
    console.log(info);
    Object.entries(info).map(function(x) {
        let meta = `<p>${x[0]}: ${x[1]}</p>`;
        $('#metadata').append(meta);
    });
}

// Create plotly barchart
function barchart(data) {
    // get Subject ID selected in dropdown
    let id = $('#selDataset').val();

    // get data to line up with Subject ID
    let info = data.samples.filter(x => x.id == id)[0];

    // create barchart
    var trace1 = {
        type: 'bar',
        x: info.sample_values.slice(0, 10).reverse(),
        y: info.otu_ids.map(x => `OTU ${x}`).reverse(),
        text: info.otu_labels,
        orientation: 'h',
        marker: {
            color: 'red',
            opacity: .7
        }
    };
    
    var trace = [trace1];
    
    var layout = {
        title: {
            text:'Top 10 OTUs Present in Subject',
            font: {
            family: 'Courier New, monospace',
            size: 18
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
            title: {
            text: 'Frequency',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
            },
        },
        yaxis: {
            title: {
            text: 'OTU',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
            }
        }
    };
      
    Plotly.newPlot('bar', trace, layout);
}

// Create plotly bubble chart
function bubblechart(data) {
    // get Subject ID selected in dropdown
    let id = $('#selDataset').val()

    // get data to line up with Subject ID
    let info = data.samples.filter(x => x.id == id)[0];

    // create bubble chart
    var trace1 = {
        x: info.otu_ids,
        y: info.sample_values,
        text: info.otu_labels,
        mode: 'markers',
        marker: {
            color: info.otu_ids,
            colorscale: 'RdBu',
            opacity: [1, 0.8, 0.6, 0.4],
            size: info.sample_values
        }
    };
      
    var trace = [trace1];
      
    var layout = {
        title: {
            text:'Top OTU Frequency',
            font: {
            family: 'Courier New, monospace',
            size: 26
            },
            xref: 'paper',
            x: 0.05,
        },
        xaxis: {
            title: {
            text: 'OTU IDs',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
            },
        },
        yaxis: {
            title: {
            text: 'Frequency',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
            }
        }
    };;
    
    Plotly.newPlot('bubble', trace, layout);

};
