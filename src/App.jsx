import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RegulaFalsiForm from './components/RegulaFalsiForm'
import ResultsTable from './components/ResultsTable'
import Papa from 'papaparse' // Import library PapaParse
import './App.css'
import './index.css'

function App() {
  const [count, setCount] = useState(0)
  const [results, setResults] = useState([])
  const [functionStr, setFunctionStr] = useState('x**2 - 4')
  const [showCalculator, setShowCalculator] = useState(false)
  const [csvData, setCsvData] = useState([]) // State untuk menyimpan data CSV

  // Fungsi untuk handle upload CSV
  const handleCsvUpload = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setCsvData(results.data)
          // Jika format CSV sesuai, bisa langsung set parameter perhitungan
          if (results.data.length > 0 && results.data[0].a && results.data[0].b && results.data[0].tolerance) {
            const { a, b, tolerance } = results.data[0]
            handleCalculate(parseFloat(a), parseFloat(b), parseFloat(tolerance), functionStr)
          }
        },
        header: true, // Mengasumsikan CSV memiliki header
        skipEmptyLines: true
      })
    }
  }

  const handleCalculate = (a, b, tolerance, func) => {
    const newResults = []
    let iteration = 0
    let c = 0
    let error = 0
    
    do {
      const fa = evaluateFunction(func, a)
      const fb = evaluateFunction(func, b)
      
      c = (a * fb - b * fa) / (fb - fa)
      const fc = evaluateFunction(func, c)
      
      error = Math.abs(fc)
      
      newResults.push({
        iteration,
        a,
        b,
        c,
        fa,
        fb,
        fc,
        error
      })
      
      if (fa * fc < 0) {
        b = c
      } else {
        a = c
      }
      
      iteration++
    } while (error > tolerance && iteration < 100)
    
    setResults(newResults)
  }

  const evaluateFunction = (func, x) => {
    try {
      const safeFunc = func.replace(/\*\*/g, '**')
      // eslint-disable-next-line no-new-func
      return new Function('x', `return ${safeFunc}`)(x)
    } catch (e) {
      console.error("Error evaluating function:", e)
      return NaN
    }
  }

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator)
  }

  return (
    <>
      {/* Default Vite+React Content */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={toggleCalculator} style={{marginTop: '10px'}}>
          {showCalculator ? 'Hide Calculator' : 'Show Regula Falsi Calculator'}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Regula Falsi Calculator */}
      {showCalculator && (
        <div className="container">
          <h1>Menu Navigasi</h1>
          <h2>Milli Metode - Regula Falsi</h2>
          
          <h2>Aplikasi Metode Mencari Akar</h2>
          <h3>Metode Regula Falsi</h3>
          <p>Metode Regula Falsi adalah metode numerik untuk mencari akar dari fungsi dengan cara menggunakan garis lurus antara dua titik pada grafik fungsi.</p>
          
          {/* Tambahkan input untuk upload CSV */}
          <div style={{ margin: '20px 0' }}>
            <h4>Upload Parameter dari CSV</h4>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleCsvUpload}
              style={{ marginBottom: '10px' }}
            />
            <p>Format CSV: Kolom a, b, dan tolerance</p>
          </div>
          
          <RegulaFalsiForm 
            onCalculate={handleCalculate}
            functionStr={functionStr}
            onFunctionChange={setFunctionStr}
            initialValues={csvData.length > 0 ? csvData[0] : null}
          />
          
          {results.length > 0 && <ResultsTable data={results} />}
          
          {/* Tampilkan preview data CSV jika ada */}
          {csvData.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4>Preview Data CSV</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {Object.keys(csvData[0]).map(key => (
                      <th key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App