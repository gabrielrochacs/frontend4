import Menu from '../Menus/menu';
import Header from '../Headers/cabecalho';
                                      
export default function TelaPrincipal(propriedades){
    return (
       <div style={{width: '100%'}}>
       <Menu texto='TechStore'/>
       <Header texto='TechStore'/>
       </div>
      );
}




