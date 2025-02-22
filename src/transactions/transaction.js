import { useEffect, useState } from "react"
import styles from "./transactions.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getInitialStateAsync, transactionSelector } from "../redux/reducers/transactions";

const DisplayTransactions = () =>{

    const dispatch = useDispatch();
    const {transactions}  = useSelector(transactionSelector);
    const [filteredList, setFiltered ] = useState([]);
    const dataPerPage = 10;
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(10);
    const [month, setMonth] = useState("");


    useEffect(() => {
        dispatch(getInitialStateAsync())
 
    }, [dispatch])

    useEffect(() => {
        setFiltered(transactions);
    }, [transactions]);

    const handlePrevious = () =>{
        if(page > 1){
            setPage(page-1)
        }
    }

    const handleNext = () =>{
        if(page <= 5){
            setPage(page+1)
      

        }

    }

    const handleDateData = () =>{
        if (month) {
            const filtered = transactions.filter((trans) => {
                const monthNumber = trans.dateOfSale.split("-")[1];
                const date = new Date();
                date.setMonth(monthNumber - 1);
                const monthName = date.toLocaleString('en', { month: 'long' });
                return monthName === month;
            });
            setFiltered(filtered);
        } else {
            setFiltered(transactions);
        }
         
    }

    

    const handleSearchData = (searchValue) =>{
        const yo = filteredList.filter((data, key) =>(
            data.title.includes(searchValue)
        )) 
        setFiltered(yo)
        console.log(yo, "dfsd")
    }

    useEffect(() =>{
        setCurrentPage(page*dataPerPage)
        
    },[page])

    useEffect(() =>{
        handleDateData()
    },[month, transactions])
    
    const displayResult = filteredList.slice(currentPage-10, currentPage);
     return(
        <div className={styles.main}>
            <div>
                <div className={styles.heading}>
                   <h1>
                    Transaction's Dashboard
                   </h1>
                </div>

            
            <div className={styles.arrangeInputs}>       
                <select onChange={(e) => setMonth(e.target.value)} className={styles.mainInputs}>
                <option value="">All Months</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>Nobember</option>
                <option>December</option>
                </select>
   
                <input onChange={(e)=>handleSearchData(e.target.value)}  className={styles.mainInputs} type="text" placeholder="search"/>
            </div>
           

            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {displayResult.map((trans, key) => (
                    <tr>
                        <td>{trans._id}
                        </td>
                        <td>{trans.title}</td>
                        <td className={styles.desc}>{trans.description}</td>
                        <td>{trans.price}</td>
                        <td>{trans.category}</td>
                        {trans.sold ?
                            <td>Sold</td>
                            :
                            <td>Unsold</td>

                        }
                        <td className={styles.image}>
                            <img className={styles.transImage} alt="loading" src={trans.image}></img>
                        </td>

                    </tr>
                    ))}

                </tbody>
            </table>

            <div className={styles.footer}>
                <span>Page No: {page}</span>
                <div>
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handlePrevious}>Previous</button>
                </div>
                <span>Per Page: {dataPerPage} items</span>
            </div>
        </div>
     )
}

export {DisplayTransactions}