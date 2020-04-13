console.log('Start');

var mysql = require('mysql2');
var term = require( 'terminal-kit' ).terminal ;

const mysqlConnection = mysql.createConnection({
    host: "v392persei.com",
    port: 13306,
    user: "progress",
    password: "Progress_1169",
  });

mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("База данных MySql подключена");

    var xlsx = require('xlsx-populate');

    xlsx.fromFileAsync("info.xlsx")
        .then(workbook => {
            var table1Str1 = workbook.sheet("Лист1").range("A7:GS7").value();
            var table1Str2 = workbook.sheet("Лист1").range("A8:GS8").value();
            var table1Str3 = workbook.sheet("Лист1").range("A13:GS13").value();

            var table1 = [];
            
            table1Str2.forEach(element => {

                //console.log(element)
            });

            for (var i = 0; i <= 200; i++)
            {
                table1[i] = JSON.stringify(
                    {
                        id: table1Str1[0][i],
                        name: table1Str2[0][i],
                        description: table1Str3[0][i],
                    }
                );
            }
    
            //console.log(value);
            loading(table1);
        });
});

//Реализация загрузки
function loading(table1)
{
    mysqlConnection.query(
        'select * from progress.table1',
        function(err, results, fields)
        {
            results.forEach(element => {
                if (element['id'] == "2") return;
                var array = Object.entries(element);
                
                var count = 0;
                term.green("Название:   ");
                term.green("Обозначeние:     ");
                term.green("Состояние/Время:                                  ");
                term.green("Описание: \n");

                for (var i = 0; i <= 200; i++)
                {
                    if (array[0][i] != "id")
                    {
                        var field = JSON.parse(table1[i]);

                        var reg = /item/;
                        var name = (reg.test(array[i][0])) ? "Состояние: " : "Время: ";
                        var line = (reg.test(array[i][0])) ? "       " : "      ";

                        var line2 = "";
                        var line3 = "";
                        

                        for (var j = 0; j < 17 - String(field.name).length ; j++)
                        {
                            line2 += " ";
                        }

                        for (var j = 0; j < 50 - String(array[i][1]).length ; j++)
                        {
                            line3 += " ";
                        }

                        term.white(array[i][0] + line);
                        term.white(((field.name != undefined) ? field.name : "undefined")  + line2);
                        term.white(array[i][1]  + line3);
                        console.log("Описание: " + field.description + '\n');
                    } 
                    if (i % 2 == 0)
                    {
                        term('\n');
                    }
                }

                var nameTable;
                var nameElement;
                var state;

                term.magenta( "Введите название таблицы:  \n" ) ;
                term.inputField(
                    function( error , input ) {
                        nameTable = input;

                        term.magenta( "\nВведите название элемента:  \n" ) ;
                        term.inputField(
                            function( error , input ) {
                                nameElement = input;

                                term.magenta( "\nВведите состояние (1 или 0): " ) ;
                                term.inputField(
                                    function( error , input ) {
                                        state = input;
                                        term.green("\n" + nameTable + " " + nameElement + " " + state);
                                        process.exit();
                                    }
                                );
                            }
                        );
                    }
                );

                

                

                
                
            });
        }
    )
}