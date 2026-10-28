import {useState} from "react";
import style from "./App.module.css";

function App() {
    const [name, setName] = useState("");   // input 관리용
    const [cart, setCart] = useState([]);   // 목록 관리용

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || name === "") {
            return;
        }
        setCart([...cart, {name: name, quantity: 1}]);
        setName("");
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

   const handleMinusButton = (item,index) => {
       if (item.quantity <= 1) {
           return;
       }
       const newCart = [...cart];
       newCart[index].quantity -= 1;
       setCart(newCart);
   };

    const handleUpdateQuantity = (index, number) => {
    const newCart = [...cart];
    const nextQuantity = newCart[index].quantit + number;
    if (nextQuantity < 1) {
        return;
    }
    newCart[index].quantity -= 1;

}
    return (
      <div className={styles.container}>
        <h2 className={style.title}>Simple Shop</h2>
        <fieldset className={style.fieldset}>
            <legend className={style.legend}>상품 추가</legend>
            <form className={style.form} onSubmit={handleSubmit}>
                <input
                    placeholder={"상품명을 입력하세요"}
                    value={name}
                    onChange={handleChange}
                />
                <button className={style.submitButton} type={"submit"}>
                  카트에 담기
                </button>
            </form>
        </fieldset>
        <div className={styles.tableWrapper}>
        <table  id={"table_id"} className={style.table}>
            <thead>
            <tr>
                <th>상품명</th>
                <th>수량 제어</th>
                <th>관리</th>
            </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                 <td>{item.name}</td>
                 <td>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleMinusButton(index, -10)}>
                      -10
                    </button>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleMinusButton(index, -1)}>
                      -
                    </button>
                   <span className={styles.quantityText}>{item.quantity}</span>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleMinusButton(index, +1)}>
                      +
                    </button>
                    <button
                      className={styles.qtyButton}
                      onClick={() => handleMinusButton(index, +10)}>
                      +10
                    </button>
                 </td>
                 <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteButton(index)}>
                      삭제
                    </button>
                 </td>
            </tr>)
                </tbody>
        </table>
        <h3>총 품목 : {cart.length}개 / 총 수량: {cart.reduce((sum, item) => { return item.quantity + sum}, 0)}개
        </h3>
            </div>
    </>
        );
}

export default App;