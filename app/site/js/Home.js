 /*
 * Ejecutamos el objeto con jquery
 */

$(document).ready(function(){
       
       var home = new Home();

       home.init();
               
});

/*
 * Esta es la clase home 
 * 
 **/
function Home(){
    
    
   /*
   * Este es el estilo de la pagina para que se pueda 
   * 
   */
   this.init=function(){
       
         var x=$('#login');

         x.dialog({

                height:305,

                width:300,

                closeText: 'hide',

                closeOnEscape: false,

                draggable: false,

                disabled: true,

                resizable: false,

                open: function(event, ui) {

                    $(".ui-dialog-titlebar-close").hide(); 
                }

         });
       
        $('#btn_enviar').button();
        
       /*$('#btn_enviar').click(this.notIn);*/
   }

    /*
     * Esta s la funcion que inicializa la funcion notIn
     */

    this.notIn = function(){
    
        $('#login').effect('shake');
    
    }
    
    /*
     *Este es el metodo que te permite ingresar al sistema
     */
    this.enterSystem = function(){
        
        
        var md5_pass = MD5($('#pass_id').val());
        
        $.ajax({
                type: "POST",
                
                url: "?action=createSession",
                
                data: "user="+$('#user_id').val()+"&password="+md5_pass,
                
                success: function(datos){
                    
                    document.location="?action=inSystem";
                    
                }
        });
        
        
        
        
       // document.location="?action=inSystem";
    }
    
    /*
     * Esta es la funcion que vefifica los datos si estan en la base de datos
     */
    this.verifyUser = function(){
        
        $('#msg_login').empty();
     
        var md5_pass = MD5($('#pass_id').val());
       
        console.log(md5_pass);
        
        $.ajax({
          
           data: "action=login&user="+$('#user_id').val()+"&password="+md5_pass,
           
           type: "GET",
           
           dataType: "json",
    
           url: "",
           
           beforeSend:function(){
               
                $('#msg_login').empty();
                
                $('#msg_login').append("<img src='app/site/img/imgLoad.gif' height='160'>");
           },
    
           success: function(data){
            
             if(data.msg ==='not exist'){
                 
                 new Home().notIn();
                 
                 $('#msg_login').empty();  
                 
                 $('#msg_login').append("The account is incorrect.");
                 
             }else if(data.msg==='ok'){
                 
                 $('#msg_login').empty();
                 
                 new Home().enterSystem();
             }
            
           },
           error:function(){
            
                $('#msg_login').empty();
                
                $('#msg_login').append("Server problems");
            
           }
            
        });
     
    }

    
}



