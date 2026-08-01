function ListingsTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="empty-state">No data available</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="listings-table">
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Category</th>
            <th>City</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.business_name}</td>
              <td>{item.category}</td>
              <td>{item.city}</td>
              <td>{item.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListingsTable;