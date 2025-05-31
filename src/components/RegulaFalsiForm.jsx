import { useState } from 'react'

const RegulaFalsiForm = ({ onCalculate, functionStr, onFunctionChange }) => {
  const [a, setA] = useState('0.0')
  const [b, setB] = useState('5.0')
  const [tolerance, setTolerance] = useState('0.01')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(parseFloat(a), parseFloat(b), parseFloat(tolerance), functionStr)
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Masukkan fungsi (dalam x):</label>
        <input 
          type="text" 
          value={functionStr} 
          onChange={(e) => onFunctionChange(e.target.value)}
          placeholder="Contoh: x**2 - 4"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Masukkan nilai a:</label>
        <input 
          type="number" 
          step="0.1"
          value={a}
          onChange={(e) => setA(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Masukkan nilai b:</label>
        <input 
          type="number" 
          step="0.1"
          value={b}
          onChange={(e) => setB(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Masukkan toleransi kesalahan (ε):</label>
        <input 
          type="number" 
          step="0.01"
          min="0.01"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="calculate-btn">Hitung</button>
    </form>
  )
}

export default RegulaFalsiForm