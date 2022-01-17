import { useParams, useNavigate } from 'react-router-dom';
import { getInvoice, deleteInvoice } from '../data';

export default function Invoice() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const invoice = getInvoice(parseInt(invoiceId, 10));

  function handleDelete() {
    deleteInvoice(invoiceId);
    navigate('/invoices');
  }
  return (
    <main style={{ padding: '1rem' }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button onClick={handleDelete}>Delete</button>
      </p>
    </main>
  );
}
