import { Link } from "react-router-dom"
import styles from "../../style/NavBar.module.css"
import logo from "../../style/image/png-transparent-2017-tesla-model-x-tesla-motors-iphone-x-car-tesla-angle-logo-monochrome.png"


function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.Home}>
                <Link to = "/TaskList" >
                   <img src={logo} alt="Logo" />
                </Link>
            </div>
            <ul className={styles .list}>
            <li className={styles.item}>
            <Link to = "/Carros">Automóvel </Link>
            </li>
            <li className={styles.item}>
            <Link to="/Clientes">Clientes</Link>
            </li>
             <li className={styles.item}>
            <Link to="/Inventario">Inventário</Link>
            </li>
            <li className={styles.item}>
            <Link to="/Pedidos">Pedidos</Link>
            </li>
            </ul>
        </div>
    )
    
}

export default Navbar
  
