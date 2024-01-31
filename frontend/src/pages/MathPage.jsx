

// import React, { useState, useEffect } from "react";
// import axios from 'axios'; 
// import { useAuthContext } from "../hooks/useAuthContext";

// const MathPage = () => {
//   const [num1, setNum1] = useState("");
//   const [num2, setNum2] = useState("");
//   const [sum, setSum] = useState(null);
//   const [history, setHistory] = useState([]);
//   const { user } = useAuthContext();

//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (user) {
//         try {
//           const response = await axios.get('/api/math', {
//             headers: {
//               'Authorization': `Bearer ${user.token}`
//             }
//           });
//           setHistory(response.data);
//         } catch (error) {
//           console.error('Error fetching history', error);
//         }
//       }
//     };

//     fetchHistory();
//   }, [user]);

//   const handleCalculation = async (operation) => {
//         if (num1 === "" || num2 === "") {
//           return; 
//         }
//         let result = 0;
//         switch (operation) {
//           case 'add':
//             result = Number(num1) + Number(num2);
//             break;
//           case 'subtract':
//             result = Number(num1) - Number(num2);
//             break;
//           case 'multiply':
//             result = Number(num1) * Number(num2);
//             break;
//           case 'divide':
//             result = num2 !== "0" ? Number(num1) / Number(num2) : "Cannot divide by zero";
//             break;
//           default:
//             return;
//         }
//         setSum(result);

//     if (user) {
//       try {
//         const newEntry = { num1, num2, operation, result };
//         const response = await axios.post('/api/math', newEntry, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         });
//         setHistory([...history, response.data]);
//       } catch (error) {
//         console.error('Error saving calculation', error);
//       }
//     }

//     setNum1("");
//     setNum2("");
//   };

//    return (
//     <div className="equations">
//       <div className="input-numbers">
//         <input value={num1} onChange={(e) => setNum1(e.target.value)} />
//         <input value={num2} onChange={(e) => setNum2(e.target.value)} />
//       </div>
//       <div className="math-symbols">
//         <button className="symbols" onClick={() => handleCalculation('add')}>+</button>
//         <button className="symbols" onClick={() => handleCalculation('subtract')}>-</button>
//         <button className="symbols" onClick={() => handleCalculation('multiply')}>x</button>
//         <button className="symbols" onClick={() => handleCalculation('divide')}>/</button>
//       </div>
//       <div className="history">
//         <h3>Calculation History:</h3>
//         <ul>
//           {history.map((entry, index) => (
//             <li className="math-questions" key={index}>{`${entry.num1} ${entry.operation} ${entry.num2} = ${entry.result}`}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MathPage;






import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { useAuthContext } from "../hooks/useAuthContext";

const MathPage = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState(null);
  const [history, setHistory] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        try {
          const response = await axios.get('/api/math', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          setHistory(response.data);
        } catch (error) {
          console.error('Error fetching history', error);
        }
      }
    };

    fetchHistory();
  }, [user]);

  const handleCalculation = async (operation) => {
        if (num1 === "" || num2 === "") {
          return; 
        }
        let result = 0;
        switch (operation) {
          case '+':
            result = Number(num1) + Number(num2);
            break;
          case '-':
            result = Number(num1) - Number(num2);
            break;
          case 'x':
            result = Number(num1) * Number(num2);
            break;
          case '/':
            result = num2 !== "0" ? Number(num1) / Number(num2) : "Cannot / by zero";
            break;
          default:
            return;
        }
        setSum(result);

    if (user) {
      try {
        const newEntry = { num1, num2, operation, result };
        const response = await axios.post('/api/math', newEntry, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setHistory([...history, response.data]);
      } catch (error) {
        console.error('Error saving calculation', error);
      }
    }

    setNum1("");
    setNum2("");
  };

   return (
    <div className="equations">
      <div className="input-numbers">
        <input value={num1} onChange={(e) => setNum1(e.target.value)} />
        <input className="input-num2" value={num2} onChange={(e) => setNum2(e.target.value)} />
      </div>
      <div className="math-symbols">
        <button className="symbols" onClick={() => handleCalculation('+')}>+</button>
        <button className="symbols" onClick={() => handleCalculation('-')}>-</button>
        <button className="symbols" onClick={() => handleCalculation('x')}>x</button>
        <button className="symbols" onClick={() => handleCalculation('/')}>/</button>
      </div>
      <div className="history">
        <h3 className="your-questions ">Your Questions</h3>
        <ul className="math-questions-ul">
          {history.map((entry, index) => (
            // <li className="math-questions" key={index}>{`${entry.num1} ${entry.operation} ${entry.num2}  = ${entry.result}`}</li>
<li className="math-questions" key={index}>
  {`${entry.num1} ${entry.operation} ${entry.num2}`}
  <br/> <span style={{color: 'black'}}>=</span>
 <span>{entry.result}</span>
</li>


          ))}
        </ul>
      </div>
    </div>
  );
};

export default MathPage;
