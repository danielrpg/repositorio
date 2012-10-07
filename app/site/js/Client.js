 /*
 * Ejecutamos el objeto con jquery
 */

$(document).ready(function(){
       
       var client = new Client();

       client.init();
       
       client.pagination();
       
       //Conseguir valores de la img

});


/*
 * Esta es la clase para la la interface de los clientes
 */

function Client(){
    
    /*
     * Esta es la function que inicializa la clase de para ejecutar
     */
    this.init = function(){

		  
         $("#add_client").hide();
         
         $("#alert_msg").hide();
         
         $("#sale_windows").hide();
          
         var gets =  new Client().getGET();
         
         if(gets.msg =='registered'){
             
            // console.log('saltar el popup');
             
             $('#sales_data').empty();
                   
             $('#msg_alert').append("<h2><img alt='home page' src='app/site/img/Task Manager.png' height='55' align='absmiddle' > Client not registered !</h2><hr>");
             
             $('#msg_alert').append("<h4>The client already has been previously registered</h4>");
             
             $('#msg_alert').append("<input name='bt_ok_msg' type='button' value='Ok' style='margin-left: 20%;' onclick='new Client().closeAlertMSG()' />");
             
             new Client().alertMSG();
             
         }
        
         $.ajax({

                  type: "GET",
                  
                  url: "?action=listClients",
                  
                  success: function(data) {

                      $('#all_clients').fadeIn(1000).html(data);

                  }
          });
          
        
        
    }
   
   /*
    * Esta es la ventana de alerta para todas las alert's de clientes
    */
   this.alertMSG = function(){
           
            
       
            var windowWidth = document.documentElement.clientWidth;

            var windowHeight = document.documentElement.clientHeight;

            var popupHeight = $("#alert_msg").height();

            var popupWidth = $("#alert_msg").width();
            //centering
            $("#alert_msg").css({

                    "position": "absolute",

                    "top": windowHeight/2-popupHeight/2,

                    "left": windowWidth/2-popupWidth/2

            });
		
	    $("#background_msg").css({
			
			"opacity": "0.7"
            });
	    $("#background_msg").fadeIn("slow");
		
		
	   $("#alert_msg").fadeIn('slow');
   }
   
   /*
    * Esta es na funcion que cierra el alerta 
    */
   this.closeAlertMSG = function(){
       
        $("#background_msg").fadeOut("slow");
            
	$('#alert_msg').effect('explode');
   }
   
   /*
    * Esta es la function que obtiene los datos del url 
    */ 
   this.getGET = function(){
       
       var loc = document.location.href;
       
       var getString = loc.split('?')[1];
       
       var GET = getString.split('&');
       
       var get = {};//this object will be filled with the key-value pairs and returned.

       for(var i = 0, l = GET.length; i < l; i++){
       
          var tmp = GET[i].split('=');
       
          get[tmp[0]] = unescape(decodeURI(tmp[1]));
       }
       
       return get;
   }
   /*
    * Esta es la funcion que verifica el email del servidor remoto 
    */ 
   this.verifyEmail = function(){
       
       //console.log($('#email_user').val());
       $('#email_user').css('border','0px solid red');
       
       $.ajax({
            data: "email="+$('#email_user').val()+"&action=1",
            
            dataType: 'jsonp',
            
            type: 'GET',
            
            crossDomain:true,
            
            callback:'callback', 
            
             url: "https://www.izervice.com/webservices/clients/clients.php",
             
            beforeSend:function(){
               
                $('#data_costumer').empty();
                
                $('#sales_data').empty();   
                
                $('#data_costumer').append("<img src='app/site/img/imgLoad.gif' height='160'>");
            },          
             
            success: function(data){ 

                    $('#data_costumer').empty();
                    
                    $('#data_costumer').append("<h3>Costumer:</h3>");
                    
                    $('#data_costumer').append("Emial <input class='txt_costum' id='cost_email' name='cost_email'type='text' value='"+data.email+"' readonly />Address <input class='txt_costum' id='cost_addres' name='cost_addres'type='text' value='"+data.profile_address1+"' readonly style='width:150px;'/>");
                    
                    $('#data_costumer').append("Country <input class='txt_costum' id='cost_country' name='cost_country' type='text' value='"+data.profile_country+"' readonly style='width:80px;' /> City <input class='txt_costum'  id='cost_city' name='cost_city' value='"+data.profile_city+"' > ");
                    
                    $('#data_costumer').append("Phone <input class='txt_costum'  id='cost_phone' name='cost_phone' type='text' value='"+data.profile_phone+"' readonly />");
                    
                    $('#data_costumer').append("<input name='bt_addCostumer' type='submit' value='Add Costumer'  align='left'>");
                    
                   new Client().select_sales(data.id);
                   
                   
             },
            error:function(){
            
                $('#data_costumer').empty();
                
                $('#data_costumer').append("<h2>Client not found</h2>");
                
                $('#email_user').css('border','1px solid red');
            
           }
       });       
      
   }
   
   this.select_sales=function(id){
       
       $.ajax({
           
            data: "idUser="+id+"&action=2",
            
            dataType: 'jsonp',
            
            type: 'GET',
            
            crossDomain:true,
            
            callback:'callback', 
            
            url: "https://www.izervice.com/webservices/clients/clients.php",
             
            beforeSend:function(){
                
                 $('#sales_data').empty();
              
                $('#sales_data').append("<img src='app/site/img/imgLoad.gif' height='160'>");
            },          
             
            success: function(data){ 

                    //console.log(data.sales[0].order_id);
                  if(data.msg == 'sales not found'){
                      
                      $('#sales_data').empty();
              
                      $('#sales_data').append("<h3>No sales</h3>");
                      
                      $('#sales_data').append("<input name='sales_usr' value='0' class='sales_usr' type='hidden' style='width:25px;' readonly>");
                  
                  }else{
                      
                      $('#sales_data').empty();
                    
                      $('#sales_data').append("<h3>Sales:</h3>");
                     var cont = 1;
                    $.each(data.sales, function(index, value){

                        //console.log(index + ': ' + value.order_id);


                        $('#sales_data').append(cont+":<input name='names[]' value='"+value.name+"' class='sales_usr' style='width:200px;' readonly><input name='skus[]' value='"+value.order_item_sku+"' type='hidden' class='sales_usr' style='width:200px;' readonly>Tot.:<input name='totals[]' value='"+new Client().redondeo2decimales(value.order_total)+"' class='sales_usr' style='width:60px;' readonly>Num.:<input name='onums[]' value='"+value.order_number+"' class='sales_usr' style='width:60px;' readonly>Created On:<input name='createds[]' value='"+value.created_on+"' class='sales_usr' style='width:135px;' readonly><br>");
                        
                        cont = cont +1 ;

                    });
                    
                    
                      
                  }
                    
                   
               
             },
            error:function(){
            
               
                $('#sales_data').empty();
                
                $('#sales_data').append("<h2>Sales not found</h2>");
            
           }
       }); 
   }
   /*
    * Esta es la function addCostumer() q agrega los clientes en la base de datos
    */
   this.addCostumer=function (){
       
       var dataString = '';
       
        $.ajax({

                  type: "GET",

                  url: "?action=addCostumer",

                  data: dataString,
                  
                  

                  success: function(data) {

                      console.log('');

                  }
        });
       
       
       
   }
	
   /*
    * Esta es la funcion que redonde los numeros
    */
   this.redondeo2decimales=function (numero)
   {
	var original=parseFloat(numero);
        
	var result=Math.round(original*100)/100 ;
	
        return result;
   } 


      /*
	 * Esta es la funcion que realiza la paginacion
	 */
    this.pagination = function(){ 
        
        
        $('#paginar').live('click', function(){
              
              
              $('#all_clients').html('<div align="center"> <br><img src="app/site/img/imgLoad.gif" width="300px" height="400px"/></div>');

              var page = $(this).attr('data'); 

              var dataString = 'page='+page;

              $.ajax({

                  type: "GET",

                  url: "?action=listClients",

                  data: dataString,

                  success: function(data) {

                      $('#all_clients').fadeIn(1000).html(data);

                  }
              });
        });


 
    }
    /*
	 * Esta es una funcion que muestra al cliente
	 */
    this.showClient = function (){
        
		//request data for centering
		var windowWidth = document.documentElement.clientWidth;
		
		var windowHeight = document.documentElement.clientHeight;
		
		var popupHeight = $("#add_client").height();
		
		var popupWidth = $("#add_client").width();
		//centering
		$("#add_client").css({
			
			"position": "absolute",
			
			"top": windowHeight/2-popupHeight/2,
			
			"left": windowWidth/2-popupWidth/2
			
		});
		
	    $("#background").css({
			
			"opacity": "0.7"
            });
		$("#background").fadeIn("slow");
		
		
	   $("#add_client").fadeIn('slow');
   }
   
   /**
    * Esta es la funcion que cierra la ventanita 
	*/
    this.closeAddClient = function(){
		
            $("#background").fadeOut("slow");
            
	    $('#add_client').effect('explode');
           
           // $('#add_client').fadeOut('slow');
        
   }
   
   
   this.showSalesWindow = function(id){
       
       $('#add_sales_add').empty();
       
       $('#add_sales_add').append("<h2> Add New Sales "+$('#'+id).val()+"</h2><hr>");
       
       $('#add_sales_add').append(" <div id='sale_data_add'></div>");

       new Client().showAddSale(600, 200);
       
       $.ajax({
            data: "email="+$('#'+id).val()+"&action=3",
            
            dataType: 'jsonp',
            
            type: 'GET',
            
            crossDomain:true,
            
            callback:'callback', 
            
            url: "https://www.izervice.com/webservices/clients/clients.php",
             
            beforeSend:function(){
               
                $('#sale_data_add').empty();   
                
                $('#sale_data_add').append("<img src='app/site/img/imgLoad.gif' height='160'>");
            },          
             
            success: function(data){ 

                //$idClient,$order, $date, $name, $total,$skus
                var res = new Client().search_db(data.created_on,data.order_number,id,data.order_item_name,data.total,data.order_item_sku);
              

            },
            error:function(){
            
                $('#sale_data_add').empty();
                
                $('#sale_data_add').append("<h2>New sales not found</h2>");
                
                
            
           }
       }); 
       
       
   }
   
   /*
    * Esta es la funcion que verifca y compara en la base de datos si el ultimo dato de izervice ya esta registrado
    * de ser asi retorna true en caso contrario false
    */
   this.search_db = function(created_on,order_number,id,order_item_name,total,order_item_sku){
       
       var dataString = 'createdOn='+created_on+'&orderNum='+order_number+"&idCli="+id;
       
       
       $.ajax({

                  type: "POST",

                  url: "?action=verifySale",

                  data: dataString,
                  
                  dataType: 'json',

                  success: function(data) {
                      

                      if(data.msg == 'not'){
                          
                                $('#add_sales_add').empty();
       
                                $('#add_sales_add').append("<h2> Add New Sales "+$('#'+id).val()+"</h2><hr>");
       
                                $('#add_sales_add').append(" <div id='sale_data_add'></div>");
                                
                                $('#sale_data_add').append("<input id='name' value='"+order_item_name+"' class='sales_usr' style='width:200px;' readonly><input id='sku' value='"+order_item_sku+"' type='hidden' class='sales_usr' style='width:200px;' readonly><input id='idcli' value='"+id+"' type='hidden' class='sales_usr' style='width:200px;' readonly>Tot.:<input id='total' value='"+total+"' class='sales_usr' style='width:60px;' readonly>Num.:<input id='onum' value='"+order_number+"' class='sales_usr' style='width:60px;' readonly><br>Created On:<input id='created' value='"+created_on+"' class='sales_usr' style='width:135px;' readonly><br>");
                                
                                $('#sale_data_add').append("<input name='bt_addSale' type='button' value='Add New Sale' onclick='new Client().addNewSale()'  align='left'>");
                      }else{
                          
                               $('#add_sales_add').empty();
       
                                $('#add_sales_add').append("<h2> Add New Sales </h2><hr>");
       
                                $('#add_sales_add').append(" <div id='sale_data_add'></div>");
                                
                                $('#sale_data_add').append("No new sales<br>");
                                
                                $('#sale_data_add').append("<input name='bt_addSale' type='button' value='Ok' onclick='new Client().closeAddSale()'  align='left'>");
                          
                      }
                      

                  },
                  error: function(){
                      
                      
                      
                  }
                 
                 
        });
        
        
       
   }
   
   this.addNewSale = function(){
       
       var dataString="id="+$('#idcli').val()+"&order="+$('#onum').val()+"&created="+$('#created').val()+"&name="+$('#name').val()+"&total="+$('#total').val()+"&sku="+$('#sku').val();
       
       $.ajax({

                  type: "POST",

                  url: "?action=addNewSale",

                  data: dataString,
                  
                  dataType: 'json',

                  success: function(data) {
                      
                      if(data.msg == 'ok'){
                          
                                $('#add_sales_add').empty();
       
                                $('#add_sales_add').append("<h2> Add New Sales </h2><hr>");
       
                                $('#add_sales_add').append(" <div id='sale_data_add'></div>");
                                
                                $('#sale_data_add').append("Sale was added successfully<br>");
                                
                                $('#sale_data_add').append("<input name='bt_addSale' type='button' value='Ok' onclick='new Client().closeAddSale()'  align='left'>");
                          
                      }
                      
                  },
                  error: function(){
                      
                      
                      
                  }
                 
                 
        });
       
   }
   
   
   /*
    * Esta es la ventana para sales 
    */
   this.showAddSale = function(width_s,height_s){
       //request data for centering
            var windowWidth = document.documentElement.clientWidth;

            var windowHeight = document.documentElement.clientHeight;

            //var popupHeight = $("#add_client").height();
            var popupHeight = height_s;

            //var popupWidth = $("#add_client").width();
            var popupWidth = width_s;
            //centering
            $("#sale_windows").css({

                    "height": height_s,

                    "width": width_s,

                    "position": "absolute",

                    "top": windowHeight/2-popupHeight/2,

                    "left": windowWidth/2-popupWidth/2

            });
		
	    $("#background_sales").css({
			
			"opacity": "0.7"
            });
		$("#background_sales").fadeIn("slow");
		
		
	   $("#sale_windows").fadeIn('slow');
   }
   
   /*
    * Esta es la funcion que cierra la ventana de las nuevas ventas
    * 
    */
   this.closeAddSale = function(){
       
       $('#background_sales').fadeOut("slow");
       
       $('#sale_windows').effect("explode");
   }
   
   /*
    * Esta es la funcion que ejecuta la vista de las ventas
    */
   this.showSalesClient = function(id){
       
       console.log(id);
       
       var dataString = "idUser="+id;
       
       $('#add_sales_add').empty();
              
       $('#add_sales_add').append("<h2> Sales "+$('#'+id).val()+"</h2><hr>");
       
       $('#add_sales_add').append(" <div id='sale_data_add'></div>")
       
       
       
       
       $.ajax({
           
                  type: "GET",

                  url: "?action=showSalesClient",

                  data: dataString,
                  
                  dataType: 'json',
                  
                  success: function(data) {
                        
                        console.log(data.msg);
                        
                        if(data.msg != 'not'){
                            var cont = 1;
                        
                            $.each(data, function(index, value){

                                $('#sale_data_add').append(cont+":<input name='nam[]' value='"+value.orderName+"' class='sales_usr' style='width:165px;' readonly><input name='sku[]' value='"+value.orderSKU+"' type='hidden' class='sales_usr' style='width:200px;' readonly>Tot.:<input name='tot[]' value='"+value.total+"' class='sales_usr' style='width:40px;' readonly>Num.:<input name='on[]' value='"+value.orderNumber+"' class='sales_usr' style='width:50px;' readonly>Created On:<input name='creat[]' value='"+value.createdOn+"' class='sales_usr' style='width:70px;' readonly><br>");

                                cont = cont +1 ;

                            });
                            
                           new Client().showAddSale(500,300); 
                           
                        }else{
                            $('#sale_data_add').append("<h2> No sales </h2>");
                            
                             new Client().showAddSale(500,200); 
                        }
                        
                        
                  }
           
       });
   }
}

