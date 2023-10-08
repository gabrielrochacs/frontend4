import styles from './cabecalho.module.css'; // ajustes de cabeçalho

export default function Header(propriedade){
    return(
        <>
        <h1 className={styles.cabecalho}>{propriedade.texto}</h1>
        </>      
 );
}