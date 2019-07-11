window.onload = function(){
    fileupload();
    var newARR
    var fileExist = 0   
       $("#upload").click(fileupload)
    function fileupload(){
        var uploadDiv = document.createElement("div")
        uploadDiv.className = "uploadFile"
        uploadDiv.innerHTML = "<input type= 'file' id= 'upFile' accept= '.json'>"
        $("#content").empty()
        $("#content").append(uploadDiv)
        console.log("divCreated")
        
        //var fr = new FileReader();
    
        document.getElementById('upFile').onchange = function() {
	       var input = document.getElementById('upFile');
            
            fileExist = 1
            file= input.files[0];
           
            var fr = new FileReader();
            fr.onload= receivedText;
            fr.readAsText(file);
            alert("File Uploaded");
            function receivedText(e){
                let lines= e.target.result;
                newARR=JSON.parse(lines);
                console.log(newARR);
                console.log(Object.values(newARR.burger_by_species)[1])
                
                console.log(Object.values(newARR.sales)[1]);
                console.log(Object.values(newARR.sales).length)
                console.log("what is this"+Object.keys(newARR.burger_sales)[0])

                console.log( Object.values(newARR.burger_by_species)[0])
                
                console.log( Object.values(newARR.burger_by_species)[0]['leatherback turtle'])
                
            }
            
            
           
            
   
        } 
    }
    

    document.getElementById("view").onclick = function(){
        if(fileExist == 1){
            var viewData = document.createElement("div")
            var table = document.createElement("table")
            viewData.className = "dataView"
            table.className = "viewTable"
            viewData.append(table)
            
            table.style.width = '100%';
            table.setAttribute('border', '1');
            
            var thd = table.createTHead()
            var tr1 = thd.insertRow(-1)
            var headers = ['Date', 'Burger', 'Species']
            for(var i = 0; i < 3; i++){
                var th = document.createElement("th")
                th.innerHTML = headers[i]
                tr1.appendChild(th)
            }
            
            var tbdy = table.createTBody()
            for(var i = 0; i < Object.values(newARR.sales).length; i++){
                var tr = tbdy.insertRow()
                tr.insertCell().appendChild(document.createTextNode(Object.values(newARR.sales)[i].datetime))
                tr.insertCell().appendChild(document.createTextNode(Object.values(newARR.sales)[i].burger))
                tr.insertCell().appendChild(document.createTextNode(Object.values(newARR.sales)[i].species))
            }
            
            $("#content").empty()
            $("#content").append(viewData)
            console.log("divCreated")
        }
        else{
            alert("No File Uploaded")
        }
        
    }
    
    
    document.getElementById("search").onclick = function(){
        if(fileExist == 0)
            alert("No File Uploaded")
        else
            alert("Please select date before searching")
    }
    
    document.getElementById("inDate").onchange = function(){
        
        document.getElementById("search").onclick = function(){
            if(fileExist == 1){
                var viewData = document.createElement("div")
                var table = document.createElement("table")
                viewData.className = "dataView"
                table.className = "viewTable"
                viewData.append(table)
                
                table.style.width = '100%';
                table.setAttribute('border', '1');
                
                var thd = table.createTHead()
                var tr1 = thd.insertRow(-1)
                var headers = ['Date', 'Burger', 'Species']
                for(var i = 0; i < 3; i++){
                    var th = document.createElement("th")
                    th.innerHTML = headers[i]
                    tr1.appendChild(th)
                }
                
                var tbdy = table.createTBody()
                for(var i = 0; i < Object.values(newARR.sales).length; i++){
                    if(document.getElementById("inDate").value == Object.values(newARR.sales)[i].datetime.split(' ')[0]){
                        console.log(Object.values(newARR.sales)[i].datetime)
                        var tr = tbdy.insertRow()
                        tr.insertCell().appendChild(document.createTextNode(Object.values(newARR.sales)[i].datetime))
                        tr.insertCell().appendChild(document.createTextNode(Object.values(newARR.sales)[i].burger))
                        tr.insertCell().appendChild(document.createTextNode(Object.values(newARR.sales)[i].species))
                    }
                }   
                    
                $("#content").empty()
                $("#content").append(viewData)
                console.log("divCreated")
            }
            else{
                alert("No File Uploaded")
            }
        }
    }
    
    
    
    
    ////
    
    
     document.getElementById("Charts").onclick=function(){
         if(fileExist == 1){
             $("#content").empty()
             $("#content").append('<button type="button" id="AllCharts" class= "buttons"> All Charts</button>'); 
             console.log("divCreated")
        
             $("#content").append('<button type="button" id="Bsales" class= "buttons"> Burger Sales</button>'); 
             console.log("divCreated")
        
             $("#content").append('<button type="button" id="Ssales" class= "buttons"> Species sales</button>'); 
             console.log("divCreated")
        
             $("#content").append('<button type="button" id="BbyS" class= "buttons"> Burger by species </button>'); 
             console.log("divCreated")
        
        
     
     
     
     
     
            document.getElementById("Bsales").onclick=function(){
                console.log("clicked")
            
                google.charts.load('current', {'packages':['corechart']});

                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var viewCharts= document.createElement("div")
                    
                    viewCharts.className="chartsDiv"
                    var data = google.visualization.arrayToDataTable([
                    ["Burger", "Sales",{role:'style'} ],
     
            [Object.keys(newARR.burger_sales)[0] , Object.values(newARR.burger_sales)[0], 'orange'],
            [Object.keys(newARR.burger_sales)[1] , Object.values(newARR.burger_sales)[1], 'red'],
            [Object.keys(newARR.burger_sales)[2] , Object.values(newARR.burger_sales)[2], 'maroon']
                                                     
      ]);
           var view = new google.visualization.DataView(data);
         view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);
       
          var options = {'title':'Burger sales',
                       'width':700,
                       'height':700, bar: {groupWidth: "50%"},
        legend: { position: "none" },
                      };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(viewCharts);
        chart.draw(view, options);
             
          $("#content").empty()
  
          $("#content").append(viewCharts)
         // console.log(Object.values(newARR.burger_by_species)[1])
      
      
   
       
          console.log(Object.values(newARR.burger_by_species)[1])
         
     }
        }
     
     
     
     
         document.getElementById("Ssales").onclick=function(){
             google.charts.load('current', {'packages':['corechart']});

             google.charts.setOnLoadCallback(draw2ndChart);
          
             function draw2ndChart(){
     
                    
                 var viewCharts= document.createElement("div")
    
  
                 viewCharts.className="chartsDiv"

        
                 var data = google.visualization.arrayToDataTable([
     
                     ["Species", "Sales",{role:'style'} ],
     
           [Object.keys(newARR.species_sales)[0] , Object.values(newARR.species_sales)[0], 'orange'],
           [Object.keys(newARR.species_sales)[1] , Object.values(newARR.species_sales)[1], 'blue'],
           [Object.keys(newARR.species_sales)[2] , Object.values(newARR.species_sales)[2], 'yellow'],
           [Object.keys(newARR.species_sales)[3] , Object.values(newARR.species_sales)[3], 'red'],
           [Object.keys(newARR.species_sales)[4] , Object.values(newARR.species_sales)[4], 'maroon'],
           [Object.keys(newARR.species_sales)[5] , Object.values(newARR.species_sales)[5], 'cyan'],
           [Object.keys(newARR.species_sales)[6] , Object.values(newARR.species_sales)[6], 'green'],
        
                                                     
      ]);
           var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);
       
        var options = {'title':'Species Sale',
                       'width':700,
                       'height':700, bar: {groupWidth: "50%"},
        legend: { position: "none" },
                      };

    
        var chart = new google.visualization.ColumnChart(viewCharts);
        chart.draw(view, options);
                   $("#content").empty()
    
          $("#content").append(viewCharts)
 
        }
         }
         
         
         
         
         
         
          document.getElementById("BbyS").onclick=function(){
          google.charts.load('current', {'packages':['corechart']});


     
           google.charts.setOnLoadCallback(draw3rdChart);
              function draw3rdChart(){
              
                    
                  var viewCharts= document.createElement("div")
  
                  viewCharts.className="chartsDiv"

                  
                  
                  var data = google.visualization.arrayToDataTable([
                      
                      
          ['Burger',  "leatherback turtle", "salmon",  "seahorse","coral","giant clam","gray whale", "sea lion"],
          [Object.keys(newARR.burger_by_species)[0] , Object.values(newARR.burger_by_species)[0]['leatherback turtle'], Object.values(newARR.burger_by_species)[0]['salmon'], Object.values(newARR.burger_by_species)[0]['seahorse'], Object.values(newARR.burger_by_species)[0]['coral'], Object.values(newARR.burger_by_species)[0]['giant clam'],Object.values(newARR.burger_by_species)[0]['gray whale'], Object.values(newARR.burger_by_species)[0]['sea lion']],
            
       
          [Object.keys(newARR.burger_by_species)[1] , Object.values(newARR.burger_by_species)[1]['leatherback turtle'], Object.values(newARR.burger_by_species)[1]['salmon'], Object.values(newARR.burger_by_species)[1]['seahorse'], Object.values(newARR.burger_by_species)[1]['coral'], Object.values(newARR.burger_by_species)[1]['giant clam'],Object.values(newARR.burger_by_species)[1]['gray whale'], Object.values(newARR.burger_by_species)[1]['sea lion']],
                                                       
          [Object.keys(newARR.burger_by_species)[2] , Object.values(newARR.burger_by_species)[2]['leatherback turtle'], Object.values(newARR.burger_by_species)[2]['salmon'], Object.values(newARR.burger_by_species)[2]['seahorse'], Object.values(newARR.burger_by_species)[2]['coral'], Object.values(newARR.burger_by_species)[2]['giant clam'],Object.values(newARR.burger_by_species)[2]['gray whale'], Object.values(newARR.burger_by_species)[2]['sea lion']]
        ]);
             

                  var options = {
          
                      title: 'Burger by Species',
              
                            'width':1000,
                            'height':700, bar: {groupWidth: "50%"},
          
                  };

     
       
        var chart = new google.visualization.ColumnChart(viewCharts);
        chart.draw(data, options);
                   $("#content").empty()
    
          $("#content").append(viewCharts)
 
        }
    }
          document.getElementById("AllCharts").onclick=function(){
                

         console.log("clicked")
            
        

      google.charts.load('current', {'packages':['corechart']});


      google.charts.setOnLoadCallback(drawChart);

     
      function drawChart() {
               
            var viewCharts= document.createElement("div")
            viewCharts.className="AllchartsDiv"

        
          var data = google.visualization.arrayToDataTable([
     
              ["Burger", "Sales",{role:'style'} ],
     
           [Object.keys(newARR.burger_sales)[0] , Object.values(newARR.burger_sales)[0], 'orange'],
           [Object.keys(newARR.burger_sales)[1] , Object.values(newARR.burger_sales)[1], 'red'],
           [Object.keys(newARR.burger_sales)[2] , Object.values(newARR.burger_sales)[2], 'maroon']
                                                     
      ]);
          
          
           var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);
       
        var options = {'title':'Burger sales',
                       'width':700,
                       'height':700, bar: {groupWidth: "50%"},
        legend: { position: "none" },
                      };

     
        var chart = new google.visualization.ColumnChart(viewCharts);
        chart.draw(view, options);
             
          $("#content").empty()

          $("#content").append(viewCharts)
         // console.log(Object.values(newARR.burger_by_species)[1])
      
      
   
       
          console.log(Object.values(newARR.burger_by_species)[1])
         
     }
        
     
     
     
     
         
            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(draw2ndChart);
          
             function draw2ndChart(){
     
                    
                  var viewCharts= document.createElement("div")
    
  
                  viewCharts.className="AllchartsDiv"

        
        var data = google.visualization.arrayToDataTable([
     
            ["Species", "Sales",{role:'style'} ],
     
           [Object.keys(newARR.species_sales)[0] , Object.values(newARR.species_sales)[0], 'orange'],
           [Object.keys(newARR.species_sales)[1] , Object.values(newARR.species_sales)[1], 'blue'],
           [Object.keys(newARR.species_sales)[2] , Object.values(newARR.species_sales)[2], 'yellow'],
           [Object.keys(newARR.species_sales)[3] , Object.values(newARR.species_sales)[3], 'red'],
           [Object.keys(newARR.species_sales)[4] , Object.values(newARR.species_sales)[4], 'maroon'],
           [Object.keys(newARR.species_sales)[5] , Object.values(newARR.species_sales)[5], 'cyan'],
           [Object.keys(newARR.species_sales)[6] , Object.values(newARR.species_sales)[6], 'green'],
        
                                                     
      ]);
           var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);
       
        var options = {'title':'Species Sale',
                       'width':700,
                       'height':700, bar: {groupWidth: "50%"},
        legend: { position: "none" },
                      };

        
        var chart = new google.visualization.ColumnChart(viewCharts);
        chart.draw(view, options);
                

      
          $("#content").append(viewCharts)
 
        }
         
         
         
        google.charts.load('current', {'packages':['corechart']});


     
           google.charts.setOnLoadCallback(draw3rdChart);
        function draw3rdChart(){
              
                    
        var viewCharts= document.createElement("div")
  
        viewCharts.className="AllchartsDiv"

         var data = google.visualization.arrayToDataTable([
          ['Burger',  "leatherback turtle", "salmon",  "seahorse","coral","giant clam","gray whale", "sea lion"],
          [Object.keys(newARR.burger_by_species)[0] , Object.values(newARR.burger_by_species)[0]['leatherback turtle'], Object.values(newARR.burger_by_species)[0]['salmon'], Object.values(newARR.burger_by_species)[0]['seahorse'], Object.values(newARR.burger_by_species)[0]['coral'], Object.values(newARR.burger_by_species)[0]['giant clam'],Object.values(newARR.burger_by_species)[0]['gray whale'], Object.values(newARR.burger_by_species)[0]['sea lion']],
            
       
          [Object.keys(newARR.burger_by_species)[1] , Object.values(newARR.burger_by_species)[1]['leatherback turtle'], Object.values(newARR.burger_by_species)[1]['salmon'], Object.values(newARR.burger_by_species)[1]['seahorse'], Object.values(newARR.burger_by_species)[1]['coral'], Object.values(newARR.burger_by_species)[1]['giant clam'],Object.values(newARR.burger_by_species)[1]['gray whale'], Object.values(newARR.burger_by_species)[1]['sea lion']],
                                                       
          [Object.keys(newARR.burger_by_species)[2] , Object.values(newARR.burger_by_species)[2]['leatherback turtle'], Object.values(newARR.burger_by_species)[2]['salmon'], Object.values(newARR.burger_by_species)[2]['seahorse'], Object.values(newARR.burger_by_species)[2]['coral'], Object.values(newARR.burger_by_species)[2]['giant clam'],Object.values(newARR.burger_by_species)[2]['gray whale'], Object.values(newARR.burger_by_species)[2]['sea lion']]
        ]);
             

        var options = {
          
            title: 'Burger by Species',
              
                       'width':1000,
                       'height':700, bar: {groupWidth: "50%"},
          
        };

      
        var chart = new google.visualization.ColumnChart(viewCharts);
        chart.draw(data, options);
               
 
          $("#content").append(viewCharts)
 
        }
    
          }
         }
         else{
             alert("No File Uploaded")
         }

          
     }
    
   document.getElementById("logout").onclick=function(){
         console.log("clicked")
    
        window.location.href = "index.html";
       
   } 
 
    
    
}





