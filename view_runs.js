$(function(){
    console.log("loaded");
    var jqxhr = $.getJSON("data.json", function(){
    })
        .done(function(data){
            // do a bunch of stuff here
            //data = data
            totalWins = 0;
            totalRuns = 0;
            headers = [
                "Date",
                "Character",
                "Seed",
                "Ending Zone",
                "Run Time",
                "Win",
                "Key Presses",
                "Songs", 
                "File"
            ];

            output = "<table id=\"output_table\" class=\"table table-striped table-bordered table-sm table-responsibe-sm table-hover\">";
            
            $.each(data["meta"], function(i, item){
                headers.push(item);    
            })
            output = output + "<thead class=\"thead-dark\">";
            
            output = output + "<tr>";
            $.each(headers, function(k, v){
                
                output = output + "<th scope=\"col\">" + v + "</th>";
            })
            
            output = output + "</tr>";

            output = output + "</thead>";
            output = output + "<tbody>";
            $.each(data["data"], function(i, item){
                
                output = output + "<tr class=\"\">";
                output = output + "<td scope=\"row\" class=\"td\">" + moment(item.runDate*1000).format("YYYY/MM/DD HH:mm:ss") + "</td>";
                output = output + "<td class=\"td\">" + item.fChar1 + "</td>";
                output = output + "<td class=\"td\">" + item.seed + "</td>";
                output = output + "<td class=\"td\">" + item.endZone + "</td>";
                output = output + "<td class=\"td\">" + item.fRunTime+ "</td>";
                if (item.win == true) {
                    output = output + "<td class=\"td bg-success\"> Yes </td>";
                } else {
                    output = output + "<td class=\"td bg-danger\"> No </td>";
                }
                output = output + "<td class=\"td\">" + item.keyPresses + "</td>";
                output = output + "<td class=\"td\">" + item.songs + "</td>";
                output = output + "<td class=\"td\">" + item.file + "</td>";
                output = output + "</tr>";
                totalRuns += 1;
                if (item.win === true) totalWins += 1;
            });
            output = output + "</tbody>";
            output = output + "<tfoot>";
            output = output + "</tfoot>";
            output = output + "</table>";


            $('#table').html(output);
            $('#output_table').DataTable({
                paging: false,
                order: [0, "desc"]
            });
            $('#wins').html("Total Wins: " + totalWins);
            $('#runs').html("Total Runs: " + totalRuns);
        })

        


});