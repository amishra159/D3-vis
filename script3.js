	                  
                                function updateFile()
								{								
	
  var a=["cg.1.tsv","cg.2.tsv","cg.3.tsv","cg.4.tsv","cg.5.tsv","cg.6.tsv","cg.7.tsv","cg.8.tsv","cg.9.tsv","cg.10.tsv","cg.11.tsv","cg.12.tsv"];
  
                             for(var i=0; i<a.length;i++)
							 {
	                                 var file=a[i];
	                       
	
	
	d3.tsv("Data/"+file, function(data) {    /* To get Data from external file we add cg.2.tsv and calls an 
	                                          function where we pass the data from the file*/
					
					
					var width=500;
					   var height=280;
					   
	        var svg = d3.select("#chart3").append("svg")
	
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(300,130)");
      var     radius = Math.min(width, height) /3;      /*calculating the radius for the pie Chart*/
  var textOffset=6; 
  
  


       var color = d3.scaleOrdinal(["#0d0887", "#6a00a8","#cb4679", "#e16462","#fca636", "#fcce25"]); /*Sets the range of Color we want in the Pie Chart*/
	 					
					  
		

        var pie = d3.pie()         /*Creates the Layout For the Pie Chart*/
		.value(function(d) {         
                return d.MPI;       /*The pie chart contains the value of the MPI from tsv file and create the layout*/
            });

        var path = d3.arc()                   /*Creates the Layout of an Arc*/
                     .outerRadius(radius)       /*Sets An Outer Radius Of the Arc*/
                     .innerRadius(0);           /*Sets an inner Radius of an Arc and it is assigned as 0 so that we can get an shape of an Pie Chart*/
 					 
					 
					 var outerArc = d3.arc()
	    .innerRadius(radius * 1.1)
	    .outerRadius(radius * 1.1);
		
		
		  svg.append("text")
        .attr("transform","translate(0,135)")
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(file);
				
         


				
            var arc = svg.selectAll(".arc")       /* selects all the Arc and creates an array  of Object*/
                       .data(pie(data))          /* the function pie(data) takes the data from the file and creates an object of that data as an Array*/
                       .enter().append("g")     /*If the data elements are more than the DOM elements we call the enter to update the data */
                       .attr("class", "arc");
          var text;
		   
            arc.append("path")                      /* Adds the Path for the arc*/
			
               .attr("d", path)                      /*adds the data to the path*/
			   .attr("fill", function(d,i) { return color(i); })  /*the path is filled with the color by the data being pass
			                                                        to the color function and each data correspinds to different color*/
		        
				 .on("mouseenter", function(d){
				     text =arc.append("text")
					   .attr("transform", outerArc.centroid(d))
                    .style("text-anchor", "middle")
                    .style("fill", "black")
				
                    .attr("class", "on")
                    .text(d.data.MPI);
					   })
				 .on("mouseout", function(d) {
                   text.remove();
        });

				 
		        
		       
			 
         var labels=arc.append("text")   		 /*Adds the Label in the Arc*/
				     .attr("transform", function(d){
        var pos = outerArc.centroid(d);
        pos[0] = radius * (midAngle(d) < Math.PI ? 1.2: -1.4);
        return "translate("+ pos +")"})
				.attr("text-anchor","middle")      /*The label will be marked to the center of the origin*/
				.attr("font-size","1.2em")            /*sets the font size of the Label*/
			 .attr("fill","black")  				 /* sets the color of the label*/	
			 .attr("font-family","times new roman")
			 .attr("dy",function(d){ if(d.data.Call==="Irecv") {return ".5em"}
			 
			 })
				
             .text(function(d,i) { return  d.data.Call + "(" + d.data.Site + ")" ;}); /*For adding the Text in the Pie Chart*/
			  
			   
			   
	var prev;
labels.each(function(d, i) {
  if(i > 0) {
    var thisbb = this.getBoundingClientRect(),
        prevbb = prev.getBoundingClientRect();
    // move if they overlap
    if(!(thisbb.right < prevbb.left || 
            thisbb.left > prevbb.right || 
            thisbb.bottom < prevbb.top || 
            thisbb.top > prevbb.bottom)) {
        var ctx = thisbb.left + (thisbb.right - thisbb.left)/2,
            cty = thisbb.top + (thisbb.bottom - thisbb.top)/2,
            cpx = prevbb.left + (prevbb.right - prevbb.left)/2,
            cpy = prevbb.top + (prevbb.bottom - prevbb.top)/2,
            off = Math.sqrt(Math.pow(ctx - cpx, 2) + Math.pow(cty - cpy, 2))/2;
        d3.select(this).attr("transform",
            "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) *
                                    (radius + textOffset + off) + "," +
                           Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                                    (radius + textOffset + off) + ")");
    }
  }
  prev = this;
});
			  



			
	        function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    var polyline = svg.selectAll("polyline")
      .data(pie(data), function(d) {
        return d.data.Call
      })
      .enter()
      .append("polyline")
      .attr("points", function(d) {
        var pos = outerArc.centroid(d);
            pos[0] = radius *0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            
        return [path.centroid(d), outerArc.centroid(d), pos];
      })
      .style("fill", "none")
      .style("stroke", "black")
	
      .style("stroke-width", "1px");

});		

								}
					
								}