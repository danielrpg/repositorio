<?php

/**
 * Description of HomeView
 *
 * @author Daniel
 */
class HomeView {
    // Este es el atributo que crea el template de la vista
    private $template;
    
    /*
     * Este es el metodo constructor de la clase HomeView
     */
    public function __construct() {
        // Aqui todo lo que se define para este constructor
    }
    
    /*
     * Este es el metodo que ejecuta el template de la vista
     */
    public function runIndex(){
        
        $library = Array('title'=>'iZervice - Resto',
                         'keywords'=>'iZervice, iZresto, iphone, ipad,os',
                          'description'=>'iZervice - Resto');
        
        $template = file_get_contents('app/site/home.html');
        
        foreach ($library as $key => $value) {
            
             $template = str_replace('{'.$key.'}', $value, $template);
            
        }
        $template = str_replace('{clasejs}', 'app/site/js/Home.js', $template);
        
        $template = str_replace('{header}', '', $template);
        
        
        $login = file_get_contents('app/site/login.html');
        
        $template = str_replace('{content}', $login, $template);
        
        $template = str_replace('{footer}', '', $template);
       
        print($template);
    }
    
    /*
     * Esta es la funcion que ejecuta el home de usuario existente
     */
    public function runPageIni() {
        
        $library = Array('title'=>'iZervice - Resto',
                         'keywords'=>'iZervice, iZresto, iphone, ipad,os',
                          'description'=>'iZervice - Resto');
        
        $template = file_get_contents('app/site/home.html');
        
        foreach ($library as $key => $value) {
            
             $template = str_replace('{'.$key.'}', $value, $template);
            
        }
        $template = str_replace('{clasejs}', 'app/site/js/Home.js', $template);
        
        $template = str_replace('{header}', '', $template);
        
        
        $login = file_get_contents('app/site/login.html');
        
        $template = str_replace('{content}', $login, $template);
        
        $template = str_replace('{footer}', '', $template);
       
        print($template);
        
    }
    
    /*
     * Esta es la funcion que se ejecuta cuando no exite el usuario
     */
    public function noIn(){
        
        $library = Array('title'=>'iZervice - Resto',
                         'keywords'=>'iZervice, iZresto, iphone, ipad,os',
                          'description'=>'iZervice - Resto');
        
        $template = file_get_contents('app/site/home.html');
        
        foreach ($library as $key => $value) {
            
             $template = str_replace('{'.$key.'}', $value, $template);
            
        }
        $template = str_replace('{clasejs}', 'app/site/js/Home.js', $template);
        
        $template = str_replace('{header}', '<script type="text/javascript"> notIn() </script>', $template);
        
        
        $login = file_get_contents('app/site/login.html');
        
        $template = str_replace('{content}', $login, $template);
        
        $template = str_replace('{footer}', '', $template);
       
        print($template);
    }
}

?>
