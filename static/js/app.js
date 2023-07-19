function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (data =>{
            console.log(data)

            var ids = data.samples[0].otu_ids;
            var samples = data.samples[0].sample_values;
            var label =  data.samples[0].otu_labels.slice(0,10);

            var sampleValues =  data.samples[0].sample_values.slice(0,10).reverse();
            var labels =  data.samples[0].otu_labels.slice(0,10);
     
            var OTU_top = data.samples[0].otu_ids.slice(0, 10).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);

            var labels =  data.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            var data = [trace];
    
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
            // bar plot
            Plotly.newPlot("bar", data, layout);
            // bubble chart
            var trace1 = {
                x: ids,
                y: samples,
                mode: "markers",
                marker: {
                    size: samples,
                    color: ids
                },
                text: label
    
            };
    
            //layout for the bubble plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
           
            var data1 = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        })   
        };  

    function getDemoInfo(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
    
            console.log(metadata)
    
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");
            
           demographicInfo.html("");
    
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }

    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    function init() {
        var dropdown = d3.select("#selDataset");
    
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();