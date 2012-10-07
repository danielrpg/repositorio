<?php

require_once 'app/controller/UsersController.php';
/**
 * Description of index
 *
 * @author Daniel
 */
class Index {
    
    /*
     * Este es el metodo que ejecuta la aplicación
     */
    public function run(){
     
       $users = new UsersController();
       
       $users->runIndex();
       
        
    }
}

$index = new Index();

$index->run();

?>
