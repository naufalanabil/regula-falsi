const ResultsTable = ({ data }) => {
  return (
    <div className="results-container">
      <h3>Hasil Perhitungan</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Iterasi</th>
              <th>a</th>
              <th>c</th>
              <th>b</th>
              <th>f(a)</th>
              <th>f(b)</th>
              <th>f(c)</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.iteration}</td>
                <td>{row.a.toFixed(6)}</td>
                <td>{row.c.toFixed(6)}</td>
                <td>{row.b.toFixed(6)}</td>
                <td>{row.fa.toFixed(6)}</td>
                <td>{row.fb.toFixed(6)}</td>
                <td>{row.fc.toFixed(6)}</td>
                <td>{row.error.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultsTable