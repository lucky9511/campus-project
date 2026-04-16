import React, { useState } from 'react';
import './tools.css';
import { Link } from 'react-router-dom';

function Tools() {
    // 1. Percentage Calculator State
    const [obtainedMarks, setObtainedMarks] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [percResult, setPercResult] = useState(null);
    const [percError, setPercError] = useState(false);

    // 2. Unit Converter State
    const [unitValue, setUnitValue] = useState('');
    const [conversionType, setConversionType] = useState('cm_m');
    const [unitResult, setUnitResult] = useState(null);
    const [unitError, setUnitError] = useState(false);

    // 3. Basic Calculator State
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [calcResult, setCalcResult] = useState(null);
    const [calcError, setCalcError] = useState(false);

    const calculatePercentage = () => {
        const obtained = parseFloat(obtainedMarks);
        const total = parseFloat(totalMarks);

        if (isNaN(obtained) || isNaN(total)) {
            setPercError(true);
            setPercResult('Please fill in both fields with numbers.');
            return;
        }
        if (total === 0) {
            setPercError(true);
            setPercResult('Total marks cannot be zero.');
            return;
        }

        const percentage = ((obtained / total) * 100).toFixed(2);
        setPercError(false);
        setPercResult(`Result: ${percentage}%`);
    };

    const convertUnits = () => {
        const value = parseFloat(unitValue);
        if (isNaN(value)) {
            setUnitError(true);
            setUnitResult('Please enter a valid number.');
            return;
        }

        let result = 0;
        let resultText = '';

        if (conversionType === 'cm_m') {
            result = value / 100;
            resultText = `${value} cm = ${result} m`;
        } else if (conversionType === 'm_cm') {
            result = value * 100;
            resultText = `${value} m = ${result} cm`;
        } else if (conversionType === 'm_km') {
            result = value / 1000;
            resultText = `${value} m = ${result} km`;
        } else if (conversionType === 'km_m') {
            result = value * 1000;
            resultText = `${value} km = ${result} m`;
        }

        setUnitError(false);
        setUnitResult(resultText);
    };

    const calculateBasic = (operator) => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) {
            setCalcError(true);
            setCalcResult('Please fill in both numbers.');
            return;
        }

        let result = 0;
        if (operator === '+') result = n1 + n2;
        if (operator === '-') result = n1 - n2;
        if (operator === '*') result = n1 * n2;
        if (operator === '/') {
            if (n2 === 0) {
                setCalcError(true);
                setCalcResult('Cannot divide by zero.');
                return;
            }
            result = n1 / n2;
        }

        setCalcError(false);
        setCalcResult(`Result: ${result}`);
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">Campus Resource Sharing</div>
                <ul className="nav-links" style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
                    <li><Link to="/" style={{ color: '#555', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link></li>
                    <li><Link to="/tools" style={{ color: '#4a90e2', textDecoration: 'none', fontWeight: 'bold' }}>Tools</Link></li>
                </ul>
            </nav>

            <div className="tools-page-container">
                <div className="tools-header">
                    <h1>Student Tools</h1>
                    <p>Easy tools for everyday student needs</p>
                </div>

                <div className="tools-grid">
                    
                    {/* 1. Percentage Calculator */}
                    <div className="tool-card">
                        <h2>Percentage Calculator</h2>
                        <div className="tool-input-group">
                            <label>Obtained Marks</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 450" 
                                value={obtainedMarks} 
                                onChange={(e) => setObtainedMarks(e.target.value)} 
                            />
                        </div>
                        <div className="tool-input-group">
                            <label>Total Marks</label>
                            <input 
                                type="number" 
                                placeholder="e.g. 500" 
                                value={totalMarks} 
                                onChange={(e) => setTotalMarks(e.target.value)} 
                            />
                        </div>
                        <button className="btn-tool" onClick={calculatePercentage}>Calculate</button>
                        {percResult && (
                            <div className={`result-box ${percError ? 'error' : ''}`}>
                                {percResult}
                            </div>
                        )}
                    </div>

                    {/* 2. Unit Converter */}
                    <div className="tool-card">
                        <h2>Unit Converter</h2>
                        <div className="tool-input-group">
                            <label>Enter Value</label>
                            <input 
                                type="number" 
                                placeholder="Value to convert" 
                                value={unitValue} 
                                onChange={(e) => setUnitValue(e.target.value)} 
                            />
                        </div>
                        <div className="tool-input-group">
                            <label>Convert</label>
                            <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
                                <option value="cm_m">Centimeters to Meters</option>
                                <option value="m_cm">Meters to Centimeters</option>
                                <option value="m_km">Meters to Kilometers</option>
                                <option value="km_m">Kilometers to Meters</option>
                            </select>
                        </div>
                        <button className="btn-tool" onClick={convertUnits}>Convert</button>
                        {unitResult && (
                            <div className={`result-box ${unitError ? 'error' : ''}`}>
                                {unitResult}
                            </div>
                        )}
                    </div>

                    {/* 3. Basic Calculator */}
                    <div className="tool-card">
                        <h2>Basic Calculator</h2>
                        <div className="tool-input-group">
                            <label>First Number</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={num1} 
                                onChange={(e) => setNum1(e.target.value)} 
                            />
                        </div>
                        <div className="tool-input-group">
                            <label>Second Number</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={num2} 
                                onChange={(e) => setNum2(e.target.value)} 
                            />
                        </div>
                        <div className="calc-btn-group">
                            <button onClick={() => calculateBasic('+')}>Add</button>
                            <button onClick={() => calculateBasic('-')}>Subtract</button>
                            <button onClick={() => calculateBasic('*')}>Multiply</button>
                            <button onClick={() => calculateBasic('/')}>Divide</button>
                        </div>
                        {calcResult && (
                            <div className={`result-box ${calcError ? 'error' : ''}`}>
                                {calcResult}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Tools;
